from random import randint, choice as rc


from app import app
from models import db, Boulder, User, Comment


with app.app_context():   
    db.create_all()
    Comment.query.delete()
    Boulder.query.delete()
    User.query.delete()

    users = []
    usernames = []
    names = ['kyle-cant-climb','Alex Puccio','CeCe','Matt Fultz','Aiden Roberts','ham','Melissa', '2009', 'Mac Miller', 'turkey', "JID", "J-Cole", "Austin Reeves", "clime timb"]

    for i in range(14):
        username = names[i]
        while username in usernames:
            username = names[i]
        usernames.append(username)

        user = User(
            username=username,   
        )

        user.password_hash = user.username + 'password'

        users.append(user)
    db.session.add_all(users)








    boulders = []
    names = ["Kahuna Roof",
              "Lemons to Lemonade",
                "Skunk Rub",
                  "Penny Pinch",
                    "Moderate on Left Face",
                      "Desert Eagle",
                        "Moulin Rouge",
                          "The Game",
                            "Big Ed's Flying Saucer",
                              "Turban",
                                "Powell Pinch",
                                  "Clairvoyant",
                                    "Power and Payne",
                                      "Awestruck"
                                
                                ]
    grades = ["V6",
               "V3",
                 "V4",
                   "V3",
                     "V3",
                       "V5",
                         "V10",
                           "V15",
                             "V4",
                               "V1",
                                 "V2",
                                  "V7",
                                    "V3", 
                                      "V6"
                                 
                                 ]
    ratings = [2, 3, 2, 3, 2, 3, 1, 2, 3, 2, 2, 2, 3, 3]
    descriptions = [
        "A Colorado choss classic. Nearly every climber in Colorado knows the name of this painful and ever-tipping-over boulder. Start on obvious crimps that have been broken multiple times over the years, try to do the first move without dabbing and continue your way up to an easy topout.",
          "The best boulders are the ones that explode on their own, this is one of the best.",
            "Start on low large edge left of the roof and traverse right on the lip. Pumpy and painful, watch out for loose dogs.",
              "Crimp and scream you way to the top. Obvious start, obvious line, bring tape for when you split a tip.",
                "Stand start in pain, continue through pain, finish in pain",
                  "I hear this boulder is the reason Only Choss was made, words cannot describe the chossiness",
                    "Start on ouchie holds, move right through a slippery and contrived sequence, then finish on an easy topout. Oh yeah and don't fall because there's a high chance you'll roll down the hill.",
                      "This is on here purely because it's too hard for me.",
                        "From a left hand pinch and right hand small pocket, pull the short roof past a single good pocket, often slimy.",
                          "15 feet from the parking lot, non-obvious start, painful holds and awkward movement.",
                             "A great problem if you want to inprove your pain tolerance.",
                               "Strenuous not just that it's hard, but you feel like you'll get injured on 3 out of the 5 main moves. Lovely.",
                                 "Sit start on alright holds, move up and left through holds that are constantly exfoliating.", 
                                    "Start low, go up, don't fall"
                            
                             
                             
                             ]
    images = ["https://mountainproject.com/assets/photos/climb/106568829_smallMed_1494121225.jpg?cache=1655238556",
               "https://mountainproject.com/assets/photos/climb/123361958_smallMed_1667257896_topo.jpg?cache=1667349189",
                 "https://mountainproject.com/assets/photos/climb/106363009_smallMed_1494101819.jpg?cache=1235502042",
                   "https://mountainproject.com/assets/photos/climb/108310434_smallMed_1494275364.jpg?cache=1377639186",
                     "https://mountainproject.com/assets/photos/climb/108248601_smallMed_1494271848.jpg?cache=1543962919",
                       "https://mountainproject.com/assets/photos/climb/114236545_smallMed_1523250329.jpg?cache=1582223671",
                         "https://mountainproject.com/assets/photos/climb/119690128_smallMed_1601955148.jpg?cache=1655455217",
                           "https://mountainproject.com/assets/photos/climb/106973432_smallMed_1494155480.jpg?cache=1668214237",
                             "https://mountainproject.com/assets/photos/climb/119900438_smallMed_1605067066.jpg?cache=1655812160",
                               "https://mountainproject.com/assets/photos/climb/106118450_medium_1558650515.jpg?cache=1608922012",
                                 "https://mountainproject.com/assets/photos/climb/110053051_smallMed_1494368300.jpg?cache=1608922013",
                                   "https://mountainproject.com/assets/photos/climb/108560838_smallMed_1494288833.jpg?cache=1565462384",
                                     "https://mountainproject.com/assets/photos/climb/122832750_smallMed_1659454727.jpg?cache=1659464376",
                                       "https://mountainproject.com/assets/photos/climb/123443012_smallMed_1668569747_topo.jpg?cache=1669150607"
                                 
                                 ]
    states = ["Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Arizona", "California", "California", "Colorado", "Colorado", "Colorado"]
    regions = ["Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Central Colorado", "Central Colorado", "Flagstaff", "Joshua Tree NP", "Joshua Tree NP", "Central Colorado", "Central Colorado", "Central Colorado"]
    areas = ["Carter Lake", "Carter Lake", "Carter Lake", "Horsetooth Resovoir", "Poudre Canyon", "Lory State Park", "Clear Creek Canyon", "Eldorado Canyon", "Priest Draw Area", "Cap Rock Boulders", "Cap Rock Boulders", "Eldorado Canyon", "Clear Creek Canyon", "Clear Creek Canyon"]
    for i in range(14):
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




    comment_list = []
    comments = [
        "icky",
          "lemons",
            "My friend fell from a hold breaking, landed on his hand, broken hand",
              "went here on a date and we both left hurt and sad, 3/3",
                "good for those who like to suffer",
                  "I would post a beta video but it'll climb differently by the time you get to it.",
                    "Broke my wrist rolling down the hill",
                      "Too sane to send",
                        "I wet-fired off and hit myself in the face",
                          "I split my fingernail vertically on this climb, I didn't know that was possible.",
                            "Was fun after I sent, pretty area though",
                            "Bad time", 
                              "would have rather spent my time in the gym..",
                                "I ruptured a tendy here, safe to say I'm not going back"

    ]
    for i in range(len(comments)):
        comment = Comment(
            comment = comments[i],
            user = rc(users),
            # boulder = rc(boulders),
        )


        boulder_name = names[i]
        boulder = next((bouldy for bouldy in boulders if bouldy.name == boulder_name), None)

        if boulder:
            comment.boulder = boulder


        comment_list.append(comment)
    db.session.add_all(comment_list)
        
    db.session.add_all(boulders)
    db.session.commit()








