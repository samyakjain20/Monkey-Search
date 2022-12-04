import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

// components
const Home = () => {
  const emptyList = []
  const {user} = useAuthContext()
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [suggestions, setSuggestions] = useState([])
  const [result, setResult] = useState({})
  const [enterResults, setEnterResults] = useState([])
  const [latests, setLatests] = useState([])
  const [region, setRegion] = useState('IN')
  const [commingSoonType, setCommingSoonType] = useState('MOVIE')
  const [recents, setRecents] = useState([])
  const [favs, setFavs] = useState([])
  const countries = [{ 'code' : 'IN', 'name' : 'INDIA'},{ 'code' : 'US', 'name' : 'USA'},{ 'code' : 'UK', 'name' : 'UK'},{ 'code' : 'JP', 'name' : 'JAPAN'},{ 'code' : 'AUS', 'name' : 'AUSTRALIA'}]

  const printResult = async (url) => {
    const data = { "url" : url, "user_id": user.email }
    console.log(data)
    const response = await fetch('/api/query/clickSuggestion', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(data)
    })
    const json = await response.json()
    
    if (response.ok) {
      setQuery("");
      setSuggestions(emptyList);
      console.log("click results received");
      setResult(json);
    }else
      console.log("clickSuggestion error: ", response, json)
  } 
  const handleKeyDown = async(event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed ✅');
      const suggestionData = {
        query,
        filter
      }
      const response = await fetch('/api/query/pressedEnter', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(suggestionData)
      })
      const json = await response.json()      
      if (response.ok) {
        setQuery("");
        setSuggestions(emptyList);
        setEnterResults(json);
        setResult({});
        console.log("enter results received");
      }else
        console.log(json)
    }
  };
  
  useEffect(() => {

  }, [suggestions]);

  useEffect(() => {
    console.log("useffect call for fetchCommingSoon");
    const fetchCommingSoon = async () =>{
      const data = {
        'region' : region,
        'type' : commingSoonType
      };
      const response = await fetch('api/query/comingSoon', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (response.ok) {
        setLatests(json);
        console.log("CommingSoon results received.");
      }else
        console.log("error from fetchCommingSoon: ", json);
    } 
    if(user)
      fetchCommingSoon();
  }, [commingSoonType, region])

  useEffect(() => {
    const fetchRecents = async () => {
      const data = {
        "user_id" : user.email        
      }
      const response = await fetch('/api/query/recentlyViewed', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      
      if (response.ok) {
        console.log("recents received")
        setRecents(json);
      }else
        console.log(json);
    }


    const fetchFavs = async () => {
      const data = {
        "user_id" : user.email        
      }
      const response = await fetch('/api/query/user-fav', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      
      if (response.ok) {
        console.log("favs received", json)
        setFavs(json);
      }else
        console.log(json);
    }

    fetchRecents();
    fetchFavs();
  }, []);

  useEffect(() => {
    console.log('use effect ran', query)
    const fetchSuggestions = async () => {
      const suggestionData = {
        query,
        filter
      }
      const response = await fetch('/api/query/suggestQuery', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(suggestionData)
      })
      const json = await response.json()
      
      if (response.ok) {
        setSuggestions(emptyList);
        setSuggestions(json);
        console.log("suggestions received");
      }else
        console.log(json)
    }

    if (user && query !== '') {
      fetchSuggestions()
    }
    if(query === "")
      setSuggestions([])
  }, [ query, filter ])

  return (
      <div className="wrapper">
        <div className='searchBox'>
          <div className="row col-12">
            <label htmlFor="search-form" className='col-10 search-bar'>
                <input type="search" name="search-bar" id=""
                    // className="search-input"
                    className="form-control form-control-lg my-0 rounded-1"
                    placeholder="Type your search here..."
                    onKeyDown={handleKeyDown}
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                
                <div className="auto-suggestions">
                  {suggestions && suggestions.map((suggestion, ind) => (
                    <a key={ind+1} className="list-group-item list-group-item-action bg-white px-2 py-1" type="button" onClick={() => printResult(suggestion.mlink)} aria-current="true">
                      <div className="d-flex w-100 justify-content row">
                        <img className="col-lg-2 col-md-3 col-sm-4 col-xs-4 suggestion-img" src={suggestion.image} alt={suggestion.mname}/>
                        <div className="col-lg-10 col-md-9 col-sm-8 col-xs-8">
                          <h5 className="movie-title">{suggestion.mname}</h5>
                          <h6 className="movie-year">{suggestion.year}</h6>
                        </div>
                      </div>
                  </a>
                  ))}
                </div>
              {/* <span className="sr-only">Search your query here</span> */}
            </label>

            <div className="col-2">
              <select
                onChange={(e) => {  setFilter(e.target.value);}}
                // className="custom-select"
                className="form-select form-control-lg pt-3 rounded-1"
                aria-label="Filter Countries By Region">
                <option value="">All</option>
                <option value="movie">Movies</option>
                <option value="tv">TV</option>
                <option value="franchise">Franchises</option>
                <option value="celebrity">Celebrities</option>
              </select>
              <span ></span>
            </div>

          </div>
        </div>
      {/* END of Search Box */}

      <div className="container-data">      
        {/* START Click Result */}
        {Object.keys(result).length > 0 &&  <h3 className="mx-4 text-white pt-3 mb-0"> Search Result </h3> }
        <div className="scrollBarRemove container-fluid overflow-auto mb-2">
          <div className="d-inline-flex">
            { Object.keys(result).length > 0  && 
                <div className="card mb-3 p-2 mx-2 widthCard"
                >
                <div className="row g-0">
                  <div className="col-md-2">
                    <img src={result.poster} className="img-fluid rounded-start-top" alt={result.title} />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body py-0">
                      <h4 className="card-title"><strong>{result.title}</strong></h4>
                      <h5 className="card-text">{result.info}</h5>
                      <br/>
                      { result.Genre && <div className="row fs-5">
                        <div className="col-6 float-end"><strong>Genre:</strong>{result.Genre}</div>
                      </div> }
                      { result.OrginalLanguage && <div className="row fs-4">
                        <div className="col-6 float-end"><strong>Original Language:</strong> {result.OrginalLanguage}</div>
                      </div> }
                      { result.Director && <div className="row fs-5">
                        <div className="col-6 float-end"><strong>Director:</strong> {result.Director}</div>
                      </div>}
                      { result.Writer && <div className="row fs-5">
                        <div className="col-6 float-end"><strong>Written by:</strong> {result.Writer}</div>
                      </div>}
                      { result.time && <div className="row fs-5">
                        <div className="col-6 float-end"><strong>Runtime:</strong>{result.time}</div>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        {/* END of Search Result */}

        {/* START Enter Resuls */}
        {enterResults.length > 0 &&  <div className="d-flex "> 
          <h3 className="mx-4 text-white"> Query Results </h3>
        </div> }
        <div className="scrollBarRemove container-fluid overflow-auto mb-3">
          <div className="d-inline-flex">
            { enterResults && enterResults.map((result, ind) => (
              <a type="button" key={ind+1} onClick={() => printResult(result.mlink)} aria-current="true">
                <div className="bg-transparent mb-3 mx-2 smallCard">
                  <div className="card border-0">
                    <img src={result.image} className="card-img" alt={result.mname} />
                    <div className="card-footer py-1">
                      <p className="card-title text-center m-0">{result.mname}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* END of Enter results */}


        {/* START Recently Viewed */}
        {recents.length > 0 &&  <div className="d-flex "> 
          <h3 className="mx-4 text-white"> Recently Viewed </h3>
        </div> }
        <div className="scrollBarRemove container-fluid overflow-auto mb-3">
          <div className="d-inline-flex">
            { recents && recents.map((result, ind) => (
                <div className="bg-transparent mb-3 mx-2 smallCard">
                  <div key={ind+1} className="card border-0">
                    <img src={result.ImageLink} className="card-img" alt={result.MovieName} />
                    <div className="card-footer py-1">
                      <p className="card-title text-center m-0"><strong>{result.MovieName}</strong></p>

                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>


        {favs.length > 0 &&  <div className="d-flex "> 
          <h3 className="mx-4 text-white"> You may Like </h3>
        </div> }
        <div className="scrollBarRemove container-fluid overflow-auto mb-3">
          <div className="d-inline-flex">
            { favs && favs.map((fav, ind) => (
              // <a type="button" key={ind+1} onClick={() => printResult(fav.alink)} aria-current="true">
              <a>
                <div className="bg-transparent mb-3 mx-2 smallCard">
                  <div key={ind+1} className="card border-0">
                    <img src={fav.imgsrc} className="card-img" alt={fav.movies} />
                    <div className="card-footer py-1">
                      <p className="card-title text-center m-0"><strong>{fav.movies}</strong></p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* END of Recently Viewed */}

        {/* START Comming Soon */}
        {latests.length > 0 &&  <div className="d-flex "> 
          <h3 className="mx-4 col-3 text-white"> Coming Soon </h3>
          <div className="col-5"> </div>
          <div className="col-1">
            <select
              onChange={(e) => {  setCommingSoonType(e.target.value);}}
              className="form-select form-control-sm rounded-0 mb-2"
              aria-label="Filter Comming Soon by Type">
                <option value="MOVIE">MOVIE</option>
                <option value="TV">TV</option>                
            </select>
          </div>
          <div className="col-2">
            <select
              onChange={(e) => {  setRegion(e.target.value);}}
              className="form-select form-control-sm rounded-0 mb-2"
              aria-label="Filter Comming Soon by region">
              { countries.map((region, ind) => (<option key={ind+1} value={region.code}>{region.name}</option>)) }
            </select>
          </div>
        </div> }

        <div className=" container-fluid overflow-auto mb-3">
          <div className="row">
            { latests && latests.map((latest, ind) => (
                <div key={ind+1} className="bg-transparent mb-3 mx-2 smallCard">
                  <div className="card border-0">
                    <img src={latest.imagelink} className="card-img" alt={latest.mname} />
                    <div className="card-footer py-1">
                      <p className="card-title text-center m-0"><strong>{latest.mname}</strong></p>

                      {latest.trailer_link != "NA" && <a target="_blank" type="button" className="d-flex justify-content-center btn btn-dark btn-sm" href={latest.trailer_link}> Watch Trailer</a>}
                      {latest.trailer_link == "NA" && <a target="_blank" type="button" className="d-flex justify-content-center btn btn-dark btn-sm" href="https://www.youtube.com/embed/vCTt_PnWHPg"> Watch Trailer</a>}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Home