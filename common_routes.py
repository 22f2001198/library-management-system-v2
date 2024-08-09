from flask import Blueprint,request,jsonify,make_response
from flask_jwt_extended import jwt_required
from models import db,Section,Books
from init import cache
import datetime
from task import add,async_job
from celery.result import AsyncResult
import csv
import io

comm=Blueprint('comm',__name__)

@comm.route('/cache')
@cache.cached(timeout=2)
def demo():
    return jsonify({'data':datetime.datetime.now()})

@comm.route('/section')
@jwt_required()
@cache.cached(timeout=2)
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
@cache.cached(timeout=2)
def get_books():
    books=Books.query.all()
    response=[]
    if len(books)==0:
        return jsonify({'message':'No books added yet.'}),404
    for x in books:
        section=Section.query.filter(x.s_id==Section.id).first()
        x={
            'bookid':x.bookid,
            'name':x.name,
            'author':x.author,
            'section':section.name,
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

@comm.route('/search',methods=['POST'])
@jwt_required()
def search():
    type = request.json.get('type')
    query = request.json.get('query')
    response=[]
    if type == 'title':
        results=Books.query.filter(Books.name.like('%'+query+'%')).all()
    else:
        results=Books.query.filter(Books.author.like('%'+query+'%')).all()
    for x in results:
        section=Section.query.filter(x.s_id==Section.id).first()
        x={
            'bookid':x.bookid,
            'name':x.name,
            'author':x.author,
            'section':section.name,
        }
        response.append(x)
    return jsonify(response),200

@comm.route('/section/browse',methods=['POST'])
@jwt_required()
def browse_section():
    section=request.json.get('section')
    response=[]
    books=Books.query.filter(section==Books.s_id).all()
    for x in books:
        x={
            'bookid':x.bookid,
            'name':x.name,
            'author':x.author
        }
        response.append(x)
    print(books)
    return jsonify(response),200

@comm.route('/celerydemo')
def celerydemo():
    task=add.delay(10,20)
    return jsonify({'taskid':task.id})

@comm.route('/task/<taskid>')
def get_task(taskid):
    result=AsyncResult(taskid)
    if result.ready():
        return jsonify({'result':result.result}),200
    return jsonify({'message':'task not ready.'}),404

@comm.route('/report')
def get_report():
    task=async_job.delay()
    result=task.get()
    return result,200

@comm.route('/report/download')
def download_report():
    with open('admin_report.csv','r') as file:
        csvreader=csv.reader(file)
        csvdata=list(csvreader)
        csvbuffer=io.StringIO()
        csvwriter=csv.writer(csvbuffer)
        csvwriter.writerows(csvdata)
        print(csvbuffer.getvalue())
    response=make_response(csvbuffer.getvalue())
    response.headers['Content-Disposition']='attachment;filename=report.csv'
    response.headers['Content-Type']='text/csv'
    return response