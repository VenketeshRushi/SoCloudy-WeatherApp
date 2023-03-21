async function Daysdata({lat, lon}) {
  let url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=700de9c24da762a4b9d5b7fba2e2a5fa`;

  let res = await fetch(url1);
  let data = await res.json();
  return data;
}
export default Daysdata;
