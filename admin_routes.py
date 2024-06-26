from flask import Blueprint,request,jsonify
from models import db,User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity
from aux_func import is_admin

admin=Blueprint('admin',__name__)

@admin.route('/',methods=['POST'])
def login():
    username=request.json.get("username",None)
    password=request.json.get("password",None)
    admin1=User.query.filter(username==User.user_name).first()
    if not admin1:
        new=User(user_name='admin',passhash=generate_password_hash('1234567890'),role='admin',name='Gaurav',email='gaurav@gmail.com')
        db.session.add(new)
        db.session.commit()
    if admin1.user_name!=username or not check_password_hash(admin1.passhash,password):
        return jsonify({'message':'Wrong Credentials'}),401
    access_token=create_access_token(identity={'id':admin1.user_id,'username':admin1.user_name,'role':admin1.role,'name':admin1.name,'email':admin1.email})
    return jsonify(access_token=access_token)

@admin.route('/protected',methods=['GET'])
@jwt_required()
@is_admin
def gett():
    current=get_jwt_identity()
    return jsonify(logged_in_as=current['name']),200