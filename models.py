from init import db

class User(db.Model):
    __tablename__='user'
    user_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_name=db.Column(db.String,nullable=False,unique=True)
    passhash=db.Column(db.String,nullable=False)
    role=db.Column(db.String,nullable=False)
    name=db.Column(db.String,nullable=False)
    email=db.Column(db.String,nullable=False)