from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User


class Signup(Resource):
    
    def post(self):

        data = request.get_json()

        username = data.get("username")
        password = data.get("password")


        new_user = User(
            username=username,
        )
        new_user.password_hash = password

        try: 
            db.session.add(new_user)
            db.session.commit()

            session["user_id"] = new_user.id

            return new_user.to_dict(), 201
        
        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422
        
api.add_resource(Signup, "/signup")





class CheckSession(Resource):
    def get(self):
        if session.get["user_id"]:
            user = User.query.filter(User.id == session["user_id"]).first()
            return user.to_dict(), 200
        return {"error": "401 Unauthorized"}, 401
    
api.add_resource(CheckSession, "/check_session")





class Login(Resource):

    def post(self):

        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200
            
        return {"error": "401 Unauthorized"}, 401
    
api.add_resource(Login, "/login")





class Logout(Resource):
    
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204
        
        return {"error": "401 Unauthorized"}, 401
    
api.add_resource(Logout, "/logout")
        





