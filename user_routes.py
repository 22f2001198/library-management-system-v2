from flask import Blueprint,request,jsonify
from models import db,User,Review,Requests,Books
from flask_jwt_extended import jwt_required,get_jwt_identity

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
    if len(requested_books)>5:
        return jsonify({'message':'you can not request more than 5 books.'}),401
    requested_book=Requests(id=user,bookid=bookid)
    db.session.add(requested_book)
    db.session.commit()
    return jsonify({'message':'requested successfully.'}),200