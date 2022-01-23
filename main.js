function displayTime() {
    let dateTime = new Date();
    let hour =  formatTime (dateTime.getHours());
    let min = formatTime(dateTime.getMinutes());
    let sec = formatTime(dateTime.getSeconds());
    let session = document.getElementById('session');
    
  
    if (hour>=12) {
      session.innerHTML = 'PM';
    } else {
      session.innerHTML = 'AM';
    }
  
  
    if (hour>12) {
      hour = hour - 12;
    }
    
    if (hour<12) {
      hour = hour;
    }


  
    document.getElementById('hours').innerHTML = hour;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    
  }
  
  
  function displayDate() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  
    let date= new Date();
    let day = days[date.getDay()];
    let dayNum = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
  
    document.getElementById("day").innerHTML = day;
    document.getElementById("month").innerHTML = month;
    document.getElementById("year").innerHTML = year;
    document.getElementById("dayNum").innerHTML = dayNum;
  
  }
  
  function formatTime(time) {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }
  
  
  setInterval(displayDate, 10);
  setInterval(displayTime, 10);

const text=document.getElementById("quote");
const author=document.getElementById("author");
const tweetButton=document.getElementById("tweet");

const getNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote=allQuotes[indx].text;

    //Store the author of the respective quote
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }

    //function to dynamically display the quote and the author
    text.innerHTML=quote;
    author.innerHTML="~ "+auth;

    //tweet the quote
    tweetButton.href="https://twitter.com/intent/tweet?text="+quote+" ~ "+auth;
}
getNewQuote();


let weather = {
  apiKey : "f5bc6a764d547f5deddccf9f889e80af", 
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&appid="
      + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, feels_like, humidity} = data.main;
    const {speed} = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C" ;
    document.querySelector(".feels_like").innerText = "Feels like " + feels_like;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";

    document.querySelector(".weather").classList.remove("loading");
  },
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }

};

//listens for a click then activates a function
document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
})

//eventlistener that listens to when the user clicks enter
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key == "Enter") {
    weather.search();
  }
})

weather.fetchWeather("Vaughan");
