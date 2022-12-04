from flask import Flask

app = Flask(__name__)

from api import search_api
from api import search_click_api
from api import search_enter_api
from api import top_250_api
from api import coming_soon_api
from api import recently_viewed_api
from api import user_fav_api
from api import show_news_api
from api import admin_data_api
from api import multimedia_search_api
