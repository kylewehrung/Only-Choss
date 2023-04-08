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

    loc5 = Location(state="Arizona", region="Souther Arizona", area="Air Wolf")
    locations.append(loc5)

    loc6 = Location(state="Colorado", region="Central Colorado", area="Clear Creek")
    locations.append(loc6)

    db.session.add_all(locations)
    db.session.commit()



    boulders = []

    bould1 = Boulder(name="Kahuna Roof", grade="V6", rating=3, description="Description: A Colorado choss classic. Nearly every climber in Colorado knows the name of this painful and ever-tipping-over boulder. Start on obvious crimps that have been broken multiple times over the years, try to do the first move without dabbing and continue your way up to an easy topout.", image="https://mountainproject.com/assets/photos/climb/121200125_medium_1629812886.jpg?cache=1629856677")
    boulders.append(bould1)

    db.session.add_all(boulders)
    db.session.commit()







