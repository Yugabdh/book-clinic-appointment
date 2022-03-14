import firebase_admin
from firebase_admin import credentials

def initialize_app():
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate("./assets/data/serviceAccountKey.json")

    # Initialize the app with a custom auth variable, limiting the server's access
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://databaseName.firebaseio.com',
        'databaseAuthVariableOverride': None
    })

