from flask import Blueprint,request,jsonify
from models import db,User,Review,Requests,Books,Issued,Section
from flask_jwt_extended import jwt_required,get_jwt_identity
from init import cache

user=Blueprint('user',__name__)

@user.route('/book/rate/<int:bookid>',methods=['POST'])
@jwt_required()
def rate_book(bookid):
    current=get_jwt_identity()
    user=current['id']
    rating_str=request.json.get('rating')
    comment=request.json.get('comment')
    if rating_str=='':
        return jsonify({'message':'Please enter a rating.'}),401
    exists=Review.query.filter(user==Review.id,bookid==Review.bookid).first()
    if exists:
        exists.rating=int(rating_str)
        exists.comment=comment
        db.session.commit()
        return jsonify({'message':'rating updated successfully.'}),200
    new=Review(id=user,bookid=bookid,rating=int(rating_str),comment=comment)
    db.session.add(new)
    db.session.commit()
    return jsonify({'message':'rated successfully.'}),200

@user.route('/book/request/<int:bookid>',methods=['POST'])
@jwt_required()
def request_book(bookid):
    current=get_jwt_identity()
    user=current['id']
    remarks=request.json.get('remarks')
    available=Books.query.get(bookid)
    requested=Requests.query.filter(bookid==Requests.bookid,user==Requests.id).first()
    if not available.available:
        return jsonify({'message':'book is currently issued.'}),401
    if requested:
        return jsonify({'message':'youchave already requested this book.'}),401
    requested_books=Requests.query.filter(user==Requests.id).all()
    issued_books=Issued.query.filter(user==Issued.id).all()
    if len(requested_books)+len(issued_books)>5:
        return jsonify({'message':'you can not request more than 5 books.'}),401
    requested_book=Requests(id=user,bookid=bookid)
    db.session.add(requested_book)
    db.session.commit()
    return jsonify({'message':'requested successfully.'}),200

@user.route('/mybooks')
@jwt_required()
def my_books():
    current=get_jwt_identity()
    user=current['id']
    mybooks=Issued.query.filter(user==Issued.id).all()
    response=[]
    for x in mybooks:
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

@user.route('/book/return/<int:bookid>',methods=['DELETE'])
@jwt_required()
def return_book(bookid):
    to_return=Issued.query.filter(bookid==Issued.bookid).first()
    book=Books.query.get(bookid)
    db.session.delete(to_return)
    book.available=True
    db.session.commit()
    return jsonify({'message':'Book returned.'}),200

@user.route('/popular')
@jwt_required()
@cache.cached(timeout=2)
def get_popular():
    popular=Review.query.order_by(Review.rating).limit(5)
    response=[]
    for x in popular:
        book=Books.query.get(x.bookid)
        section=Section.query.filter(book.s_id==Section.id).first()
        x={
            'bookid':x.bookid,
            'name':book.name,
            'section':section.name,
            'author':book.author
        }
        response.append(x)
    return jsonify(response),200

@user.route('/latest')
@jwt_required()
@cache.cached(timeout=2)
def get_latest():
    latest=Books.query.order_by(Books.bookid).limit(5)
    response=[]
    for x in latest:
        section=Section.query.filter(x.s_id==Section.id).first()
        x={
            'bookid':x.bookid,
            'name':x.name,
            'section':section.name,
            'author':x.author
        }
        response.append(x)
    return jsonify(response),200

@user.route('/comments')
@jwt_required()
@cache.cached(timeout=2)
def get_comments():
    comments=Review.query.order_by(Review.rating).limit(5)
    response=[]
    for x in comments:
        user=User.query.get(x.id)
        x={
            'user':user.username,
            'comment':x.comment
        }
        response.append(x)
    return jsonify(response),200