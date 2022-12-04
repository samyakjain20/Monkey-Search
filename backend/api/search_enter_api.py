import json
from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.search_enter_service import search_enter_service


@app.route("/api/search/display", methods=['POST'])
@cross_origin()
def search_enter_api():
    keyw = request.args.get("keyword")
    filter_data = request.get_json()
    res = search_enter_service(keyw, filter_data)
    return res
