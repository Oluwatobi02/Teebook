from db import main 
userdb = main.users
import os 
from dotenv import load_dotenv
import smtplib
from email import encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from bson import ObjectId
# from articledb import articledb

load_dotenv()

def add_new_user(name, age, email, password, phone_number, city, state, country):
    userdb.insert_one({
        "name": name,
        "age": age,
        "email": email,
        "password": password,
        "phone_number": phone_number,
        "location": {
            "city": city,
            "state": state,
            "country": country,
        },
        "posts": [],
        "saved_posts": [],
    })

 
def get_user_by_id(user_id):
    return userdb.find_one({"_id": ObjectId(user_id)})

def get_user_by_email(email):
    return userdb.find_one({"email": email})

def get_all_users():
    return userdb.find({})

def add_post_to_user(user_id, post_id):
    userdb.update_one({"_id": ObjectId(user_id)}, {"$push": {"posts": ObjectId(post_id)}})

def save_post_to_user(user_id, post_id):
    userdb.update_one({"_id": ObjectId(user_id)}, {"$push": {"saved_posts": ObjectId(post_id)}})

def remove_post_from_user(user_id, post_id):
    userdb.update_one({"_id": ObjectId(user_id)}, {"$pull": {"posts": ObjectId(post_id)}})

def remove_saved_post_from_user(user_id, post_id):
    userdb.update_one({"_id":ObjectId(user_id)}, {"$pull": {"saved_posts": ObjectId(post_id)}})

def delete_user(id):
    userdb.delete_one({"_id": ObjectId(id)})

def show_user_profile(_id):
    user = userdb.find_one({"_id": ObjectId(_id)})
    # user_posts = list(articledb.find({"author": ObjectId(id)}))
    user["_id"] = str(user["_id"])
    user["password"] = str(user["password"])
    user["posts"] = [str(post) for post in user["posts"]]
    # for post in user_posts:
    #     post["_id"] = str(post["_id"])
    #     post["author"] = str(post["author"])
    return user


def sending_mail(recipient, message):
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)

    server.ehlo()

    server.login('oldwhisper98@gmail.com', os.environ.get('EMAIL_PASSWORD'))

    msg = MIMEMultipart()
    msg['From'] = "Tobi"
    msg['To'] = recipient

    msg['Subject'] = "Just a Test"


    msg.attach(MIMEText(message, 'plain'))

    filename = 'main.txt'
    attachment = open(filename, 'rb')
    p = MIMEBase('application', 'octet-stream')
    p.set_payload(attachment.read())

    encoders.encode_base64(p)
    p.add_header('Content-Disposition', f'attachment; filename={filename}')
    msg.attach(p)
    text = msg.as_string()
    server.sendmail('oldwhisper98@gmail.com', recipient, text)






