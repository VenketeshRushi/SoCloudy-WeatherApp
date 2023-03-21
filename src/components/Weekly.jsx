import { useEffect } from "react";
import { useState } from "react";
import Daysdata from "./weeklydata";

function Weekly(props) {

    const [data,setdata]=useState({})
    useEffect(()=>{
        getdata(props.lat,props.lon);
    },[])
    async function getdata(lat,lon){
        let data= await Daysdata(lat,lon);
        console.log(lat)
        console.log(lon)
        setdata(data);
    }
    console.log(data);
    return (
        <div>
            
        </div>
    )
  }



  export  {Weekly};
