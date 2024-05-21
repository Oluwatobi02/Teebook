from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from auth import *
from userdb import *
from articledb import *

app = Flask(__name__)
app.config["SECRET_KEY"] = "03faa7b5-3058-41ae-b7f4-225ffdf80a0f"


CORS(app)

jwt = JWTManager(app)

LIMIT = 400
ip_address_counts = {}


@app.route('/')
def index():
    return "<h1>Welcome to The application</h1>" 

@app.route('/token', methods=['POST'])
def create_token():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)
    result, status = user_login(email, password)
    if status !=200:
        return result
    message, id = result
    access_token = create_access_token(identity= id)
    return jsonify(access_token=access_token, message=message)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    name = data.get('name')
    password =data.get('password')
    age = data.get('age')
    phone_number = data.get('phoneNumber')
    city = data.get('city')
    state = data.get('state')
    country = data.get('country')
    sending_mail(email, "Welcome to Teebook")

    res = user_signup(email, password, name, age, phone_number, city, state, country)
    return jsonify(res)

 
@app.route('/posts')
@jwt_required()
def all_posts():
    ip_address_counts[request.remote_addr] = ip_address_counts.get(request.remote_addr, 0) + 1
    if ip_address_counts[request.remote_addr] > LIMIT:
        return jsonify(error="You have exceeded the limit of requests")
    page= request.args.get('page')
    perpage = 15
    offset = int(page) * perpage
    user_id = get_jwt_identity()['id']
    result = get_all_articles(user_id, offset, perpage)
    if result:
        return jsonify(result)
    return jsonify(error="No posts found", posts=None)

@app.route('/post')
@jwt_required()
def post():
    user_id = get_jwt_identity()['id']
    print(user_id)
    post_id = request.args.get('postid', type=str)
    print(post_id)
    result = get_post(user_id,post_id)
    if result:
        return jsonify(result)
    return jsonify(message="Post not found", post=None)




@app.route('/makepost', methods=['POST'])
@jwt_required()
def make_post():
    data = request.json
    user_data = get_jwt_identity()
    user_id = user_data['id']
    title = data.get('title')
    content = data.get('content')
    post_id = add_new_article(title, content, user_id)
    add_post_to_user(user_id, post_id)
    return jsonify(message="Post created successfully")
    

@app.route('/profile')
@jwt_required()
def profile():
    user_data = get_jwt_identity()
    user_id = user_data['id']
    user = show_user_profile(user_id)
    return jsonify(user=user)

@app.route('/like', methods=["POST"])
@jwt_required()
def likepost():
    user = get_jwt_identity()
    user_id = user['id']
    data = request.json
    post_id = data.get('post_id')
    like_article(user_id,post_id)
    return jsonify(message="Post liked successfully", liked=True)
 
@app.route('/unlike', methods=["POST"])
@jwt_required()
def unlikepost():
    user_id = get_jwt_identity()['id']
    data = request.json
    post_id = data.get('post_id')
    unlike_article(user_id, post_id)
    return jsonify(message="Post liked successfully", unliked=False)



@app.route('/test', methods=["POST"])
def test():
    page = request.args.get('page', default=1, type=str)
    ppage = request.args.get('ppage', default=1, type=str)
    print(page)
    print(ppage)
    return jsonify(page=page, ppage=ppage)

if __name__ == '__main__':
    app.run()

