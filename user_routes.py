from flask import Blueprint,request,jsonify
from models import db,User
from flask_jwt_extended import jwt_required,get_jwt_identity

user=Blueprint('user',__name__)

@user.route('/user',methods=['GET'])
@jwt_required()
def gett():
    current=get_jwt_identity()
    response={'message':'logged in as'+str(current['name'])}
    return jsonify(response),200