# from faker import Faker


from app import app
from models import db, Boulder, User

# fake = Faker()

with app.app_context():   
    Boulder.query.delete()
    User.query.delete()




    boulders = []
    names = ["Kahuna Roof", "Face Wipe", "Skunk Rub", "Penny Pinch", "French Arete", "Desert Eagle", "Moulin Rouge", "The Game", "Kelly Roof"]
    grades = ["V6", "V8", "V4", "V3", "V7", "V5", "V10", "V15", "V6"]
    ratings = [3, 3, 2, 3, 2, 2, 1, 3]
    descriptions = ["Ouchie", "OoOhhh", "not good", "Spraypainted", "Contrived", "Crumbly", "Bad fall zone", "Too hard", "Hold broke?"]
    images = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    states = ["Colorado", "Colorado", "Colorado", "Colorado", "Colorado" "Colorado", "Colorado", "Colorado", "Arizona"]
    regions = ["Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Central Colorado", "Central Colorado", "Flagstaff"]
    areas = ["Carter Lake", "Carter Lake", "Carter Lake", "Horsetooth Resovoir", "Poudre Canyon", "Lory State Park", "Clear Creek Canyon", "Eldorado Canyon", "Kelly Canyon"]
    for i in range(8):
        boulder = Boulder(
            name = names[i],
            grade = grades[i],
            rating = ratings[i],
            description = descriptions[i],
            image = images[i],
            state = states[i],
            region = regions[i],
            area = areas[i],
        )
        boulders.append(boulder)
        # boulder.location = locations[i]

        
    db.session.add_all(boulders)
    db.session.commit()








