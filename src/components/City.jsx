import { useEffect } from "react";
import { useState } from "react";
import Weather from "./Weather";
import "./Geo.css";
import { addingdays } from "./Weekly";
//import Weekly from "./Weekly";

function City() {
  const [text, settext] = useState("");
  const [data, setdata] = useState({});
  const [weeklydata, setweeklydata] = useState([]);
  useEffect(() => {
    geolocation();
  }, []);

  console.log(text);
  const handleclick = async () => {
    let data = await Weather(text);
    console.log(data);
    setdata(data);
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    daysdata(lat, lon)
    //setweeklydata(data.main);
    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    settext("");
  };

  function geolocation() {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      getlocationusingloctaion(crd.latitude, crd.longitude);
      geolocationfordays(crd.latitude, crd.longitude);
    }
  }

  function getlocationusingloctaion(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=700de9c24da762a4b9d5b7fba2e2a5fa`;
    async function getinfo() {
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setdata(data);
        //setweeklydata(data.main);
        let iframe = document.getElementById("gmap_canvas");
        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        iframe.style.borderRadius = "10px";
        iframe.style.marginRight = "1px";
      } catch (error) {
        console.log(error);
      }
    }
    getinfo();
  }

  function geolocationfordays(lat, lon) {
    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=700de9c24da762a4b9d5b7fba2e2a5fa`;
    async function getinfodays() {
      try {
        let res = await fetch(url2);
        let data = await res.json();
        //console.log(data.daily);
        setweeklydata(data.daily);
        //addingdays(data.daily)
      } catch (error) {
        //console.log(error);
      }
    }
    getinfodays();
  }

  function daysdata(lat, lon) {
    let url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=700de9c24da762a4b9d5b7fba2e2a5fa`;
    async function getdays() {
      try {
        let res = await fetch(url1);
        let data = await res.json();
        console.log(data.daily);
        setweeklydata(data.daily);
        //cal(data.daily);
      } catch (error) {
        console.log(error);
      }
    }
    getdays();
  }
  console.log(data)
  console.log(weeklydata);

  return (
    <div>
      <div className="container">
        <div className="input">
          <h3 id="logo">Enter Your City</h3>
          <input
            value={text}
            onChange={(e) => settext(e.target.value)}
            type="text"
            placeholder="Enter City Name"
          />
          <button className="button-20" onClick={handleclick}>
            Check
          </button>
        </div>

        {/* <Weekly lat={data?.coord?.lat} lon={data?.coord?.lon}/> */}
        <div className="showdata">
          <div className="details">
            <h1>{data?.name}</h1>
            <h4>Temp:- {(data?.main?.temp - 273).toFixed(1)}<sup>°C</sup></h4>
            <h4>Max Temp:- {(data?.main?.temp_max - 273).toFixed(1)}<sup>°C</sup></h4>
            <h4>Min Temp:- {(data?.main?.temp_min - 273).toFixed(1)}<sup>°C</sup></h4>
          </div>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                width={400}
                height={330}
                id="gmap_canvas"
                frameBorder={0}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="infodays">Weekly Forcast Report</h1>
      <div className="days">
        {weeklydata?.map((ele, index) => {
          var en = "en";
          let obj = { weekday: "long" };
          var dayname= new Date(ele.dt * 1000).toLocaleDateString(en, obj);
          if (index < weeklydata.length -1) {
            if (+ele.temp.max - 273 > 30) {
              var en = "en";
              let obj = { weekday: "long" };
              var dayname = new Date(ele.dt * 1000).toLocaleDateString(en, obj);
              return (
                <div>
                  <h4>{dayname}</h4>
                  <h4>{(+ele.temp.max - 273).toFixed(1)}<sup>°C</sup></h4>
                  <h4>{(+ele.temp.min - 273).toFixed(1)}<sup>°C</sup></h4>
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                    alt=""
                  />
                </div>
              );
            } else if (
              (+ele.temp.max - 273).toFixed(1) < 30 &&
              (+ele.temp.max - 273).toFixed(1) > 25
            ) {
              var en = "en";
              let obj = { weekday: "long" };
              var dayname = new Date(ele.dt * 1000).toLocaleDateString(en, obj);
              return (
                <div>
                  <h4>{dayname}</h4>
                  <h4>{(+ele.temp.max - 273).toFixed(1)}<sup>°C</sup></h4>
                  <h4>{(+ele.temp.min - 273).toFixed(1)}<sup>°C</sup></h4>
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png"
                    alt=""
                  />
                </div>
              );
            } else {
              var en = "en";
              let obj = { weekday: "long" };
              var dayname = new Date(ele.dt * 1000).toLocaleDateString(en, obj);
              return (
                <div>
                  <h4>{dayname}</h4>
                  <h4>{(+ele.temp.max - 273).toFixed(1)}<sup>°C</sup></h4>
                  <h4>{(+ele.temp.min - 273).toFixed(1)}<sup>°C</sup></h4>
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png"
                    alt=""
                  />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}
export default City;
