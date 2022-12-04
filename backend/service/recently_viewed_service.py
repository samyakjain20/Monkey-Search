import json

from dao.recently_viewed_dao import recently_viewed_dao


def recently_viewed_service(user_id):
    res = recently_viewed_dao(user_id)
    return res
