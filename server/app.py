from flask import request, session, make_response, abort
from flask_restful import Resource
from sqlalchemy.orm import subqueryload
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Boulder, Comment

# Import necessary modules and classes

class Signup(Resource):
    def post(self):
        data = request.get_json()
        # Get JSON data from the request

        username = data.get("username")
        password = data.get("password")
        # Extract username and password from the JSON data

        new_user = User(
            username=username,
        )
        # Create a new User instance with the provided username

        new_user.password_hash = password
        # Set the password hash of the new user

        try: 
            db.session.add(new_user)
            db.session.commit()
            # Add the new user to the database and commit the changes

            session["user_id"] = new_user.id
            # Store the user's ID in the session

            return new_user.to_dict(), 201
            # Return the newly created user as JSON response with HTTP status code 201 (Created)
        
        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422
            # If there's an integrity error (e.g., duplicate username), return an error message with HTTP status code 422 (Unprocessable Entity)

api.add_resource(Signup, "/signup")
# Add the Signup resource to the API with the specified URL endpoint

class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            # Retrieve the user based on the stored user ID in the session

            response = make_response(
                user.to_dict(),
                200
            )
            # Create a response with the user data as JSON and HTTP status code 200 (OK)

            return response
        
        except:
            abort(401, "Unauthorized")
            # If there's an error or the user is not authenticated, abort the request with HTTP status code 401 (Unauthorized)

api.add_resource(CheckSession, "/check_session")
# Add the CheckSession resource to the API with the specified URL endpoint

class Login(Resource):
    def post(self):
        data = request.get_json()
        # Get JSON data from the request

        username = data.get("username")
        password = data.get("password")
        # Extract username and password from the JSON data

        user = User.query.filter(User.username == username).first()
        # Query the user with the provided username

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                # If the user exists and the password is correct, store the user's ID in the session

                return user.to_dict(), 200
                # Return the authenticated user as JSON response with HTTP status code 200 (OK)
            
        return {"error": "401 Unauthorized"}, 401
        # If the user doesn't exist or the password is incorrect, return an error message with HTTP status code 401 (Unauthorized)

api.add_resource(Login, "/login")
# Add the Login resource to the API with the specified URL endpoint

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            # If the user is authenticated, clear the stored user ID in the session

            return {}, 204
            # Return an empty response with HTTP status code 204 (No Content)
        
        return {"error": "401 Unauthorized"}, 401
        # If the user is not authenticated, return an error message with HTTP status code 401 (Unauthorized)

api.add_resource(Logout, "/logout")
# Add the Logout resource to the API with the specified URL endpoint

class Boulders(Resource):
    def get(self):
        boulders = [boulder.to_dict() for boulder in Boulder.query.all()]
        # Retrieve all boulders from the database and convert them to dictionaries

        return make_response(boulders, 200)
        # Return the list of boulders as JSON response with HTTP status code 200 (OK)
    
    def post(self):
        data = request.get_json()
        # Get JSON data from the request

        boulder = Boulder(
            name=data["name"],
            grade=data["grade"],
            rating=data["rating"],
            description=data["description"],
            image=data["image"],
            state=data["state"],
            region=data["region"],
            area=data["area"],
        )
        # Create a new Boulder instance with the provided data

        db.session.add(boulder)
        db.session.commit()
        # Add the new boulder to the database and commit the changes

        return make_response(
            boulder.to_dict(),
            201
        )
        # Return the newly created boulder as JSON response with HTTP status code 201 (Created)

api.add_resource(Boulders, "/boulders")
# Add the Boulders resource to the API with the specified URL endpoint





class BoulderById(Resource):
    def patch(self, id):
        boulder = Boulder.query.filter_by(id=id).first()
        # Retrieve the boulder based on the provided ID

        data = request.get_json()
        # Get JSON data from the request

        for attr in data:
            setattr(boulder, attr, data[attr])
        # Update the attributes of the boulder with the provided data

        db.session.add(boulder)
        db.session.commit()
        # Add the updated boulder to the database and commit the changes

        return make_response(
            boulder.to_dict(), 
            202
        )
        # Return the updated boulder as JSON response with HTTP status code 202 (Accepted)

