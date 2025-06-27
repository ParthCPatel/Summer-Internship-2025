// Handles alarms & notifications for Pomodoro
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "start-alarm") {
    chrome.alarms.create("pomodoroDone", { when: msg.when });
  } else if (msg.action === "clear-alarm") {
    chrome.alarms.clear("pomodoroDone");
  } else if (msg.action === "notify-done") {
    fireNotification();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroDone") fireNotification();
});

function fireNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: "Pomodoro finished!",
    message: "Great job! Time for a break.",
    priority: 2,
  });
}
