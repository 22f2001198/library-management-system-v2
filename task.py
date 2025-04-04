from celery import shared_task
from models import *
import csv
import datetime
from flask import jsonify
from aux_func import today
from mail import *

@shared_task()
def add(x,y):
    return x+y

@shared_task()
def async_job():
    header=['Username','Book Name','Issue Date','Return Date','Author']
    with open('admin_report.csv','w',newline='') as f:
        csvwriter=csv.writer(f)
        csvwriter.writerow(header)
        content=[]
        issues=Issued.query.all()
        for x in issues:
            user=User.query.get(x.id)
            book=Books.query.get(x.bookid)
            csvwriter.writerow([
                user.username,
                book.name,
                x.doi,
                x.dor,
                book.author,
            ])
            issue={
                'username':user.username,
                'bookname':book.name,
                'issuedate':x.doi,
                'returndate':x.dor,
                'author':book.author
            }
            content.append(issue)
    return jsonify(content),200

@shared_task
def daily_reminder():
    users=User.query.all()
    for user in users:
        to=user.email
        sub='Daily remainder LMS-V2'
        body=Template('''
                     <h6>Daily Reminder</h6>
                     <p>Dear User,<br>You have not visited LMS today.<br>Please, visit and check out Lastest and Most Poular books.<br>Regards<br>LMS Team.
        ''').render()
        send_email(to,sub,body)
        return "ok"

@shared_task
def send_warning():
    issues=Issued.query.all()
    for issue in issues:
        if issue.dor>=today:
            user=User.query.get(issue.id)
            to=user.email
            sub='Book Return reminder'
            body=Template('''
                         <h6>Daily Reminder</h6>
                         <p>Dear User,<br>You have not returned issued book(s) on the return date.<br>Please, visit and return the book(s) as soon as possible.<br>Regards<br>LMS Team.
            ''').render()
            send_email(to,sub,body)
            return 'ok'
        else:
            return 'ok'

@shared_task
def monthly_report():
    ratings=Review.query.all()
    issued=Issued.query.all()
    admin=User.query.filter(User.role=='admin').first()
    to=admin.email
    sub='Monthly activity report'
    template=Template('''
    Dear admin,<br>
    The monthly activity report as follows-
    <h6>Reviews Table:</h6>
    <table class="table table-bordered" border="2px" border-color="black">
        <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Rating</th>
            <th>Comment</th>
        </tr>
        {% for rating in ratings %}
        <tr>
            <td>{{rating.reviewid}}</td>
            <td>{{rating.id}}</td>
            <td>{{rating.bookid}}</td>
            <td>{{rating.rating}}</td>
            <td>{{rating.comment}}</td>
        </tr>
        {% endfor %}
    </table>
    <h6>Issued Table:</h6>
    <table class="table table-bordered" border="2px" border-color="black">
        <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Issue Date</th>
            <th>Return Date</th>
        </tr>
        {% for issue in issued %}
        <tr>
            <td>{{issue.issueid}}</td>
            <td>{{issue.id}}</td>
            <td>{{issue.bookid}}</td>
            <td>{{issue.doi}}</td>
            <td>{{issue.dor}}</td>
        </tr>
        {% endfor %}
    </table>
    ''')
    body=template.render(ratings=ratings,issued=issued)
    send_email(to,sub,body)
    return "OK"
