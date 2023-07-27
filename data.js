const latitude = 6.5243793;

const longitude = 3.3792057;

fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`)
.then(response => response.json())
.then(data => console.log(data.coord.lon));