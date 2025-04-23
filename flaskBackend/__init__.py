import os
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS

from . import definitions
from .config import Config 

def create_app(test_config=None):
    # flask will look for config files --- this is useful for storing secrets
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)
    
    # initialize database
    mysql = MySQL(app)
    app.mysql = mysql
    app.register_blueprint(definitions.bp)
    CORS(app)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app


