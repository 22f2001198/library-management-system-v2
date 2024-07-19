from flask import Blueprint,request,jsonify,render_template
from models import db,User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,jwt_required,set_access_cookies,unset_jwt_cookies

auth=Blueprint('auth',__name__)

@auth.route('/')
def home():
    admin1=User.query.filter(User.role=='admin').first()
    if not admin1:
        new=User(user_name='admin',passhash=generate_password_hash('1234567890'),role='admin',name='Gaurav',email='gaurav@gmail.com')
        db.session.add(new)
        db.session.commit()
    return render_template('index.html')

@auth.route('/register',methods=['POST'])
def register():
    username=request.json.get("username",None)
    password=request.json.get("password",None)
    name=request.json.get("name",None)
    email=request.json.get("email",None)
    user1=User.query.filter(User.user_name==username).first()
    if username=='' or password=='' or name=='' or email=='':
        return jsonify({'message':'Please fill in the required credentials'}),401
    elif user1:
        return jsonify({'message':'User already exists'}),401
    elif len(password)<8 or len(password)>12:
        return jsonify({'message':'password length must be in between 8 to 12'}),401
    elif '@' not in email or '.com' not in email:
        return jsonify({'message':'Please use a valid email'}),401
    new=User(user_name=username,passhash=generate_password_hash(password),role='user',name=name,email=email)
    db.session.add(new)
    db.session.commit()
    return jsonify({'message':'registered successfully'}),200

@auth.route('/login',methods=['POST'])
def login():
    username=request.json.get("username",None)
    password=request.json.get("password",None)
    user=User.query.filter(User.user_name==username).first()
    if not user:
        return jsonify({'message':'User does not exist'}),404
    elif user.user_name!=username or not check_password_hash(user.passhash,password):
        return jsonify({'message':'Wrong Credentials'}),401
    resource={'id':user.user_id,'username':user.user_name,'role':user.role,'name':user.name,'email':user.email}
    access_token=create_access_token(identity=resource)
    response=jsonify({'message':'login successful','data':resource})
    set_access_cookies(response,access_token)
    return response

@auth.route('/logout',methods=['POST'])
@jwt_required()
def logout():
    response=jsonify({'message':'logout successful'})
    unset_jwt_cookies(response)
    return response