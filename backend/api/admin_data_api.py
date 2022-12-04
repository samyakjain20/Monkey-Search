import json
from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.admin_data_service import admin_data_service


@app.route("/api/admin", methods=['GET'])
@cross_origin()
def admin_data_api():
    res = admin_data_service()
    return res
