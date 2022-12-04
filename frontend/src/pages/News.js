import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import gsap from "gsap";

// components
const Home = () => {
  const {user} = useAuthContext()
  
  const [newss, setNewss] = useState([])

  useEffect(() => {
    // automated call on reload/some change
    const fetchNews = async () => {

      const response = await fetch('/api/query/showNews', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })
      const json = await response.json()
      
      if (response.ok ) {
        setNewss(json);
        console.log("news data received", json)
      }else
        console.log(json)
    }

    if (user) {
      fetchNews();
    }
  }, [ ])

  return (
    <div className="row">

      <div className=""> 
        <h2 className="text-white px-5 pt-4">ShowBiz News</h2>
      </div>
        
      {/* <div className="list col-8 ">
        {movies && movies.map((movie, ind) => (
          <a key={movie.rk} className="list-group-item list-group-item-action greyBg text-white rounded px-3 py-1 my-1" type="button" 
            // onClick={() => printResult(suggestion.mlink)}
            aria-current="true">
            <div className="row  justify-content col-9">
              <img className="col-lg-1 col-md-2 col-sm-2 col-xs-2 px-0 py-1" src={movie.imgsrc} alt={movie.movies}/>
              <div className="col-lg-1 col-md-9 col-sm-8 col-xs-8 p-lg-3 p-sm-3 p-sm-3 p-xs-2 float-end">
                <h6 className="movie-year">{ind + 1}</h6>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 p-lg-3 p-sm-3 p-sm-3 p-xs-2">
                <h5 className="movie-title ">{movie.movies}</h5>
              </div>
              <div className="col-lg-1 col-md-9 col-sm-8 col-xs-8 p-lg-3 p-sm-3 p-sm-3 p-xs-2 float-end ">
                <h6 className="movie-year">{movie.rating}</h6>
              </div>
            </div>
        </a>
        ))}
      </div> */}

        <div className=" container-fluid overflow-auto mb-3">
          <div className="row">
            { newss && newss.map((news, ind) => (
                <div key={ind+1} className="bg-transparent mb-3 smallCard">
                  <div className="card border-0">
                    <img src={news.img} className="card-img" alt={news.banner_info} />
                    <div className="p-1">
                      <h6 className=" text-center m-0">{news.banner_date}</h6>
                      <p className=" text-center m-0">{news.banner_info}</p>

                      <a target="_blank" type="button" className="d-flex justify-content-center btn btn-dark btn-sm" href={news.news_link}> Read More</a>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>



    </div>
  )
}

export default Home