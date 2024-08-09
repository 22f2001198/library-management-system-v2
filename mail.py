from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from jinja2 import Template
from models import User

#admin=User.query.filter(User.role=='admin').first()

SMTP_SERVER='localhost'
SMTP_PORT='1025'
SENDER_EMAIL='admin@test.com'
SENDER_PASSWORD=''

def send_email(to,sub,body):
    message=MIMEMultipart()
    message['To']=to
    message['Subject']=sub
    message['From']=SENDER_EMAIL
    message.attach(MIMEText(body,'html'))

    client=smtplib.SMTP(host=SMTP_SERVER,port=SMTP_PORT)
    client.send_message(msg=message)
    client.quit()

#send_email('test@test.com','test02','<p>This is a test email.</p>')