const weather = document.querySelector(".js-weather");

const API_KEY = "f99beee0b42e32e88a8b74917d4ff47d";
const COORDS = "coords";

/* API 사용하기 
Javascripts 는 웹사이트로 request 를 보내고, 응담을 통해서
데이터를 얻을 수 있는데
가져온 데이터를 Refresh 없이 내웹사이트에 적용할 수 있기 때문에 좋다.
웹사이트에서 메일확인할때 새로고침 안해도 바로 바로 확인 하는이유.
왜냐면 javascripts 가 보이지 않는 곳에서 계속 요청하기 때문이다.
*/

function getWeather(lat, lon) {
  // API 서버에서 데이터를 얻는 것은 fetch 를 사용한다.
  // 반드시 백틱 사용 , API 키는 그쪽 서버에서 무리가 갈만큼 못사용하게 하도록 하기위함.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); //then : 이전 함수가 끝날때까지 기다린다음 끝나면 수행하는 콜백함수 (response > json 바꾸는데 시간이 걸림)
    }) //json : javascript objects 인듯
    .then(function (json) {
      // json 바꾸는게 완료 되면 log 로 표시 (원래는 바로 표시했다가 바꾸는 중에 표시해버렸었음.)
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}°C @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeosuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // latitude : latitude,
    // longitude : longitude
    latitude,
    longitude, // 오브젝트 이름이랑 받는것이 똑같으면 이렇게함.
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeosuccess, handleGeoError); // 내장 API , 위치 값 불러옴
  // 위치값 로딩 성공시 콜백 ,실패시 콜백.
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
