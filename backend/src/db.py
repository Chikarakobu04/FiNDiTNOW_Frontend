from http import HTTPStatus
import os
from pathlib import Path
from urllib import response
from src import ALLOWED_EXTENSIONS, UPLOAD_FOLDER, app
from src import db
from src import ma
from flask import Flask, logging, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, LargeBinary, String, desc
from werkzeug.utils import secure_filename
import boto3
from botocore.exceptions import ClientError
import logging
from sqlalchemy.orm import relationship
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base

PNG_MIMETYPE = "image/png"
JPEG_MIMETYPE = "image/jpeg"
S3_BUCKET = "finditnow-upload-bucket"

# Engine の作成
Engine = create_engine(
  app.config['SQLALCHEMY_DATABASE_URI'],
#   encoding="utf-8",
  echo=True
)
Base = declarative_base()

# # Sessionの作成
# session = Session(
#   autocommit = False,
#   autoflush = True,
#   bind = Engine
# )

SessionClass = sessionmaker(Engine)  # セッションを作るクラスを作成
session = SessionClass()

# modelで使用する
Base = declarative_base()
# Base.query = session.query_property()

# データモデルの作成
class Image(Base):
    __tablename__ = 'images'
    img_id = Column(Integer, primary_key=True, autoincrement=True) #連番（主キー）
    img_url = Column(String(200)) #画像のURL

    lost_item = relationship("LostItem", back_populates="image")

# class User(Base):
#     __tablename__ = 'users'
#     user_id = Column(Integer, primary_key=True, autoincrement=True) #ユーザーid 連番（主キー）
#     user_name = Column(String(100)) #ユーザーネーム
#     user_email = Column(String(100)) #メールアドレス
#     user_password = Column(String(100)) #パスワード

#     lost_items = relationship("LostItem", back_populates="user")

class LostItem(Base):
    __tablename__ = 'lost_items'
    li_id = Column(Integer, primary_key=True, autoincrement=True) #落とし物id 連番（主キー）
    li_name = Column(String(100)) #落とし物の名前
    li_place = Column(String(200)) #落とし物がある場所
    # user_id = Column(Integer, ForeignKey('users.user_id')) #ユーザーid（外部キー）
    img_id = Column(Integer, ForeignKey('images.img_id')) #画像id（外部キー）

    # user = relationship("User", back_populates="lost_items")
    image = relationship("Image", back_populates="lost_item")


Base.metadata.create_all(Engine)

class ImageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Image
image_schema = ImageSchema(many=True)

# class UserSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = User
# user_schema = UserSchema(many=True)

class LostItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LostItem
lost_item_schema = LostItemSchema(many=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 実装用の一時的なエンドポイント
# @app.route("/")
# def hello():
#   return "<p>Hello, Flask!</p>"

@app.route('/images/<int:img_id>', methods=["GET"])
def getImage(img_id):

    data = session.query(Image).filter_by(img_id=img_id).first()
    return jsonify({"img_id":str(data.img_id), "img_url":str(data.img_url)})

logger = logging.getLogger(__name__)

# s3にある画像の署名付きURLを作成する関数
def generate_presigned_url(s3_client, client_method, method_parameters, expires_in):
    """
    Generate a presigned Amazon S3 URL that can be used to perform an action.

    :param s3_client: A Boto3 Amazon S3 client.
    :param client_method: The name of the client method that the URL performs.
    :param method_parameters: The parameters of the specified client method.
    :param expires_in: The number of seconds the presigned URL is valid for.
    :return: The presigned URL.
    """
    try:
        url = s3_client.generate_presigned_url(
            ClientMethod=client_method, Params=method_parameters, ExpiresIn=expires_in
        )
        logger.info("Got presigned URL: %s", url)
    except ClientError:
        logger.exception(
            "Couldn't get a presigned URL for client method '%s'.", client_method
        )
        raise
    return url


def upload_to_s3(file_path, bucket, object_name):
    """
    ファイルをS3バケットにアップロードする関数

    :param file_name: アップロードするファイル
    :param bucket: アップロード先のS3バケット
    :param object_name: S3オブジェクト名。指定しない場合はfile_nameが使用される
    :return: アップロードが成功すればTrue、失敗すればFalse
    """

    if object_name is None:
        object_name = file_path

    # 直接キーを使用してS3クライアントを作成
    s3_client = boto3.client(
        's3',
        aws_access_key_id=app.config['YOUR_ACCESS_KEY'], #実際に取得したアクセスキーを入力する
        aws_secret_access_key=app.config['YOUR_SECRET_KEY'], #実際に取得したアクセスキーを入力する
    )

    try:
        s3_client.upload_file(file_path, bucket, object_name)
        print(f"Successfully uploaded {file_path} to {bucket}/{object_name}")
    except Exception as e:
        print(f"S3 Upload Error: {e}")
        return False
    
    client_action = "get_object"

    return generate_presigned_url(
        s3_client, client_action, {"Bucket": bucket, "Key": object_name}, 604800
    )

@app.route('/images', methods=["POST"])
def postImage():
    entry = Image()

    """
    画像保存処理
    """

    if 'image' not in request.files:
        # ファイルが選択されていない場合
        print('ファイルが選択されていません')
        return HTTPStatus.BAD_REQUEST

    # 画像として読み込み
    img = request.files['image']

    if img.filename == "":
        # ファイル名がついていない場合
        print("ファイル名がありません")
        return HTTPStatus.BAD_REQUEST

    if img and allowed_file(img.filename):
        filename = secure_filename(img.filename)

        try:
            Path(UPLOAD_FOLDER).mkdir(parents=True, exist_ok=True)
            img.save(UPLOAD_FOLDER / filename)

            img_url = upload_to_s3(str(UPLOAD_FOLDER / filename), S3_BUCKET, filename)

            if img_url == False:
                return HTTPStatus.INTERNAL_SERVER_ERROR

        except Exception as e:
            print(f"画像の保存に失敗: {e}")
            return HTTPStatus.INTERNAL_SERVER_ERROR

    """ 
    データベースへの保存 
    """

    entry.img_url = img_url
    session.add(entry)
    session.commit()
    session.close()

    """
    レスポンスを返す
    """
    latestdata= session.query(Image).order_by(desc(Image.img_id)).first() 

    return jsonify({"img_id":str(latestdata.img_id)})

#GET(1件参照)
# @app.route('/users/<int:user_id>', methods=["GET"])
# def getUser(user_id):
    
#     data = session.query(User).filter_by(user_id=user_id).first() 
#     return jsonify({"user_id":str(data.user_id), "user_name":str(data.user_name), "user_email":str(data.user_email), "user_password":str(data.user_password)})

#POST(登録)
# @app.route('/users', methods=["POST"])
# def postUser():
#     entry = User()

#     # jsonリクエストから値取得
#     json = request.get_json()
#     if type(json) == list:
#         data = json[0]
#     else:
#         data = json

#     entry.user_name = data["user_name"]
#     entry.user_email = data["user_email"]
#     entry.user_password = data["user_password"]
#     session.add(entry)
#     session.commit()
#     session.close()

#     latestdata = session.query(User).order_by(desc(User.user_id)).first()
#     # latestdata= User.query.order_by(desc(User.user_id)).first()   
#     return redirect('/users/' + str(latestdata.user_id))

#GET(1件参照)
@app.route('/lost-items/<int:li_id>', methods=["GET"])
def getLostItem(li_id):
    
    data = session.query(LostItem).filter_by(li_id=li_id).one()

    # jsonify(lost_item_schema.dump(data))だと外部キーが含まれない。lost_itemのスキーマでダンプしないように以下のような記述をする
    return jsonify({"li_id":str(data.li_id), "li_name":str(data.li_name), "li_place":str(data.li_place), "img_id":str(data.img_id)})
    # return jsonify({"li_id":str(data.li_id), "li_name":str(data.li_name), "li_place":str(data.li_place), "user_id":str(data.user_id), "img_id":str(data.img_id)})

#GET(全件参照)
@app.route('/lost-items', methods=["GET"])
def getLostItemsAll():
    stmt = select(LostItem).join(Image, LostItem.img_id == Image.img_id)
    results = session.execute(stmt).mappings().all()

    organizedData=[]

    for result in results:
        for li_object in result._data:
            organizedData.append({"li_id":li_object.li_id,"li_name":li_object.li_name,"li_place":li_object.li_place,"img_url":li_object.image.img_url})

    return jsonify(organizedData)

#POST(登録)
@app.route('/lost-items', methods=["POST"])
def postLostItem():
    entry = LostItem()

    # jsonリクエストから値取得
    json = request.get_json()
    if type(json) == list:
        data = json[0]
    else:
        data = json

    entry.li_name = data["li_name"]
    entry.li_place = data["li_place"]
    # entry.user_id = data["user_id"]
    entry.img_id = data["img_id"]
    session.add(entry)
    session.commit()
    session.close()

    latestdata= session.query(LostItem).order_by(desc(LostItem.li_id)).first()   
    return redirect('/lost-items/' + str(latestdata.li_id))
