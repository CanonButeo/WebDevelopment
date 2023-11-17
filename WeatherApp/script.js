let appID = "2a9100392b6a09822483abc41b7039b1";
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
    searchMethod = "zip";
  else
    searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appID}&units=${units}`).then(result => { return result.json(); }).then(result => {
    init(result);
  })
}

function init(serverResult) {
  console.log(serverResult);
  
  switch(serverResult.weather[0].main){
      case 'Clear':
        document.body.style.backgroundImage = 'url("clear.jpg")';
        break;
      
      case 'Clouds':
        document.body.style.backgroundImage = 'url("cloud.jpg")';
        break;
      
      case 'Rain':
      case 'Drizzle':
        document.body.style.backgroundImage = 'url("rain.jpg")';
        break;
      
      case 'Fog':
      case 'Mist':
      case 'Smoke':
        document.body.style.backgroundImage = 'url("fog.jpg")';
        break;
      
      case 'Thunderstorm':
        document.body.style.backgroundImage = 'url("thunder.jpg")';
        break;
      
      case 'Snow':
        document.body.style.backgroundImage = 'url("snow.jpg")';
        break;
      
      default:
      break;
  }
  
  let weatherDescrptn = document.getElementById("weathertype");
  let temperatureElmnt = document.getElementById("temperature");
  let windElmnt = document.getElementById("wind");
  let humidity = document.getElementById("humidity");
  let weatherIconElmnt = document.getElementById("documentIcon");
  let cityHeader = document.getElementById("cityhdr");
  
  weatherIconElmnt.src = "https://openweathermap.org/img/wn/" + serverResult.weather[0].icon + ".png";
  
  let resultDescrptn = serverResult.weather[0].description;
  
  weatherDescrptn.innerText = resultDescrptn[0].toUpperCase() + resultDescrptn.slice(1);
  
  temperatureElmnt.innerHTML = Math.floor(serverResult.main.temp) + "&#176";
  windElmnt.innerHTML = "Wind speed is " + Math.floor(serverResult.wind.speed) + " m/s";
  humidity.innerHTML = "Humidy rate is " + 
    serverResult.main.humidity + " %";
  cityHeader.innerHTML = serverResult.name;    
  
  setInfoPos();
}

function setInfoPos() {
  let weatherInfoElmnt = document.getElementById("weatherContnr");
  let weatherInfoHeight = weatherInfoElmnt.clientHeight;
  let weatherInfoWidth = weatherInfoElmnt.clientWidth;
  
  weatherInfoElmnt.style.left = `calc(50% - ${weatherInfoWidth/2}px)`;
  weatherInfoElmnt.style.top = `calc(50% - ${weatherInfoHeight/2}px - 25px)`;;
  weatherInfoElmnt.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchBar").value;
  if(searchTerm)
    searchWeather(searchTerm);
})