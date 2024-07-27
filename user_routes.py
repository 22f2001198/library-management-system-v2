from flask import Blueprint,request,jsonify
from models import db,User
from flask_jwt_extended import jwt_required,get_jwt_identity

user=Blueprint('user',__name__)
