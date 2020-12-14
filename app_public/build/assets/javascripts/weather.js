
document.getElementById("show_weather").addEventListener("click", function () {
    var asinhronaZahteva = new XMLHttpRequest();
    asinhronaZahteva.open("GET", "/nearby?weather", true);

    asinhronaZahteva.addEventListener("load", function () {
        try {
//               console.log(asinhronaZahteva.responseText);
            weather=JSON.parse(asinhronaZahteva.responseText);

            document.getElementById("location").innerHTML= weather.location.name+", "+weather.location.country;
            document.getElementById("localtime").innerHTML= weather.location.localtime;
            document.getElementById("temperature").innerHTML= weather.current.temperature+"&nbsp;&#8451;";
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

        };


    });
    asinhronaZahteva.send(null);
})