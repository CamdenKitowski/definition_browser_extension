import os
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS

from . import definitions

def create_app(test_config=None):
    # flask will look for config files --- this is useful for storing secrets
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MYSQL_HOST='127.0.0.1',
        MYSQL_USER= 'camkitsql',
        MYSQL_PASSWORD='camkitpass',
        MYSQL_DB='definition_db',
    )
    print('---- working now -----')
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


