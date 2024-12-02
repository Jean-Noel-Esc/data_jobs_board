from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://jobboard-frontend-l6cz.onrender.com",
            "https://jobboard-frontend-l6cz.onrender.com/*"  # Ajoutez cette ligne
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"],
        "supports_credentials": True
    }
})

from app import routes