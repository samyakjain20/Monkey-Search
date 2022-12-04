from bs4 import BeautifulSoup
import requests
import json
from dao.search_click_dao import search_click_dao

default_poster = "/assets/pizza-pie/images/poster_default.c8c896e70c3.gif"


def search_click_service(url, user_id):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    scrap_data_movie = soup.find('div', id='mainColumn')
    list = dict()
    # if scrap_data_movie:
    # print(scrap_data_movie)
    image = scrap_data_movie.find('div', class_='thumbnail-scoreboard-wrap').find('div',
                                                                                  class_='movie-thumbnail-wrap').div.img
    print(image)
    image = image.get('src')  # poster link
    if ".gif" in image:
        image = 'NA'
    list['poster'] = image
    header = scrap_data_movie.find('score-board', class_='scoreboard')
    title = header.find('h1', class_="scoreboard__title").text  # title of movie
    info = header.find('p', class_="scoreboard__info").text.split(',')
    length = len(info)
    year = ""
    zoner = ""
    time = ""
    if length > 0:
        year = info[0]
    if length > 1:
        zoner = info[1]
    if length > 2:
        time = info[2]
    list['title'] = title
    list['year'] = year
    list['zoner'] = zoner
    list['time'] = time

    movie_info = scrap_data_movie.find('div', id='movieSynopsis').text.strip()
    list['info'] = movie_info
    meta_data = scrap_data_movie.find('ul', class_='info').find_all('li')

    for r in meta_data:
        key = r.find('div', class_='meta-label').text.strip()
        value = r.find('div', class_='meta-value').text.strip().replace("\n", '').replace(" ", '')
        list[key.replace(":", "").replace(" ", "")] = value

    search_click_dao(json.loads(json.dumps(list)), user_id)

    return json.loads(json.dumps(list))
