from dao.admin_data_dao import admin_data_dao


def admin_data_service():
    res = admin_data_dao()
    return res
