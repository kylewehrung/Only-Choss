# from faker import Faker

from app import app
from models import db, Location, Boulder, Comment, User

# fake = Faker()

with app.app_context():   
    Location.query.delete()
    Boulder.query.delete()
    User.query.delete()


    locations = []

    loc1 = Location(state="Colorado", region="Northern Colorado", area="Carter Lake")
    locations.append(loc1)

    loc2 = Location(state="Colorado", region="Northern Colorado", area="Rotary Park")
    locations.append(loc2)

    loc3 = Location(state="Colorado", region="Northern Colorado", area="Poudre Canyon")
    locations.append(loc3)

    loc4 = Location(state="Colorado", region="Northern Colorado", area="Arthur's Rock")
    locations.append(loc4)


    db.session.add_all(locations)
    db.session.commit()















