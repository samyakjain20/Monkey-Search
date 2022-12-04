import json

from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.recently_viewed_service import recently_viewed_service


@app.route("/api/recentlyViewed", methods=['POST'])
@cross_origin()
def recently_viewed_api():
    payld = request.get_json()
    res = recently_viewed_service(payld["user_id"])
    return json.loads(json.dumps(res))
