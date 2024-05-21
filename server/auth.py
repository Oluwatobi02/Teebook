# This is the authentication

from userdb import *
import bcrypt
salt = bcrypt.gensalt()
def user_signup(email, password, name, age, phone, city, state, country):
    user = userdb.find_one({"email": email})
    if user:
        return {"error": "User already exits"} 
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        add_new_user(name, age, email, hashed_password, phone, city, state, country)
        return {"message": "User created successfully"}
    except:
        return {"error": "Error creating user"}

def user_login(email, password):
    user = userdb.find_one({"email": email})
    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user["password"]):
            return ["Login successful", {"id": str(user["_id"])}], 200
        else:
            return {"error": "incorrect password"}, 403
    return {"error": "User not found"}, 404


