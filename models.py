from init import db
from datetime import date

class User(db.Model):
    __tablename__='user'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    passhash=db.Column(db.String,nullable=False)
    role=db.Column(db.String,nullable=False)
    name=db.Column(db.String,nullable=False)
    email=db.Column(db.String,nullable=False)

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