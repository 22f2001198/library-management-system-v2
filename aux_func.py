from flask import jsonify
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from models import db,User
import datetime

def is_admin(func):
    @wraps(func)
    def admin_auth(*args,**kwargs):
        current=get_jwt_identity()
        if current['role']=='admin':
            return func(*args,**kwargs)
        return jsonify({'message':'Access Denied'})
    return admin_auth

today=datetime.date.today()

def get_returndate(x):
    return_date=x + datetime.timedelta(days=6)
    return return_date