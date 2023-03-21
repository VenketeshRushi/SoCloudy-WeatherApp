async function Weather(city){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=700de9c24da762a4b9d5b7fba2e2a5fa`
    let res= await fetch(url)
    let data= await res.json();
    return data;
    
}
export default Weather;