from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy


from config import db, bcrypt, validates





class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    comments = db.relationship("Comment", backref="user")
    users = association_proxy("comments", "user")

    


    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")


    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    
    def __repr__(self):
        return f"User ID: {self.id}, Username: {self.username}"
    




class Boulder(db.Model, SerializerMixin):
    __tablename__ = "boulders"
    serialize_rules = ("-comments",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    grade = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String)
    image = db.Column(db.String)
    state = db.Column(db.String)
    region = db.Column(db.String)
    area = db.Column(db.String)
   

    comments = db.relationship("Comment", backref="boulder")
    users = association_proxy("comments", "user")
    
    def __repr__(self):
        return f"Boulder Id: {self.id}, Name: {self.name}, Grade: {self.grade}, Rating: {self.rating}, Description: {self.description}, Image: {self.image}, State: {self.state}, Region: {self.region}, Area: {self.area} Comments: {self.comments}"
    





class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"
    serialize_rules = ('-user','-boulder',)


    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    boulder_id = db.Column(db.Integer, db.ForeignKey("boulders.id"))


    def __repr__(self):
        return f"Comment Id: {self.id}, Comment: {self.comment}, user id: {self.user_id}, boulder id: {self.boulder_id}"
    







