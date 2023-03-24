var inputEl = $("#userInput");
var cityEl = $("#userCity");
var searchEl = $("#search-btn");
var cityFormEl = $("#city-input-form");
var cityListEl = $("#city-list");
var apiKey = "676162458e1b3adfea2caf5bd43f3a65";
var searchedCities = localStorage.getItem("city")
  ? JSON.parse(localStorage.getItem("city"))
  : [];
var tempEl = $("#display-temp");
var windEl = $("#display-wind");
var humidityEl = $("#display-humidity");

function populateCityList() {
  cityListEl.html("");
  $(searchedCities).each(function (i, el) {
    cityListEl.prepend("<li>" + el + "</li>");
  });
  $("li").attr("class", "listGroupItem");
  $("li").on("click", function () {
    var liEl = $(this).text();
    console.log(liEl, "List element");
    inputEl = liEl;
    console.log("inpulEl : ",inputEl);
    getInfo(inputEl);
  });
}
function handleFormSubmit(event) {
  event.preventDefault();
  inputEl = $("#userInput").val().trim();
  console.log(inputEl, "inside formSubmit");
  getInfo(inputEl);
  if (!searchedCities.includes(inputEl)) {
    searchedCities.push(inputEl);
  }
  if (!inputEl) {
    return;
  }
  populateCityList();
  $("#userCity").text("City: " + inputEl);
  $("input[name='cityNameInput']").val("");
  localStorage.setItem("city", JSON.stringify(searchedCities));
}
cityFormEl.on("submit", handleFormSubmit);
readMeURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + apiKey;

function getInfo(city) {
  var requestUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
  fetch(requestUrlCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentDate = new Date();
      const dateEl = document.getElementById("current-date");
      dateEl.innerHTML = "Date: " + currentDate;
      const tempEl = document.getElementById("display-temp");
      tempEl.innerHTML = "Temp: " + data.main.temp;
      const windEl = document.getElementById("display-wind");
      windEl.innerHTML = "Wind: " + data.wind.speed;
      const humidityEl = document.getElementById("display-humidity");
      humidityEl.innerHTML = "Humidity: " + data.main.humidity;
      $("#userCity").text("City: " + city);
      fiveDayInfo(city)
    })
  }
   function fiveDayInfo(inputName) {
      var requestUrlOneCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputName + "&units=imperial&appid=" + apiKey;
      fetch(requestUrlOneCall)
      .then(response => response.json())
      .then(function (data){
        for (var i=0; i<5; i++){
            document.getElementById("temp" + (i+1)).innerHTML = "Temp: " + data.list[i].main.temp + "°";
        }
        for (var i=0; i<5; i++){
          document.getElementById("wind" + (i+1)).innerHTML = "Wind: " + data.list[i].wind.speed + "°";
      }
      for (var i=0; i<5; i++){
        document.getElementById("hum" + (i+1)).innerHTML = "Humidity: " + data.list[i].main.humidity + "°";
    }
    for (var i=0; i<5; i++){
        document.getElementById("forcast-icon" + (i+1)).src= "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
    }
    
      })
      .catch( err => alert("Oh uh Something unexpected happened!"));
    };
    const day = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    function pullDay(input){
      if (input + day.getDay() > 6){
        return input + day.getDay() - 7;
      }
      else{
        return input + day.getDay();
      }
    }
    for(var i=0; i<5; i++){
      document.getElementById("forcast-date" + (i+1)).innerHTML = days[pullDay(i)]
    }

