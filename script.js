'use strict';

const selectMenu = document.querySelectorAll("select");
const img = document.querySelector("img");
const time = document.querySelector(".now-time");
const button = document.querySelector("button");
const content = document.querySelector(".content");
let alarmTime,
  alarmState = "notSet";
const ringtone = new Audio(
  "alarm-clock-short-6402.mp3"
);

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  time.innerHTML = `${h}:${m}:${s}`;
  if (alarmTime == `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
    img.classList.add("on");
  }
}, 1000);

button.addEventListener("click", () => {
  alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("invalid date!");
  }
  checkState(alarmState);
});
function checkState(state) {
  if (state == "notSet") {
    content.classList.add("disable");
    alarmState = "set";
    button.style = "background: rgb(219, 36, 36);";
    button.innerText = "Clear Alarm";
  } else {
    content.classList.remove("disable");
    alarmTime = "";
    ringtone.pause();
    img.classList.remove("on");
    alarmState = "notSet";
    button.style = "background: #d1dae3;";
    button.innerText = "Set Alarm";
  }
}
