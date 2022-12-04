from flask_cors import cross_origin
from flask import request
from api import app
from service.search_click_service import search_click_service


@app.route("/api/search_click", methods=['POST'])
@cross_origin()
def search_click_api():
    payld = request.get_json()
    res = search_click_service(payld["url"], payld["user_id"])
    return res
