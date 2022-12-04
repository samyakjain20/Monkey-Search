import traceback

from bs4 import BeautifulSoup
import requests
import pandas as pd
import urllib.request
import re
from config import conf_obj


def coming_soon_service(filter_data):
    try:
        region = filter_data["region"]
        type_o = filter_data["type"]
        url = f"https://www.imdb.com/calendar/?ref_=rlm&region={region}&type={type_o}"
        headers = {
            'User-Agent': conf_obj['headers']['User-Agent']
        }
        print(",,,,,,,,,,,")
        print(conf_obj['headers']['User-Agent'])
        print(',,,,,,,,,,,,,')
        page = requests.get(url, headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')
        # print(soup)
        articles = soup.find('section', class_='ipc-page-section ipc-page-section--base').find_all('article',
                                                                                                   class_="sc-f56042d2-1 kgXUZB")
        # print("////////////////")
        # print(articles)
        # print("////////////////")
        res = {}
        movies_list = []
        i = 0
        for u in articles:
            date_html = u.find('div', class_="ipc-title ipc-title--title ipc-title--base ipc-title--on-textPrimary")
            date = date_html.find('hgroup').find('h3', class_="ipc-title__text").text
            # print("###############")
            # print(u)
            # print("################")
            movie_list = u.find('ul', class_="ipc-metadata-list ipc-metadata-list--dividers-after sc-f56042d2-2 hgbLIC "
                                             "ipc-metadata-list--base").find_all('li',
                                                                                 class_="ipc-metadata-list-summary-item "
                                                                                        "ipc-metadata-list-summary-item"
                                                                                        "--click sc-b4bc18a3-0 ldrlyp")
            # print("$$$$$$$$$$$$$$$$")
            # print(movie_list)
            # print("$$$$$$$$$$$$$$$$$$$$")

            for movie in movie_list:
                temp = {}
                movie_name = movie.find('div', class_="ipc-metadata-list-summary-item__tc").find('a',
                                                                                                 class_="ipc-metadata-list-summary-item__t").text
                if movie.find('img', class_="ipc-image") is None:
                    link = "NA"
                else:
                    link = movie.find('img', class_="ipc-image").get('src')
                temp["mname"] = movie_name
                temp["imagelink"] = link
                temp["date"] = date

                if i < 5:
                    search_keyword = str(movie_name).replace(" ", "") + "Trailer"
                    search_song_url = urllib.request.urlopen(
                        "https://www.youtube.com/results?search_query=" + search_keyword)
                    video_ids = re.findall(r"watch\?v=(\S{11})", search_song_url.read().decode())
                    url = str("https://www.youtube.com/watch?v=" + video_ids[0])


                    temp["trailer_link"] = url
                else:
                    temp["trailer_link"] = "NA"

                i = i + 1
                movies_list.append(temp)

            res["movies"] = movies_list
            if len(res['movies']) > 48:
                break

    except Exception as err:
        print(err)
    res['movies'] = res['movies'][0:48]
    return res
