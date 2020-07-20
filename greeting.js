const form = document.querySelector(".js-form"),
  input = document.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

// querySelector 는 하나의 제일 위의 element 만 가져옴.
// querySelectorAll 은 모든 element 를 다가져옴.

// localstorage : 사용자 브라우저 내부의 저장소
// 개발자는 그것을 이용하도록 할 수 있다.

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  // form 태그 자체가 input 에 입력하고 엔터누르면 새로고침됨. (document 전체를 제출함 서버에다가)
  // 그걸 막기위해 이걸써줌.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN); // 이름넣는거 안보이게
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // no data
    askForName();
  } else {
    // data is existing.
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
