from flask import jsonify, request
from flask_cors import cross_origin
from app import app
import pandas as pd
import numpy as np
import json
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=OPENAI_API_KEY)

print(f"API Key loaded: {'Yes' if OPENAI_API_KEY and OPENAI_API_KEY.startswith('sk-') else 'No'}")

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    try:
        df = pd.read_csv('app/data/jobs.csv')
        df = df.replace({np.nan: None})
        jobs = df.to_dict('records')
        return jsonify(jobs)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Only one explore_jobs function
@app.route('/api/explore-jobs', methods=['POST'])
@cross_origin()
def explore_jobs():
    try:
        data = request.get_json()
        print("Received data:", data)
        
        description = data.get('description')
        if not description:
            return jsonify({'error': 'Description is required'}), 400

        prompt = f"""Based on the following job description, suggest 5 relevant job titles 
        that match the skills and responsibilities described. For each job title, 
        provide a brief explanation of why it's a good match.

        Job Description: {description}

        Please format each suggestion as:
        Job Title: [title]
        Explanation: [explanation]"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a career counselor helping people find relevant job titles based on their skills and experience."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        raw_suggestions = response.choices[0].message.content.strip().split('\n\n')
        suggestions = []
        
        for suggestion in raw_suggestions:
            if ':' in suggestion:
                title, desc = suggestion.split(':', 1)
                suggestions.append({
                    'title': title.strip(),
                    'description': desc.strip()
                })

        return jsonify({'suggestions': suggestions[:5]})

    except Exception as e:
        print(f"Error in explore_jobs: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-salary', methods=['POST'])
def analyze_salary():
    try:
        data = request.get_json()
        experiences = data.get('experiences', [])

        if not experiences:
            return jsonify({'error': 'Experience data is required'}), 400

        prompt = f"""Based on the following work experiences, analyze and suggest a salary range:

        Work Experience:
        {json.dumps(experiences, indent=2)}

        Please provide a detailed analysis with:
        1. A salary range (minimum and maximum)
        2. An average market salary
        3. A clear, professional recommendation for salary negotiation

        Format your response exactly like this example:
        {{
            "minSalary": 75000,
            "maxSalary": 95000,
            "avgSalary": 85000,
            "recommendation": "Based on your experience...[detailed negotiation advice]"
        }}
        """

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a compensation analyst. Provide clear, professional salary analysis with clean formatting. Avoid using JSON syntax in the recommendation text."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        try:
            analysis = json.loads(response.choices[0].message.content.strip())
            if isinstance(analysis.get('recommendation'), str):
                analysis['recommendation'] = analysis['recommendation'].replace('\\n', '\n').strip()
            return jsonify(analysis)
        except json.JSONDecodeError:
            return jsonify({
                'minSalary': 50000,
                'maxSalary': 100000,
                'avgSalary': 75000,
                'recommendation': response.choices[0].message.content.strip()
            })

    except Exception as e:
        print(f"Error in analyze_salary: {str(e)}")
        return jsonify({'error': 'Failed to analyze salary data'}), 500