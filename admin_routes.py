from flask import Blueprint,request,jsonify
from models import db,User,Section,Books,Requests,Issued,Review
from flask_jwt_extended import jwt_required,get_jwt_identity
from aux_func import is_admin
from datetime import datetime
import os
from sqlalchemy import desc
import matplotlib.pyplot as plt
plt.switch_backend('agg')

admin=Blueprint('admin',__name__)

@admin.route('/section/add',methods=['POST'])
@jwt_required()
@is_admin
def add_section():
    name=request.json.get('name',None)
    date_str=request.json.get('created',None)
    description=request.json.get('description',None)
    created=datetime.strptime(date_str,'%Y-%m-%d').date()
    existing=Section.query.filter(name==Section.name).first()
    if existing:
        return jsonify({'message':'Section alredy exists.'}),401
    new_section=Section(name=name,created=created,description=description)
    db.session.add(new_section)
    db.session.commit()
    return jsonify({'message':'section created successfully.'}),201

@admin.route('/section/edit/<int:id>',methods=['GET','PUT'])
@jwt_required()
@is_admin
def edit_section(id):
    exists=Section.query.get(id)
    if request.method=='GET':
        response={
            'id':exists.id,
            'name':exists.name,
            'description':exists.description
        }
        return jsonify(response),200
    if request.method=='PUT':
        name=request.json.get('name',None)
        description=request.json.get('description',None)
        exists.name=name
        exists.description=description
        db.session.commit()
        return jsonify({'message':'Updated Successfully.'}),200
    

@admin.route('/section/delete/<int:id>',methods=['DELETE'])
@jwt_required()
@is_admin
def delete_section(id):
    exists=Section.query.get(id)
    db.session.delete(exists)
    db.session.commit()
    return jsonify({'message':'Successfully Deleted section.'}),200

@admin.route('/book/add',methods=['POST'])
@jwt_required()
@is_admin
def add_book():
    name=request.json.get('name')
    author=request.json.get('author')
    sec=request.json.get('s_id')
    content=request.json.get('content')
    exists=Books.query.filter(name==Books.name).first()
    if exists:
        return jsonify({'message':'Book already exists.'}),401
    new_book=Books(name=name,author=author,s_id=int(sec),content=content,available=True)
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message':'book added successfully'}),201

@admin.route('/book/edit/<int:bookid>',methods=['PUT'])
@jwt_required()
@is_admin
def edit_book(bookid):
    exists=Books.query.get(bookid)
    author=request.json.get('author')
    content=request.json.get('content')
    exists.author=author
    exists.content=content
    db.session.commit()
    return jsonify({'message':'Updated Successfully.'}),200

@admin.route('/book/delete/<int:bookid>',methods=['DELETE'])
@jwt_required()
@is_admin
def delete_book(bookid):
    exists=Books.query.get(bookid)
    db.session.delete(exists)
    db.session.commit()
    return jsonify({'message':'Deleted Successfully.'}),200

@admin.route('/requests')
@jwt_required()
@is_admin
def get_requests():
    requests=Requests.query.all()
    response=[]
    for x in requests:
        user=User.query.get(x.id)
        book=Books.query.get(x.bookid)
        x={
            'requestid':x.requestid,
            'id':x.id,
            'username':user.username,
            'bookid':x.bookid,
            'bookname':book.name
        }
        response.append(x)
    return jsonify(response),200

@admin.route('/request/<int:requestid>',methods=['GET'])
@jwt_required()
@is_admin
def get_request(requestid):
    request=Requests.query.get(requestid)
    response={
        'requestid':request.requestid,
        'id':request.id,
        'bookid':request.bookid
    }
    return jsonify(response),200

@admin.route('/request/reject/<int:requestid>',methods=['DELETE'])
@jwt_required()
@is_admin
def reject_request(requestid):
    request=Requests.query.get(requestid)
    db.session.delete(request)
    db.session.commit()
    return jsonify({'message':'Request rejected.'}),200

