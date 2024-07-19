from flask import Blueprint,request,jsonify
from models import db,User
from flask_jwt_extended import jwt_required,get_jwt_identity
from aux_func import is_admin

admin=Blueprint('admin',__name__)

@admin.route('/protected',methods=['GET'])
@jwt_required()
@is_admin
def gett():
    current=get_jwt_identity()
    response={'message':'logged in as'+str(current['name'])}
    return jsonify(response),200