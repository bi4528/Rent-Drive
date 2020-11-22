
     document.getElementById("show_weather").addEventListener("click", function () {

            const Http = new XMLHttpRequest();
            const url='http://api.weatherstack.com/current?access_key=f61e126b021aa0d360b427c69a9e4c27&query=Ljubljana';
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = (e) => {
            try {
                           //console.log(Http.responseText);
                           weather=JSON.parse(Http.responseText);

                           document.getElementById("location").innerHTML= weather.location.name+", "+weather.location.country;
                           document.getElementById("localtime").innerHTML= weather.location.localtime;
                           document.getElementById("weather_descriptions").innerHTML= weather.current.weather_descriptions;
                           document.getElementById("weather_icon").src= weather.current.weather_icons;
                           document.getElementById("wind_speed").innerHTML= "<b>Wind&nbsp;speed: </b>"+weather.current.wind_speed;
                           document.getElementById("wind_degree").innerHTML= "<b>Wind&nbsp;degree: </b>"+weather.current.wind_degree;
                           document.getElementById("wind_dir").innerHTML= "<b>Wind&nbsp;direction: </b>"+weather.current.wind_dir;
                           document.getElementById("pressure").innerHTML= "<b>Pressure: </b>"+weather.current.pressure;
                           document.getElementById("humidity").innerHTML= "<b>Humidity: </b>"+weather.current.humidity;
                           document.getElementById("uv_index").innerHTML= "<b>UV index: </b>"+weather.current.uv_index;
                 }
            catch(err) {
                   document.getElementById("location").innerHTML = err.message;
            }


            }
    })