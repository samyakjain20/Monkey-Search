import pymongo


def user_fav_dao(user_id):
    # in_res = dict()
    # in_res["UserId"] = user_id
    # in_res["MovieName"] = res["title"]
    # in_res["Language"] = res["OriginalLanguage"]
    # in_res["Genre"] = res["Genre"]

    myclient = pymongo.MongoClient("mongodb+srv://temp:temp@cluster0.fqaslcz.mongodb.net/mernapp?retryWrites=true&w"
                                   "=majority")
    db = myclient.mernapp
    collection = db.SearchClick
    # select genre,count(*) from searchClick where userid=userid groupBy genre orderby count(*) limit 1
    return collection.aggregate([
        # {"$match": {"UserId":user_id}},
        {"$match": {"UserId": user_id}},
        {"$group": {"_id": "$Genre", "count": {"$count": { } }}},
        {"$sort":{"count":-1}},
        {"$limit":1}])
