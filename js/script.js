var inputEl = document.getElementById("userInput");
var cityEl = document.getElementById("userCity");
cityEl.innerText=inputEl;
var searchEl = document.getElementById("search-btn");


function getInfo(){
    
    
   

}

fetch("https://api.openweathermap.org/data/2.5/forecast?q='+inputEl+'&appid=676162458e1b3adfea2caf5bd43f3a65")
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for(var i=0; i<5; i++){

    }
  })
  searchEl.addEventListener('click', function(event){
    event.preventDefault()
  })
  
