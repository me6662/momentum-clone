const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${
    seconds < 10 ? `0${seconds}` : seconds // 이걸 잘 기억합시다.. 삼항연산자
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000); // 자동으로 타이머설정됨 ㄷㄷ..
}

init();
