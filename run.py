# from flaskBackend import create_app

# app = create_app()

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8080)


import MySQLdb

try:
    connection = MySQLdb.connect(
        host="127.0.0.1",
        user="camkitsql",
        passwd="camkitpass",
        db="definition_db"
    )
    print("Connection successful!")
except MySQLdb.OperationalError as e:
    print(f"Connection failed: {e}")