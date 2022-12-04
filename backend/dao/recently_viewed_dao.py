import datetime
import pymongo


def recently_viewed_dao(user_id):
    myclient = pymongo.MongoClient("mongodb+srv://temp:temp@cluster0.fqaslcz.mongodb.net/mernapp?retryWrites=true&w"
                                   "=majority")

    db = myclient.mernapp
    collection = db.SearchClick
    docs = collection.find({"UserId": user_id}, {"_id": False}).sort("QueryTimestamp", -1)
    movies = []
    res = {}
    for doc in docs:
        movies.append(doc)

    res["movies"] = movies
    return res