@admin.route('/book/issue/<int:id>/<int:bookid>',methods=['POST'])
@jwt_required()
@is_admin
def issue_book(id,bookid):
    book=Issued.query.filter(id==Issued.id,bookid==Issued.bookid).first()
    requested=Requests.query.filter(id==Requests.id,bookid==Requests.bookid).first()
    availablity=Books.query.get(bookid)
    if book:
        return jsonify({'message':'This Book is already issued to you.'}),405
    if availablity.available==False:
        return jsonify({'message':'This Book is already issued to someone.'}),404
    date_str=request.json.get('doi')
    doi=datetime.strptime(date_str,'%Y-%m-%d').date()
    new=Issued(id=id,bookid=bookid,doi=doi)
    availablity.available=False
    db.session.add(new)
    db.session.delete(requested)
    db.session.commit()
    return jsonify({'message':'Book issued.'}),200

@admin.route('/issued')
@jwt_required()
@is_admin
def get_issued():
    issued=Issued.query.all()
    response=[]
    for x in issued:
        user=User.query.get(x.id)
        book=Books.query.get(x.bookid)
        x={
            'issueid':x.issueid,
            'id':x.id,
            'username':user.username,
            'bookid':x.bookid,
            'book':book.name,
            'doi':x.doi
        }
        response.append(x)
    return jsonify(response),200

@admin.route('/book/revoke/<int:bookid>',methods=['DELETE'])
@jwt_required()
@is_admin
def revoke_book(bookid):
    to_revoke=Issued.query.get(bookid)
    db.session.delete(to_revoke)
    book=Books.query.get(bookid)
    book.available=True
    db.session.commit()
    return jsonify({'message':'Book revoked.'}),200

@admin.route('/users')
@jwt_required()
@is_admin
def get_users():
    role='user'
    users=User.query.filter(role==User.role).all()
    response=[]
    for x in users:
        x={
            'id':x.id,
            'username':x.username,
            'name':x.name,
            'role':x.role,
            'email':x.email
        }
        response.append(x)
    return jsonify(response),200

@admin.route('/user/<int:id>')
@jwt_required()
@is_admin
def get_user(id):
    user=User.query.get(id)
    response={
        'id':user.id,
        'username':user.username,
        'name':user.name,
        'role':user.role,
        'email':user.email
    }
    return jsonify(response),200

@admin.route('/user/ratings/<int:id>')
@jwt_required()
@is_admin
def get_user_ratings(id):
    ratings=Review.query.filter(id==Review.id).all()
    response=[]
    for x in ratings:
        book=Books.query.get(x.bookid)
        x={
            'reviewid':x.reviewid,
            'id':x.id,
            'bookid':x.bookid,
            'book':book.name,
            'rating':x.rating,
            'comment':x.comment
        }
        response.append(x)
    return jsonify(response),200

@admin.route('/user/requests/<int:id>')
@jwt_required()
@is_admin
def get_user_requests(id):
    requests=Requests.query.filter(id==Requests.id).all()
    response=[]
    for x in requests:
        book=Books.query.get(x.bookid)
        x={
            'requestid':x.requestid,
            'id':x.id,
            'bookid':x.bookid,
            'book':book.name
        }
        response.append(x)
    return jsonify(response),200

@admin.route('/user/issued/<int:id>')
@jwt_required()
@is_admin
def get_user_issued(id):
    issued=Issued.query.filter(id==Issued.id).all()
    response=[]
    for x in issued:
        book=Books.query.get(x.bookid)
        x={
            'issueid':x.issueid,
            'id':x.id,
            'bookid':x.bookid,
            'book':book.name,
            'doi':x.doi
        }
        response.append(x)
    return jsonify(response),200

@admin.route('/user/ban/<int:id>',methods=['DELETE'])
@jwt_required()
@is_admin
def ban_user(id):
    user=User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message':'User banned.'}),200

@admin.route('/test')
@jwt_required()
@is_admin
def avg_ratings():
    books=Books.query.all()
    comments=Review.query.order_by(desc(Review.rating)).limit(5)
    d={}
    for x in books:
        book=Review.query.filter(x.bookid==Review.bookid).all()
        sum=0
        count=1
        for y in book:
            sum+=y.rating
            count+=1
        if count>0:
            d[x.name]=(sum/count)
    l1=list(d.keys())
    l2=list(d.values())
    plt.barh(l1,l2)
    plt.xlabel('Rating')
    plt.ylabel('books')
    plt.title('Book Ratings')
    plt.savefig('static/ratings.png')
    response=[]
    for x in comments:
        user=User.query.get(x.id)
        x={
            'id':x.id,
            'user':user.username,
            'comment':x.comment
        }
        response.append(x)
    return jsonify(response),200