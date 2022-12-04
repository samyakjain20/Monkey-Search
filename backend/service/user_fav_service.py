from bs4 import BeautifulSoup
import requests
import pandas as pd
import re
import json
from dao.user_fav_dao import user_fav_dao
base_uri="https://www.imdb.com/search/title/?genres="
rest_uri="&sort=user_rating,desc&title_type=feature&num_votes=25000,"
link_base="https://www.imdb.com"


def user_fav_service(user_id):
    # fetch fav genre of userid from dataset=genre
    genre=user_fav_dao(user_id)
    # print(list(genre))
    genre=list(genre)[0]['_id']

    # print(list(genre),"hello")
    # print("find query",list(genre))
    # genre="drama"
    # scrap data from https://www.imdb.com/search/title/?genres=drama&sort=user_rating,desc&title_type=feature&num_votes=25000,
    try:
        url=base_uri+genre+rest_uri
        # print(url)
        # url="https://www.imdb.com/search/title/?genres=Action,Drama,History,War&sort=user_rating,desc&title_type=feature&num_votes=25000,"
        # url="https://www.imdb.com/search/title/?genres=Action,Drama,History,War&sort=user_rating,desc&title_type=feature&num_votes=25000,"
        print(url)
        page=requests.get(url)

        # print(page)
        soup=BeautifulSoup(page.text,'html.parser')
        scrap_table=soup.find('div',class_="article").find('div',class_="lister-list").find_all('div',class_="lister-item mode-advanced")
        # print(len(scrap_table))
        # print(scrap_table)
        img_src = []
        movies = []
        links = []
        genres = []
        print(genre,"befor adding")
        c=0;
        for s in scrap_table:
            main=s.find('div', class_='lister-item-image')
            img_src.append(main.find('img').get('loadlate'))
            movies.append(main.find('img').get('alt'))
            # print(main.find('a', attrs={'href': re.compile("^/title/")}).get('href'))
            links.append(link_base+main.find('a', attrs={'href': re.compile("^/title/")}).get('href'))
            genres.append(genre)
            c=c+1
            if c==20:
                break
            # movies.append(s.find('td', class_='titleColumn').a.text)
            # rates.append(s.find('td', class_='ratingColumn').text.replace('\n', ""))
            # years.append(s.find('span', class_='secondaryInfo').text.replace('(', "").replace(')', ''))
        # print(links)
        # print(movies)
        data = pd.DataFrame()
        data['genres']=genres
        data['movies'] = movies
        data['alink'] = links
        data['imgsrc'] = img_src
        # data['rating'] = rates
        # data['year'] = years
        # link_title = []
        # scrap_movies = soup.find_all('td', class_='titleColumn')
        # img_src = []
        # for link in scrap_movies:
        #     p = s.find('a', attrs={'href': re.compile("^/title/")})
        #     i = s.find('img')
        #     link_title.append(p.get('href'))
        #     img_src.append(i.get('src'))
        #
        # data=data.head(20)
        return json.loads(data.to_json(orient="records"))
    except Exception as e:
        print(e)
