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
    names = ['kyle-cant-climb','Alex Puccio','CeCe','Matt Fultz','Aiden Roberts','ham','Melissa', '2009', 'Mac Miller', 'turkey', "JID", "J-Cole", "Austin Reeves", "clime timb", "oww", "hmmm", "orange julius", "pin", "finger ripper", "punk rock", "south line", "Spice Roof"]

    for i in range(22):
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
                                      "Awestruck",
                                        "You're contrived, Profeta!", 
                                          "#7",
                                           "Orange Julius",
                                             "Pinhead", 
                                               "Finger Ripper",
                                                 "Punk Rock Traverse Low",
                                                   "South Line",
                                                     "Spice Roof"
                                
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
                                      "V6",
                                        "V3",
                                          "V4",
                                            "V7", 
                                              "V0",
                                                "V3",
                                                  "v9+",
                                                    "V4",
                                                      "V6"
                                 
                                 ]
    ratings = [2, 3, 2, 3, 2, 3, 1, 2, 3, 2, 2, 2, 3, 3, 2, 2, 3, 1, 2, 2, 3, 2]
    descriptions = [
        "A Colorado choss classic. Nearly every climber in Colorado knows the name of this painful and ever-tipping-over boulder. Start on obvious crimps that have been broken multiple times over the years, try to do the first move without dabbing and continue your way up to an easy topout.",
          "The best boulders are the ones that explode on their own, this is one of the best.",
            "Start on low large edge left of the roof and traverse right on the lip. Pumpy and painful, watch out for loose dogs.",
              "Crimp and scream you way to the top. Obvious start, obvious line, bring tape for when you split a tip.",
                "Stand start in pain, continue through pain, finish in pain",
                  "I hear this boulder is the reason Only Choss was made, words cannot describe the chossiness.",
                    "Start on ouchie holds, move right through a slippery and contrived sequence, then finish on an easy topout. Oh yeah and don't fall because there's a high chance you'll roll down the hill.",
                      "This is here purely because it's too hard for me.",
                        "From a left hand pinch and right hand small pocket, pull the short roof past a single good pocket, often slimy.",
                          "15 feet from the parking lot, non-obvious start, painful holds and awkward movement.",
                             "A great problem if you want to inprove your pain tolerance.",
                               "Strenuous not just that it's hard, but you feel like you'll get injured on 3 out of the 5 main moves. Lovely.",
                                 "Sit start on alright holds, move up and left through holds that are constantly exfoliating.", 
                                    "Start low, go up, don't fall",
                                      "Alternate variation of the Coffin problem, do what makes the least sense and call it a day.",
                                        "Sit start under roof on obvious holds and climb straight out roof.",
                                          "Start in overhanging huecoish terrain to gain small crimps at the bottom of the dike. Pull a straightforward but powerful, reachy sequence on tweaky edges with little to no feet.",
                                            "Pinhead follows the prominent fingertip crack along the west face. Fingerlocks up crack and mantle to top.",
                                              "Climb on the very small crimps and sidepulls to the right of Ship's Prow Left and to the left of the curving crack",
                                                "Start painfully low and travers below the original climb on bad holds. High dab potential, crumbly.",
                                                  "Start as for Standard Route, but crank to the large slopey holds out left. Figure out some feet that work for you, then lunge for a positive hold at the lip",
                                                    "It's highball that involves a dyno that would be an ankle breaker if a miscalculation was made. Climb out the right side of the main prow feature."
                                            
                            
                             
                             
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
                                       "https://mountainproject.com/assets/photos/climb/123443012_smallMed_1668569747_topo.jpg?cache=1669150607",
                                         "https://mountainproject.com/assets/photos/climb/107779732_smallMed_1494210921.jpg?cache=1347103755",
                                           "https://mountainproject.com/assets/photos/climb/119003583_smallMed_1591587509_topo.jpg?cache=1591623524",
                                             "https://mountainproject.com/assets/photos/climb/106693783_smallMed_1494132747.jpg?cache=1648608460", 
                                               "https://mountainproject.com/assets/photos/climb/111795840_smallMed_1494304734.jpg?cache=1666042586",
                                                 "https://mountainproject.com/assets/photos/climb/105792044_smallMed_1557856323.jpg?cache=1557856324",
                                                   "https://mountainproject.com/assets/photos/climb/106168095_smallMed_1494085011.jpg?cache=1660529672",
                                                     "https://mountainproject.com/assets/photos/climb/120277097_smallMed_1612819760.jpg?cache=1612907573", 
                                                       "https://mountainproject.com/assets/photos/climb/116986773_smallMed_1558151275.jpg?cache=1558849260"
                                 
                                 ]
    states = ["Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Colorado", "Arizona", "California", "California", "Colorado", "Colorado", "Colorado", "Arizona", "Arizona", "California", "California", "Colorado", "Colorado", "Colorado", "Colorado"]
    regions = ["Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Central Colorado", "Central Colorado", "Flagstaff", "Joshua Tree NP", "Joshua Tree NP", "Central Colorado", "Central Colorado", "Central Colorado", "Flagstaff", "Flagstaff", "Joshua Tree NP", "Joshua Tree NP", "Northern Colorado", "Northern Colorado", "Northern Colorado", "Northern Colorado"]
    areas = ["Carter Lake", "Carter Lake", "Carter Lake", "Horsetooth Reservoir", "Poudre Canyon", "Lory State Park", "Clear Creek Canyon", "Eldorado Canyon", "Priest Draw Area", "Cap Rock Boulders", "Cap Rock Boulders", "Eldorado Canyon", "Clear Creek Canyon", "Clear Creek Canyon", "Priest Draw Area", "Priest Draw Area", "Hidden Valley", "Hidden Valley", "Horsetooth Reservoir", "Horsetooth Reservoir", "Carter Lake", "Carter Lake"]
    for i in range(22):
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
        "we gonna awknowledge how much this thing is tipping over orrrr",
          "more like lemonade to lemons amiright",
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
                                "I ruptured a tendy here, safe to say I'm not going back", 
                                  "Never been but I'll still roast it, 3/3 choss for me.",
                                    "crumbly and sad looking",
                                      "Morpho, slippery, painful, good luck if you're short", 
                                        "I had a good time??",
                                          "tagged with graffiti, friend dislocated knee on this, 3/3 bad time",
                                            "Sorry, but I haven't dropped any acid since the '70s and for the record Malcomn Daly used to go up and back 3 times as a warm up! Of course, after the finger-lock broke off 6-7 years ago about a third of the way up, the route is a LOT harder then it used to be; the last time I was up there in May 2001 I could only go up and back. I can remember my name just fine, it's the age thing I have to stop and figure out; let's see 2002 -1955. I'm sorry, I'm just jealous of all you new kid's out there sending your v15+, I can't climb over V9 any more. Now what was really hard was doing all those laps on Tendonitis!",
                                              "Watch out for bat poop in one of the starting holds...",
                                                "I did it sure, but I feel worse now."

    ]
    for i in range(len(comments)):
        comment = Comment(
            comment = comments[i],
            user = rc(users),
        )


        boulder_name = names[i]
        boulder = next((bouldy for bouldy in boulders if bouldy.name == boulder_name), None)

        if boulder:
            comment.boulder = boulder


        comment_list.append(comment)
    db.session.add_all(comment_list)
        
    db.session.add_all(boulders)
    db.session.commit()








