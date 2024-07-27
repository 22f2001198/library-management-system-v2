from flask import Blueprint,request,jsonify
from models import db,User
from flask_jwt_extended import jwt_required,get_jwt_identity
from aux_func import is_admin

admin=Blueprint('admin',__name__)
