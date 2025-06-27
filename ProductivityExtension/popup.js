// ---------- Task List ----------
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function renderTasks(tasks = []) {
  taskList.innerHTML = "";
  tasks.forEach((t, idx) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");
    li.textContent = t.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = () => removeTask(idx);

    li.onclick = (e) => {
      if (e.target !== delBtn) toggleDone(idx);
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks(tasks) {
  chrome.storage.local.set({ tasks });
}

function addTask() {
  if (!taskInput.value.trim()) return;
  chrome.storage.local.get("tasks", (res) => {
    const tasks = res.tasks || [];
    tasks.push({ text: taskInput.value.trim(), done: false });
    saveTasks(tasks);
    renderTasks(tasks);
    taskInput.value = "";
  });
}

function removeTask(idx) {
  chrome.storage.local.get("tasks", (res) => {
    const tasks = res.tasks || [];
    tasks.splice(idx, 1);
    saveTasks(tasks);
    renderTasks(tasks);
  });
}

function toggleDone(idx) {
  chrome.storage.local.get("tasks", (res) => {
    const tasks = res.tasks || [];
    tasks[idx].done = !tasks[idx].done;
    saveTasks(tasks);
    renderTasks(tasks);
  });
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// On popup load
chrome.storage.local.get("tasks", (res) => renderTasks(res.tasks || []));

// ---------- Pomodoro ----------
const display = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startPomodoro");
const stopBtn = document.getElementById("stopPomodoro");

let countdown;
const POMODORO_SEC = 25 * 60;

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function startTimer() {
  let seconds = POMODORO_SEC;
  display.textContent = format(seconds);
  startBtn.disabled = true;

  chrome.runtime.sendMessage({
    action: "start-alarm",
    when: Date.now() + seconds * 1000,
  });

  countdown = setInterval(() => {
    seconds--;
    display.textContent = format(seconds);
    if (seconds <= 0) stopTimer(true);
  }, 1000);
}

function stopTimer(isFinished = false) {
  clearInterval(countdown);
  startBtn.disabled = false;
  display.textContent = "25:00";

  chrome.runtime.sendMessage({ action: "clear-alarm" });

  if (isFinished) {
    chrome.runtime.sendMessage({ action: "notify-done" });
  }
}

startBtn.onclick = startTimer;
stopBtn.onclick = () => stopTimer(false);

// ---------- Theme (Light / Dark) ----------
const themeSwitch = document.getElementById("themeSwitch");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeSwitch.checked = isDark;
}

function saveTheme(isDark) {
  chrome.storage.local.set({ darkMode: isDark });
}

// Load saved theme preference on popup open
chrome.storage.local.get("darkMode", (result) => {
  const isDarkMode = result.darkMode === true;
  applyTheme(isDarkMode);
});

// Listen for user toggle
themeSwitch.addEventListener("change", () => {
  const isDark = themeSwitch.checked;
  applyTheme(isDark);
  saveTheme(isDark);
});
