from flask import current_app
from flask import g
from flask_mysqldb import MySQL

def get_db():
    if "db" not in g:
        g.db = current_app.mysql.connection.cursor()
    return g.db
