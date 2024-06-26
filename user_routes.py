from flask import Blueprint,request,jsonify
from models import db,User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity

user=Blueprint('user',__name__)

@user.route('/register',methods=['POST'])
def register():
    username=request.json.get("username",None)
    password=request.json.get("password",None)
    name=request.json.get("name",None)
    email=request.json.get("email",None)
    user1=User.query.filter(User.user_name==username).first()
    if user1:
        return jsonify({'msg':'User already exists'}),401
    new=User(user_name=username,passhash=generate_password_hash(password),role='user',name=name,email=email)
    db.session.add(new)
    db.session.commit()
    return jsonify({'msg':'registered successfully'}),201

@user.route('/',methods=['POST'])
def login():
    username=request.json.get("username",None)
    password=request.json.get("password",None)
    user1=User.query.filter(username==User.user_name).first()
    if user1.user_name!=username or not check_password_hash(user1.passhash,password):
        return jsonify({'message':'Wrong Credentials'}),401
    access_token=create_access_token(identity={'id':user1.user_id,'username':user1.user_name,'role':user1.role,'name':user1.name,'email':user1.email})
    return jsonify(access_token=access_token)

@user.route('/user',methods=['GET'])
@jwt_required()
def gett():
    current=get_jwt_identity()
    return jsonify(logged_in_as=current['name']),200