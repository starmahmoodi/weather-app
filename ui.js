const key = "087006cb26c11ba06a090c02ec9c8b4d";
const form = document.querySelector('#form');
const button = document.querySelector('.fa-search');
const cityName = document.querySelector('#name');
const cityInput = document.querySelector('#cityInupt');
const temp = document.querySelector('#temp');
const description = document.querySelector('#description');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');
const conditionIcon =  document.querySelector('#conditionIcon');
const cities = document.querySelectorAll('.city');
const main = document.querySelector('.main');
const condition_icon = document.querySelector('.condition-icon');
const outerH = document.querySelector('#hrs');
const outerM = document.querySelector('#mn');
const outerDw = document.querySelector('#dw');
const outerD = document.querySelector('#dte');
const outerMth = document.querySelector('#mth');
const outerY = document.querySelector('#yrs');


//////////////day of date
const weekDays = (day) =>{
    let d;
    switch (day) {
        case 0:
            d = "Sunday";
            break;
        case 1:
            d = "Monday";
            break;
        case 2:
            d = "Tuesday";
            break;
        case 3:
            d = "Wednesday";
            break;
        case 4:
            d = "Thursday";
            break;
        case 5:
            d = "Friday";
            break;
        case 6:
            d = "Saturday";
            break;
    }
    return d;
}

///////////////change background image
const changeBackgroundImage = (code) =>{
    switch (code) {
            
        case "01d":
            main.style.backgroundImage = "url(./imgs/sunny-day.jpg)";
            break;
        case "01n":
            main.style.backgroundImage = "url(./imgs/night.jpg)";
            break;
        case "02d":
            main.style.backgroundImage = "url(./imgs/cloudy-day.jpg)";
            break;
        case "02n":
            main.style.backgroundImage = "url(./imgs/cloudy-night.jpg)";
            break;
        case "03d":
            main.style.backgroundImage = "url(./imgs/cloudy-day.jpg)";
            break;
        case "03n":
            main.style.backgroundImage = "url(./imgs/cloudy-night.jpg)";
            break;
        case "04d":
            main.style.backgroundImage = "url(./imgs/cloudy-day.jpg)";
            break;
        case "04n":
            main.style.backgroundImage = "url(./imgs/cloudy-night.jpg)";
            break;
        case "09d":
            main.style.backgroundImage = "url(./imgs/rainy-day.jpg)";
            break;
        case "09n":
            main.style.backgroundImage = "url(./imgs/rainy-night.jpg)";
            break;
        case "10d":
            main.style.backgroundImage = "url(./imgs/rainy-day.jpg)";
            break;
        case "10n":
            main.style.backgroundImage = "url(./imgs/rainy-night.jpg)";
            break;
        case "11d":
            main.style.backgroundImage = "url(./imgs/thunder-day.jpg)";
            break;
        case "11n":
            main.style.backgroundImage = "url(./imgs/thunder-night.jpg)";
            break;
        case "13d":
            main.style.backgroundImage = "url(./imgs/snowy-day.jpg)";
            break;
        case "13n":
            main.style.backgroundImage = "url(./imgs/snowy-night.jpg)";
            break;
        case "50d":
            main.style.backgroundImage = "url(./imgs/sunny-day.jpg)";
            break;
        case "50n":
            main.style.backgroundImage = "url(./imgs/night.jpg)";
            break;
    }
}

//////////////city data
const cityData = (unix) =>{
    const uni = Date.now(unix);
    const d = new Date(uni);
    const dayOfWeek = d.getDay();

    outerY.innerHTML = d.getFullYear();
    outerMth.innerHTML = d.getMonth() +1 ;
    outerD.innerHTML = d.getDate();
    outerH.innerHTML = d.getHours();
    outerM.innerHTML = d.getMinutes();
    outerDw.innerHTML = weekDays(dayOfWeek);
} 

///////////////create UI
const creatUi = (url) =>{
    getData(url)
    .then((data) => {
        /////date
        cityData(data.dt);

        /////
        // console.log(dd);
        console.log(data);
        cityName.innerHTML = data.name;
        temp.innerHTML = `${data.main.temp.toFixed(1)}&#176;`;
        description.innerHTML = data.weather[0].main;
        wind.innerHTML = `${data.wind.speed} km/h`;
        humidity.innerHTML = `${data.main.humidity} %`;
        pressure.innerHTML = data.main.pressure;
        const iconPath = data.weather[0].icon;
        conditionIcon.src = "https://openweathermap.org/img/wn/" + iconPath + ".png";
        console.log(data.weather[0].icon);

        /////background
        changeBackgroundImage(iconPath);

    })
    .catch(err => console.log(err));
}

////////////////first Load
const firstLoad = ()=>{
    const city = "london";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    creatUi(url);
    // console.log(cityList);
    // cityList.forEach(
    //     (e)=>{
    //         let cityName = e.target.textContent;
    //     }
    // );
    
}

////////////submit Location
const submitLocation = (e) =>{
    e.preventDefault();
    const city = cityInput.value;
    if (city.length == 0) {
        const defaultCity = "london";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${key}&units=metric`;
    
        creatUi(url);
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    
        creatUi(url);
    }
    
}

//////////search button
const searchButton = (e) =>{
    e.preventDefault();
    const city = cityInput.value;
    if (city.length == 0) {
        const defaultCity = "london";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${key}&units=metric`;
    
        creatUi(url);
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    
        creatUi(url);
    }
}

///////////city List
cities.forEach(city =>{
    city.addEventListener('click', (e)=>{
        console.log(e.target.textContent);
        const cityName = e.target.textContent;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
    
        creatUi(url);
        // main.style.opacity = "0";

    })
})
///////////// Events
window.addEventListener('load',firstLoad );
form.addEventListener('submit', submitLocation);
button.addEventListener('click', searchButton);
