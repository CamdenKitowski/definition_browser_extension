from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, current_app
)
from werkzeug.exceptions import abort
from datetime import datetime
from .db import get_db

bp = Blueprint('definitions', __name__)

@bp.route('/add_definition', methods=['POST'])
def add_defintion():

    data = request.get_json()

    print(data)

    word = data.get('word')
    definition = data.get('definition')
    pronunciation = data.get('pronunciation')
    pos = data.get('pos')

    try:
        db = get_db()
        connection = current_app.mysql.connection

        query = 'INSERT INTO definitions (word, definition, part_of_speech, pronunciation) VALUES (%s, %s, %s, %s)'
        db.execute(query, (word, definition, pos, pronunciation))
        connection.commit()
        return jsonify({"message": "Definition added successfully!", "word": word, "definition": definition}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

