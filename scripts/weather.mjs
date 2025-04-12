import {displayPage , setupPagination,setData } from "./pagination.mjs";

const KEY = "0d03b6d879384011a6e61150251004";
const zip = document.getElementById("zipCode")  ;

// const getWeather  = document.getElementById("getData") as HTMLButtonElement ;
const display = document.getElementById("weatherData") ;
const formEle = document.getElementById("formId") ;
export let weekData = [];

formEle.addEventListener('submit',async(e) => {
    e.preventDefault();
    try{
        display.textContent = "";
        const zipCode = Number(zip.value);
        const currentWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${zipCode}&days=7`);
        
        if(!currentWeather.ok){
            alert("Invalid Zip code");
            return;
        }
        const data = await currentWeather.json();

        weekData = data.forecast.forecastday;

        setData(weekData);

        console.log(weekData);  

        displayPage(1);
        setupPagination();
    }catch(err){
        console.log(err);
        alert("Failed")
    }
});

function addTemplate(imgSrc,text,dest){
    const template = document.querySelector("template");
    const newList = template.content.cloneNode(true);

    let choice = newList.querySelector(".choice");

    const anchor = document.createElement("a");
    anchor.setAttribute("href",dest);
    const img= document.createElement("img");
    img.setAttribute("src",imgSrc);
    img.setAttribute("alt",text)

    anchor.appendChild(img);
    choice.appendChild(anchor);
}