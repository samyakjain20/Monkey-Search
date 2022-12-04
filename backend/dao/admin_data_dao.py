import pymongo


def admin_data_dao():
    myclient = pymongo.MongoClient("mongodb+srv://temp:temp@cluster0.fqaslcz.mongodb.net/mernapp?retryWrites=true&w"
                                   "=majority")

    db = myclient.mernapp
    collection = db.SearchClick
    docs = collection.find()

    # timewise data
    time_data = {}
    # genre data
    genre_data = {}
    # language data
    lang_data = {}
    for doc in docs:
        # -------  Date ---------------
        query_date = doc["QueryTimestamp"].split(" ")[0]
        print(query_date)
        if query_date in time_data.keys():
            time_data[query_date] += 1
        else:
            time_data[query_date] = 1

        # ------- Genre ----------------
        genre_list = doc["Genre"].split(",")
        for genre in genre_list:
            if genre in genre_data.keys():
                genre_data[genre] += 1
            else:
                genre_data[genre] = 1

        # -------  Language ---------------
        lang = doc["Language"]
        if lang in lang_data.keys():
            lang_data[lang] += 1
        else:
            lang_data[lang] = 1

    final_time_data = []
    for k, v in time_data.items():
        final_time_data.append({"y": v, "label": k})

    final_lang_data = []
    for k, v in lang_data.items():
        final_lang_data.append({"y": v, "label": k})

    final_genre_data = []
    for k, v in genre_data.items():
        final_genre_data.append({"y": v, "label": k})

    res = {"timewise": final_time_data, "genrewise": final_genre_data, "languagewise": final_lang_data}

    return res
