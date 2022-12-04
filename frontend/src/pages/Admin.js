import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import gsap from "gsap";
import CanvasJSReact from '../canvas/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 

// components
const Home = () => {
  const {user} = useAuthContext()
  
  const [genres, setGenres] = useState([]);
  const [langs, setLangs] = useState([]);
  const [dates, setDates] = useState([]);
  
  useEffect(() => {
    const fetchRecents = async () => {
      const response = await fetch('/api/query/admin', {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })
      const json = await response.json();
      
      if (response.ok) {
        console.log(json);
        setGenres(json.genrewise);
        setLangs(json.languagewise);
        setDates(json.timewise);
      }else
        console.log(json);
    }
    fetchRecents();
  }, []);

  const genreOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title:{
      text: "Genres"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}",		
      startAngle: -90,
      dataPoints: genres
    }]
  }
  const langOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title:{
      text: "Languages"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}",		
      startAngle: -90,
      dataPoints: langs
    }]
  }
  const dateOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark1", // "light1", "dark1", "dark2"
    title:{
      text: "Day Wise Hits"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}",		
      startAngle: -90,
      dataPoints: dates
    }]
  }

  return (
    <div className="row" style={{minWidth: 100}}>

      <div className="py-5"> 
        <h1 className="text-white px-5 py-4">Admin Dashboard</h1>
      </div>
        

      {/* <div className="card"> */}
      <div className="row  justify-content-center">
        <div className="col-4 ">
          < CanvasJSChart options = {genreOptions} />
        </div>

        <div className="col-4 ">
          < CanvasJSChart options = {dateOptions} />
        </div>

        <div className="col-4 ">
          < CanvasJSChart options = {langOptions} />
        </div>
      </div>
        
      {/* </div> */}


    </div>
  )
}

export default Home