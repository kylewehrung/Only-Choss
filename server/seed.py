# from faker import Faker


from app import app
from models import db, Boulder, User

# fake = Faker()

with app.app_context():   
    Boulder.query.delete()
    User.query.delete()




    boulders = []
    names = ["Kahuna Roof", "Lemons to Lemonade", "Skunk Rub", "Penny Pinch", "French Arete", "Desert Eagle", "Moulin Rouge", "The Game", "Kelly Roof"]
    grades = ["V6", "V3", "V4", "V3", "V7", "V5", "V10", "V15", "V6"]
    ratings = [2, 3, 2, 3, 2, 2, 1, 2, 3]
    descriptions = ["A Colorado choss classic. Nearly every climber in Colorado knows the name of this painful and ever-tipping-over boulder. Start on obvious crimps that have been broken multiple times over the years, try to do the first move without dabbing and continue your way up to an easy topout.", "The best boulders are the ones that explode on their own, this is one of the best.", "not good", "Spraypainted", "Contrived", "Crumbly", "Bad fall zone", "Too hard", "Hold broke?"]
    images = ["https://mountainproject.com/assets/photos/climb/106568829_smallMed_1494121225.jpg?cache=1655238556", "https://mountainproject.com/assets/photos/climb/123361958_smallMed_1667257896_topo.jpg?cache=1667349189", "three", "four", "five", "six", "seven", "eight", "nine"]
    states = ["Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Arizona"]
    regions = ["Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Central Colorado", "Central Colorado", "Flagstaff"]
    areas = ["Carter Lake", "Carter Lake", "Carter Lake", "Horsetooth Resovoir", "Poudre Canyon", "Lory State Park", "Clear Creek Canyon", "Eldorado Canyon", "Kelly Canyon"]
    for i in range(9):
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








