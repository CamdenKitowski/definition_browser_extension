import os
from flask import Flask
from flask_mysqldb import MySQL

from . import definitions

def create_app(test_config=None):
    # flask will look for config files --- this is useful for storing secrets
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MYSQL_HOST= 'localhost',
        MYSQL_USER= 'camkit',
        MYSQL_PASSWORD='camkitpass',
        MYSQL_DB='definition_db',
    )

    # initialize database
    mysql = MySQL(app)
    app.mysql = mysql
    app.register_blueprint(definitions.bp)
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app


