from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import secret,project_db,jwt_secret_key
from os import path

db=SQLAlchemy()          #db initialisation

def create_app():
    app=Flask(__name__)  #app creation
    app.config['SECRET_KEY']=secret                  #app config
    app.config['SQLALCHEMY_DATABASE_URI']=project_db
    app.config['JWT_SECRET_KEY']=jwt_secret_key
    db.init_app(app)
    jwt=JWTManager(app)    #jwt initialisation

    from admin_routes import admin        #import components
    from user_routes import user

    app.register_blueprint(admin,url_prefix='/')        #register blueprints
    app.register_blueprint(user,url_prefix='/')

    from models import User              #get db models
    create_database(app)
    return app

def create_database(app):              #create database
    if not path.exists('/project_db'):
        with app.app_context():
            db.create_all()