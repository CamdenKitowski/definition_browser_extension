class Config:
    # MySQL connection parameters for RDS
    MYSQL_HOST = 'definitions-aws.cdi4kc6087j1.us-east-1.rds.amazonaws.com'  # RDS endpoint
    MYSQL_USER = 'admin'  # RDS username
    MYSQL_PASSWORD = 'defpassword'  # RDS password
    MYSQL_DB = 'definition_db'  # Database name
    MYSQL_CURSORCLASS = 'DictCursor'  # Optional: returns results as dictionaries
