import pymongo


def search_dao(js):
    pass


def insert_res(js):
    print("Inside res")
    myclient = pymongo.MongoClient("mongodb+srv://mongo:mongo@atlascluster.kc72utq.mongodb.net/?retryWrites=true&w"
                                   "=majority")
    db = myclient.SSDLab
    collection = db.SearchResults
    collection.insert_many(js)
