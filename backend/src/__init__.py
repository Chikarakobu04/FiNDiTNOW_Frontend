import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = BASE_DIR / "static" / "media" / "local"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__, static_folder="static")
app.config['SECRET_KEY'] = 'secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///FindItNow.sqlite3?charset=utf8'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JSON_AS_ASCII'] = False #日本語を利用

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['YOUR_ACCESS_KEY'] = os.environ['YOUR_ACCESS_KEY']
app.config['YOUR_SECRET_KEY'] = os.environ['YOUR_SECRET_KEY']

#SQLAlchemyでデータベース定義
# db = SQLAlchemy(app)
ma = Marshmallow(app)

CORS(app)  # すべてのオリジンからのアクセスを許可

import src.db