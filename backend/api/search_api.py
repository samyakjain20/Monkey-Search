from flask_cors import cross_origin
from flask import request
from api import app
from service.search_service import search_service


@app.route("/api/search", methods=['POST'])
@cross_origin()
def search_api():
    keyw = request.args.get("keyword")
    filter_data = request.get_json()
    try:
        res = search_service(keyw, filter_data)
    except Exception as e:
        print("Exception - " + str(e))
        res = {}
    return res
    