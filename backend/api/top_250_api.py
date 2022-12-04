import json
from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.top_250_service import top_250_service


@app.route("/api/top/250", methods=['GET'])
@cross_origin()
def top_250_api():
    sort_by = request.get_json()["sort"]
    order = request.get_json()["order"]
    res = top_250_service(sort_by, order)
    return res
