import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import gsap from "gsap";

// components
const Home = () => {
  const {user} = useAuthContext()
  
  const [sort, setSort] = useState("rk");
  const [order, setOrder] = useState("asc");
  const [movies, setMovies] = useState([])

  useEffect(() => {
    console.log('use effect top250', sort, order)
    // automated call on reload/some change
    const fetchTop250 = async () => {
      const top250Filter = {
        sort, order
      }

      const response = await fetch('/api/query/top250', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify( top250Filter )
      })
      const json = await response.json()
      
      if (response.ok ) {
        setMovies(json);
        // setQuery("")
      }else
        console.log(json)
    }

    if (user) {
      fetchTop250()
    }
  }, [ sort, user, order ])

  return (
    <div className="row">

      <div className=""> 
        <h2 className="text-white px-5 pt-4"><strong>Top 250 Movies</strong></h2>
      </div>
        
      <div className="list col-8 ">
        {movies && movies.map((movie, ind) => (
          <a key={movie.rk} className="list-group-item list-group-item-action whiteBg  rounded px-3 py-1 my-1" type="button" 
            // onClick={() => printResult(suggestion.mlink)}
            aria-current="true">
            <div className="row  justify-content col-9">
              <img className="col-lg-1 col-md-2 col-sm-2 col-xs-2 px-0 py-1" src={movie.imgsrc} alt={movie.movies}/>
              <div className="col-lg-1 col-md-9 col-sm-8 col-xs-8 p-lg-3 p-sm-3 p-sm-3 p-xs-2 float-end">
                <h4 className="movie-year">{ind + 1}</h4>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 p-lg-3 p-sm-3 p-sm-3 p-xs-2">
                <h4 className="movie-title ">{movie.movies}</h4>
              </div>
              <div className="col-lg-1 col-md-9 col-sm-8 col-xs-8 p-lg-3 p-sm-3 p-sm-3 p-xs-2 float-end ">
                <h4 className="movie-year">{movie.rating}</h4>
              </div>
            </div>
        </a>
        ))}
      </div>

      <div className='filter-order col-3'>
        <div className="p-1 text-white fs-3"><strong>Sort By</strong></div>
        <div className="select">
          <select
            onChange={(e) => {  setSort(e.target.value);}}
            // className="custom-select"
            className="form-select rounded-1"
            aria-label="sort Countries By Region">
            <option value="rk">Ranking</option>
            <option value="ir">IMDB Rating</option>
            <option value="us">Release Date</option>
            <option value="nv">No of Ratings</option>
            <option value="desc">Z-A</option>
          </select>
          <span ></span>
        </div>

        <div className="p-1 text-white fs-3"><strong>Order By</strong></div>
        <div className="select">
          <select
            onChange={(e) => {  setOrder(e.target.value);}}
            // className="custom-select"
            className="form-select rounded-1"
            aria-label="sort Countries By Region">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <span ></span>
        </div>


      </div>


    </div>
  )
}

export default Home