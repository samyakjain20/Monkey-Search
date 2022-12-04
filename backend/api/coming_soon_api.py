from flask import request
from flask_cors import cross_origin
from api import app
from service.coming_soon_service import coming_soon_service


@app.route("/api/comingSoon", methods=['POST'])
@cross_origin()
def coming_soon_api():
    filter_data = request.get_json()
    try:
        res = coming_soon_service(filter_data)
    except Exception as e:
        print("Exception - " + str(e))
        res = {}
    return res
