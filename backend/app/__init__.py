from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["https://jobboard-frontend-l6cz.onrender.com"],  # Mettez à jour avec votre URL frontend
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

from app import routes