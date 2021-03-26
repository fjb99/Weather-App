
const cityForm = document.querySelector('form'); 
const card = document.querySelector('.card'); 
const details = document.querySelector('.details');  
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');  
const forecast1 = new Forecast(); 
console.log(forecast1); 


const updateUI = (data) => {
    console.log(data); 

    const cityDets = data.cityDets; 
    const weather = data.weather; 

    //destruction properties
    /* 
        const { cityDets, weather } = data
        E NEJTA SI AJO SIPER
        merr kto si variabla qe jane njesoj me emrin e atyre 
        qe do marrim nga data dhe i ruan ne po te njejtin emer variablash 
        BEN TE NJEJTEN GJE SI AJO SIPER
    */
   

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span> &deg;C </span>
    `; 
    //icon img 
    const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;  
    icon.setAttribute('src', iconsrc); 

    //update the night/day  
    //[I SHIKON TE TERA NE CONSOLE TEK DATA]
    let timesrc = null; 
    if(weather.IsDayTime){
        timesrc = 'img/day.svg'; 
    } else{
        timesrc = 'img/night.svg';
    }
    time.setAttribute('src', timesrc); 

    

    //remove the d-none class if prezent
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none'); 
    }
}; 



cityForm.addEventListener('submit', e =>{
    //prevent default action
    e.preventDefault(); 

    //get City value
    const city = cityForm.city.value.trim(); 
    cityForm.reset(); 

    //update the ui with new city
    forecast1.updateCity(city) 
        .then(data => updateUI(data))
        .catch(err => console.log(err)); 

//set local storage
localStorage.setItem('city', city); 


}); 

//per LocalStoreg
if(localStorage.getItem('city')){
    forecast1.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}


 
