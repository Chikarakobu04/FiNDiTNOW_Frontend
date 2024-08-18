import sys

from flask import Flask
from flask_cors import CORS
sys.dont_write_bytecode = True

from src import app

if __name__ == '__main__':
    app.run(debug=True)