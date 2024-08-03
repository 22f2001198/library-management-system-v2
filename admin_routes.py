from flask import Blueprint,request,jsonify
from models import db,User,Section,Books,Requests
from flask_jwt_extended import jwt_required,get_jwt_identity
from aux_func import is_admin
from datetime import datetime

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
        x={
            'requestid':x.requestid,
            'userid':x.id,
            'bookid':x.bookid
        }
        response.append(x)
    return jsonify(response),200