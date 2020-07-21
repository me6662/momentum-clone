const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // text > object 로 만들어야됨.
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function deleteToDo(event) {
  // console.dir(event.target);
  // console.log(event.target.parentNode);
  // console dir 은 상호작용하는 프로퍼티들의 리스트를 출력한다. > 이렇게 해서 아버지가 누군지 알려고함. li 다 지워버려야 되니까
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); //foreach 처럼 행렬 각각 에 대하여 수행됨. (단 filter 는 void 가 아닌 return 이 있음.)
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //localStorage.setItem(TODOS_LS, toDos);
  // Javascripts 는 local storage 에 있는 모든 데이터를 string으로만 저장하려고함.
  // 그래서 object 가 string 이 되도록 해야함. > JSON 활용!
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // ul 을 li 밑에 만들것이다.
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId; // 나중에 지울때 지워주려고 아이디 부여
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit() {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
