from flask import request, session, make_response, abort
from flask_restful import Resource
from sqlalchemy.orm import subqueryload

from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Boulder, Comment


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
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")
    
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







class Boulders(Resource):

    def get(self):
        boulders = [boulder.to_dict() for boulder in Boulder.query.all()]
        return make_response(boulders, 200)

class BoulderByArea(Resource):

    def get(self, area):
        boulders = Boulder.query.filter(Boulder.area == area).all()
        return make_response([boulder.to_dict() for boulder in boulders], 200)

api.add_resource(Boulders, "/boulders")
api.add_resource(BoulderByArea, "/boulders/<string:area>")






class BouldersById(Resource):
    
    def get(self, area, id):
        print(f"area: {area}, id: {id}")
        boulder = Boulder.query.filter_by(id=id).first().to_dict()
        return make_response(
            boulder, 
            200
        )

api.add_resource(BouldersById, "/boulders/<string:area>/<int:id>")






class Comments(Resource):
    
    def get(self, boulder_id):
        comments = [comment.to_dict() for comment in Comment.query.filter_by(boulder_id=boulder_id)]
        return make_response(
            comments,
            200
        )


    def post(self, boulder_id):
        data = request.get_json()
        comment = Comment(
            comment=data["comment"],
            user_id=data["user_id"],
            boulder_id=boulder_id
        )
        db.session.add(comment)
        db.session.commit()
        return make_response(
            comment.to_dict(),
            201
        )
    

    def delete(self, boulder_id):
        comment = Comment.query.filter_by(boulder_id=boulder_id).first()
        db.session.delete(comment)
        db.session.commit()
        return make_response({}, 204)
    
api.add_resource(Comments, "/comments/<int:boulder_id>")










if __name__ == '__main__':
    app.run(port=5555, debug=True)

