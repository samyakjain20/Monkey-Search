import json

from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.user_fav_service import user_fav_service


@app.route("/api/userFav", methods=['POST'])
@cross_origin()
def user_fav_api():
    user_id = request.get_json()
    # print(user_id,"api")
    res = user_fav_service(user_id["user_id"])
    return json.loads(json.dumps(res))
