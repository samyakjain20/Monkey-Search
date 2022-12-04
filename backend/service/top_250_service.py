from bs4 import BeautifulSoup
import requests
import pandas as pd
import re
import json

base_uri = "https://www.imdb.com/chart/top/"
link_base="https://www.imdb.com"


def top_250_service(sort_by, order):
    try:
        url = base_uri + "?sort=" + sort_by + "," + order + "&mode=simple&page=1"
        print(url)
        page = requests.get(url)
        soup = BeautifulSoup(page.text, 'html.parser')
        scrap_table = soup.find('tbody', class_="lister-list").find_all('tr')
        links = []
        movies = []
        rates = []
        years = []
        for s in scrap_table:
            # links.append(s.find('td', class_='titleColumn').find_all('a',
            #                                                          attrs={'href': re.compile("^/title/")}))

            links.append(s.find('td', class_='posterColumn').find_all('a',
                                                                     attrs={'href': re.compile("^/title/")}))
            movies.append(s.find('td', class_='titleColumn').a.text)
            rates.append(s.find('td', class_='ratingColumn').text.replace('\n', ""))
            years.append(s.find('span', class_='secondaryInfo').text.replace('(', "").replace(')', ''))
        # print(links)
        data = pd.DataFrame()
        data['movies'] = movies
        data['rating'] = rates
        data['year'] = years
        link_title = []
        scrap_movies = soup.find_all('td', class_='posterColumn')
        img_src = []
        # print("..........................................")
        # print(scrap_movies)
        # print("******************************************")
        for link in scrap_movies:
            # print(link)
            p = link.find('a', attrs={'href': re.compile("^/title/")})
            i =link.find('img')
            link_title.append(link_base+p.get('href'))
            img_src.append(i.get('src'))
            # print(i)

        data['alink'] = link_title
        data['imgsrc'] = img_src
        return json.loads(data.to_json(orient="records"))
    except Exception as e:
        print(e)

# https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg
# https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg