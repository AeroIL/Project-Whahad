const task = document.querySelector(".txt");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const resetB = document.querySelector(".rbot");
const saveB = document.querySelector(".bot");
const noteDiv = document.querySelector(".notearea");
resetB.addEventListener("click", function resetForm() {
  task.value = "";
  date.value = "";
  time.value = "";
});
if (!localStorage.getItem("saveData")) {
  localStorage.setItem("saveData", JSON.stringify(saveData));
} else {
  let saveData = [];
  saveData = JSON.parse(localStorage.getItem("saveData"));
  for (let i = 0; i < saveData.length; i++) {
    console.log(saveData);
    addNote(saveData[i].Title, saveData[i].Date, saveData[i].Time);
  }
}

function addNote(Title, Date, Time) {
  saveData = JSON.parse(localStorage.getItem("saveData"));
  const taskNote = document.createElement("div");
  const upNote = document.createElement("div");
  const noteTitle = document.createElement("h3");
  const downNote = document.createElement("div");
  const noteDate = document.createElement("h4");
  const noteTime = document.createElement("h4");
  const dltBut = document.createElement("i");
  const nTitle = document.createElement("h2");
  dltBut.className = "fas fa-times fa-2x";
  taskNote.className = "notebg";
  upNote.className = "upperDiv";
  downNote.className = "lowerDiv";
  nTitle.className = "nTitle";
  nTitle.textContent = "Your Task:";
  noteTitle.className = "noteTitle";
  noteTitle.textContent = Title;
  noteDate.textContent = "Date: " + Date.split("-").reverse().join("/");
  noteTime.textContent = "Time: " + Time;
  noteDiv.appendChild(taskNote);
  taskNote.append(dltBut, upNote, downNote);
  upNote.append(nTitle, noteTitle);
  downNote.append(noteTime, noteDate);
  dltBut.addEventListener("click", function deleteNote(e) {
    e.target.parentElement.remove();
    for (let i = 0; i < saveData.length; i++) {
      console.log(e.target.parentElement.querySelector("h2").textContent);
      if (
        saveData[i].Title ==
        e.target.parentElement.querySelector("h2").textContent
      ) {
        saveData.splice(i, 1);
        localStorage.setItem("saveData", JSON.stringify(saveData));
      }
    }
  });
}

saveB.addEventListener("click", function SaveForm() {
  if (task.value == "" || date.value == "" || time.value == "") {
    alert("Fill Everything!");
  } else {
    addNote(task.value, date.value, time.value);
    saveData.push({ Title: task.value, Date: date.value, Time: time.value });
    localStorage.setItem("saveData", JSON.stringify(saveData));
    task.value = "";
    date.value = "";
    time.value = "";
  }
});

//CLock Function
function clock() {
  // Store full date in a variable
  let fullDate = new Date();

  // Date Variables
  let day = fullDate.getDate();
  let monthNum = fullDate.getMonth();
  let year = fullDate.getFullYear();

  // Time Variables
  let hour = fullDate.getHours();
  let minute = fullDate.getMinutes();
  let second = fullDate.getSeconds();

  // Add day suffix ('st', 'nd', 'rd', 'th')
  if (day === 1 || day === 21 || day === 31) {
    day += "st";
  } else if (day === 2 || day === 22) {
    day += "nd";
  } else if (day === 3 || day === 23) {
    day += "rd";
  } else {
    day += "th";
  }

  // Convert month number into month name
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthArray[monthNum];

  // When hour/minute/second is a single digit, prefix with '0'
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }

  // Add the day and time to the p elements
  document.getElementById("#Clockdate").textContent = `${day} ${month} ${year}`;
  document.getElementById(
    "#Clocktime"
  ).textContent = `${hour}:${minute}:${second}`;
}

// Call the clock function, then again every second
clock();
setInterval(clock, 1000);
