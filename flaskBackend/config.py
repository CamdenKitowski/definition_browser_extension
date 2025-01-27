import os

class Config:
    # MySQL connection parameters for RDS
    MYSQL_HOST = '***REDACTED***'  # RDS endpoint
    MYSQL_USER = '***REDACTED***'  # RDS username
    MYSQL_PASSWORD = '***REDACTED***'  # RDS password
    MYSQL_DB = 'definition_db'  # Database name
    MYSQL_CURSORCLASS = 'DictCursor'  # Optional: returns results as dictionaries
