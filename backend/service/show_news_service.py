from bs4 import BeautifulSoup
import requests
import pandas as pd
import re
import json

url = "https://editorial.rottentomatoes.com/news"
info=dict()

def show_news_service():
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    scrap_news_rows = soup.find('div', id="wpv-view-layout-9675").find_all('div' ,class_="row")
    # print(scrap_news_rows)
    list_news = []
    for row in scrap_news_rows:
        row_items=row.find_all('div',class_="newsItem")
        # print(row_items)
        for r in row_items:
            col_item=r.find_all('a',class_='articleLink')
            for c_item in col_item:
                each_dict = dict()
                news_link=c_item.get('href')
                editorial_pic=c_item.find('div',class_="editorialColumnPic")
                img=editorial_pic.find('img').get('src')
                banner=c_item.find('div',class_="bannerCaption")
                banner_info=banner.find('p',class_="title").getText()
                banner_date=banner.find('p',class_="publication-date").getText()
                each_dict['news_link']=news_link
                each_dict['img']=img
                each_dict['banner_info']=banner_info
                each_dict['banner_date']=banner_date
                list_news.append(each_dict)
    info['news']=list_news
    print(len(list_news))
    return info
