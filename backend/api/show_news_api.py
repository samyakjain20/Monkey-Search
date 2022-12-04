import json
from flask_cors import cross_origin
from flask import request, jsonify
from api import app
from service.show_news_service import show_news_service


@app.route("/api/showNews", methods=['POST'])
@cross_origin()
def show_news_api():
    res = show_news_service()
    return res
