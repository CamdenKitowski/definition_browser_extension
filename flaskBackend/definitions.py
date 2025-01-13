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
    word = data.get('word')
    definition = data.get('definition')
    pronunciation = data.get('pronunciation')
    pos = data.get('pos')
    print(data)

    try:
        db = get_db()
        connection = current_app.mysql.connection
        query = 'INSERT INTO definitions (word, definition, part_of_speech, pronunciation) VALUES (%s, %s, %s, %s)'
        db.execute(query, (word, definition, pos, pronunciation))
        connection.commit()
        print('Added successfully')
        return jsonify({"message": "Definition added successfully!", "word": word, "definition": definition}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route('/get_definitions', methods=['GET'])
def get_definition():
    
    db = get_db()

    try: 
        db.execute(
            'SELECT * FROM definitions'
        )
        definitions = db.fetchall()
        return jsonify(definitions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500 


@bp.route('/check_duplicate', methods=['GET'])
def check_dup():
    
    word = request.args.get('word')
    db = get_db()

    if not word:
        return jsonify({"error": "Missing 'word' parameter"}), 400

    try: 
        query = "SELECT COUNT(*) FROM definitions WHERE word = %s"
        db.execute(query, (word,))
        count = db.fetchone()[0]

        return jsonify({"exists": count > 0})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    