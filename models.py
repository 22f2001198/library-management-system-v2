from init import db
from datetime import date
import datetime

class User(db.Model):
    __tablename__='user'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    passhash=db.Column(db.String,nullable=False)
    role=db.Column(db.String,nullable=False)
    name=db.Column(db.String,nullable=False)
    email=db.Column(db.String,nullable=False)
    review=db.relationship('Review',back_populates='user',cascade='all, delete-orphan')
    requests=db.relationship('Requests',back_populates='user',cascade='all, delete-orphan')
    issued=db.relationship('Issued',back_populates='user',cascade='all, delete-orphan')

class Section(db.Model):
    __tablename__='section'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    name=db.Column(db.String(20),nullable=False)
    created=db.Column(db.Date,default=date.today())
    description=db.Column(db.String())
    books=db.relationship('Books',back_populates='section',passive_deletes='all')

class Books(db.Model):
    __tablename__='books'
    bookid=db.Column(db.Integer,primary_key=True,autoincrement=True)
    name=db.Column(db.String(20),nullable=False)
    author=db.Column(db.String(20))
    content=db.Column(db.String())
    s_id=db.Column(db.Integer,db.ForeignKey('section.id',ondelete='SET NULL'))
    available=db.Column(db.Boolean,default=True,nullable=False)
    section=db.relationship('Section',back_populates='books')
    review=db.relationship('Review',back_populates='books',cascade='all, delete-orphan')
    requests=db.relationship('Requests',back_populates='books',cascade='all, delete-orphan')
    issued=db.relationship('Issued',back_populates='books',cascade='all, delete-orphan')

class Review(db.Model):
    __tablename__='review'
    reviewid=db.Column(db.Integer,primary_key=True,autoincrement=True)
    bookid=db.Column(db.Integer,db.ForeignKey('books.bookid'),nullable=False)
    id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    rating=db.Column(db.Integer,nullable=False)
    comment=db.Column(db.String)
    books=db.relationship('Books',back_populates='review')
    user=db.relationship('User',back_populates='review')

class Requests(db.Model):
    __tablename__='requests'
    requestid=db.Column(db.Integer,primary_key=True,autoincrement=True)
    bookid=db.Column(db.Integer,db.ForeignKey('books.bookid'),nullable=False)
    id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    books=db.relationship('Books',back_populates='requests')
    user=db.relationship('User',back_populates='requests')

class Issued(db.Model):
    __tablename__='issued'
    issueid=db.Column(db.Integer,primary_key=True,autoincrement=True)
    bookid=db.Column(db.Integer,db.ForeignKey('books.bookid'),nullable=False)
    id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    doi=db.Column(db.Date,default=datetime.date.today())
    books=db.relationship('Books',back_populates='issued')
    user=db.relationship('User',back_populates='issued')