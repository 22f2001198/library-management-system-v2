from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required
from models import db,Section

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