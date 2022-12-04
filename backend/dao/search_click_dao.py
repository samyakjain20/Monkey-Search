import datetime
import pymongo


def search_click_dao(res, user_id):
    in_res = dict()
    in_res["UserId"] = user_id
    in_res["MovieName"] = res["title"]
    in_res["Language"] = res["OriginalLanguage"]
    in_res["Genre"] = res["Genre"]
    in_res["QueryTimestamp"] = str(datetime.datetime.now())
    in_res["ImageLink"] = res["poster"]

    myclient = pymongo.MongoClient("mongodb+srv://temp:temp@cluster0.fqaslcz.mongodb.net/mernapp?retryWrites=true&w"
                                   "=majority")
    db = myclient.mernapp
    collection = db.SearchClick
    collection.insert_one(in_res)
