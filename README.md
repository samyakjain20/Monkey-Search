### Monkey Search - Retrieval (Web Scraping)
- - -
#### Introduction:
#### Monkey search engine searches and suggests the movies / tv series / franchises / celebrities for the user entered query / keyword. It also recommends movies for the user based on their previous searches. User can view coming soon movies with their trailer, top 250 movies for different metrics and trending news. Admin can also view a dashboard which shows different charts on the data captured


## Tech Stack Used
- - - 
1. ReactJs - Building frontend.
2. NodeJs - Process api before hitting the backend
3. Python Flask - API development.
4. MongoDB - Database

## Steps to Run
- - -
1. Clone the repository 

2. Install the node modules. Open three terminals.
### Terminal1
- - -
```
cd frontend
npm install
```
### Terminal2
- - -
```
cd middleware
npm install
```

3. Run all the servers - reactjs, nodejs flask.
### Terminal1
- - -
```
cd frontend
npm run start
```
### Terminal2
- - -
```
cd middleware
npm run start
```
### Terminal3
- - -
```
cd backend
python3 main.py
```

## APIs
- - -
1. Admin data API : To populate the dashboard for Admin displaying no of movies per language, Genre, Day wise hits
```
http://localhost:7200/api/admin
```
2.  Coming Soon: API to Display Coming soon movies
```
http://localhost:7200/api/comingSoon
```
3. Recently Viewed: API to display the movies recently viewed by user
```
http://localhost:7200/api/recentlyViewed
```
4. Search : To display list of info on query data
```
http://localhost:7200/api/search?keyword=pirates
```
5. Search on Enter : To display data in cards when enter click on keyword searched
```
 http://localhost:7200/api/search/display?keyword=pirates
```
6. Search Click : To display information(Description,Director,cast etc....) of specific movie clicked by user
```
http://localhost:7200//api/search_click
```
7. News : To display current trending news related to tv, movies, shows etc..
```
http://localhost:7200/api/showNews
```
8. Top 250 : To display top 250 movies , having different filters and sorting options 
```
http://localhost:7200/api/top/250
```
9. User Fav : Displaying movies as per the user fav choice on the basis of clicks and serach
```
http://localhost:7200/api/userFav
```