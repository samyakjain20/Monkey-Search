import json
from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.multimedia_search_service import multimedia_search_service


@app.route("/api/multimedia/search", methods=['POST'])
@cross_origin()
def multimedia_search_api():
    search_keyword = request.get_json()["keyword"]
    res = multimedia_search_service(search_keyword)
    return res
