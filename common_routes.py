from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required
from models import db,Section,Books

comm=Blueprint('comm',__name__)

@comm.route('/section')
@jwt_required()
def get_sections():
    sections=Section.query.all()
    response=[]
    if len(sections)==0:
        return jsonify({'message':'No sections created yet.'}),404
    for x in sections:
        x={
            'id':x.id,
            'name':x.name,
            'created':x.created,
            'description':x.description
        }
        response.append(x)
    return jsonify(response),200

@comm.route('/books')
@jwt_required()
def get_books():
    books=Books.query.all()
    response=[]
    if len(books)==0:
        return jsonify({'message':'No books added yet.'}),404
    for x in books:
        x={
            'bookid':x.bookid,
            'name':x.name,
            'author':x.author,
            'section':x.s_id,
        }
        response.append(x)
    return jsonify(response),200

@comm.route('/book/<int:bookid>')
@jwt_required()
def get_book(bookid):
    book=Books.query.get(bookid)
    section=Section.query.filter(book.s_id==Section.id).first()
    response={
        'bookid':book.bookid,
        'name':book.name,
        'author':book.author,
        'section':section.name,
        'content':book.content
    }
    return jsonify(response),200