api.add_resource(BoulderById, "/boulders/<int:id>")
# Add the BoulderById resource to the API with the specified URL endpoint




class BoulderByArea(Resource):
    def get(self, area):
        boulders = Boulder.query.filter(Boulder.area == area).all()
        # Retrieve all boulders in the specified area from the database

        return make_response([boulder.to_dict() for boulder in boulders], 200)
        # Return the list of boulders as JSON response with HTTP status code 200 (OK)

api.add_resource(BoulderByArea, "/boulders/<string:area>")
# Add the BoulderByArea resource to the API with the specified URL endpoint






class BouldersById(Resource):
    
    def get(self, area, id):
        print(f"area: {area}, id: {id}")
        # Print the values of the area and id variables for debugging purposes

        boulder = Boulder.query.filter_by(id=id).first().to_dict()
        # Retrieve the boulder with the specified ID from the database and convert it to a dictionary

        return make_response(
            boulder, 
            200
        )
        # Return the boulder as JSON response with HTTP status code 200 (OK)

api.add_resource(BouldersById, "/boulders/<string:area>/<int:id>")
# Add the BouldersById resource to the API with the specified URL endpoint









class Comments(Resource):
    
    def get(self, boulder_id):
        comments = [comment.to_dict() for comment in Comment.query.filter_by(boulder_id=boulder_id)]
        # Retrieve all comments for the specified boulder ID from the database and convert them to dictionaries

        return make_response(
            comments,
            200
        )
        # Return the list of comments as JSON response with HTTP status code 200 (OK)


    def post(self, boulder_id):
        data = request.get_json()
        # Get JSON data from the request

        comment = Comment(
            comment=data["comment"],
            user_id=data["user_id"],
            boulder_id=boulder_id
        )
        # Create a new Comment instance with the provided data

        db.session.add(comment)
        db.session.commit()
        # Add the new comment to the database and commit the changes

        return make_response(
            comment.to_dict(),
            201
        )
        # Return the newly created comment as JSON response with HTTP status code 201 (Created)

api.add_resource(Comments, "/comments/<int:boulder_id>")
# Add the Comments resource to the API with the specified URL endpoint

class CommentsById(Resource):

    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        # Retrieve the comment with the specified ID from the database

        return make_response(
            comment.to_dict(),
            200
        )
        # Return the comment as JSON response with HTTP status code 200 (OK)


    def patch(self, id):
        comment = Comment.query.filter(Comment.id==id).first() 
        # Retrieve the comment with the specified ID from the database

        data = request.get_json()
        # Get JSON data from the request

        for attr in data:
            setattr(comment, attr, data[attr])
        # Update the attributes of the comment with the provided data

        db.session.add(comment)
        db.session.commit()
        # Add the updated comment to the database and commit the changes

        return make_response(
            comment.to_dict(), 
            202
        )
        # Return the updated comment as JSON response with HTTP status code 202 (Accepted)


    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        # Retrieve the comment with the specified ID from the database

        db.session.delete(comment)
        db.session.commit()
        # Delete the comment from the database and commit the changes

        return make_response({}, 204)
        # Return an empty response with HTTP status code 204 (No Content)

api.add_resource(CommentsById, "/comments/<int:id>")
# Add the CommentsById resource to the API with the specified URL endpoint

class UsersById(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        # Retrieve the user with the specified ID from the database

        return make_response(
            user.to_dict(),
            200
        )
        # Return the user as JSON response with HTTP status code 200 (OK)

api.add_resource(UsersById, "/users/<int:id>")
# Add the UsersById resource to the API with the specified URL endpoint





if __name__ == '__main__':
    app.run(port=5555, debug=True)

