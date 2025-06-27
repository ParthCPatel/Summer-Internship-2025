// Very simple site blocker overlay.
// Expand the array or load it from chrome.storage later.
const blockedDomains = ["youtube.com", "facebook.com", "instagram.com"];

if (blockedDomains.some((d) => location.hostname.includes(d))) {
  const style = document.createElement("style");
  style.innerHTML = `
      body { margin:0 !important; }
      #pm-blocker {
        font-family: Arial, sans-serif;
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background:#fdfdfd;
        z-index: 999999;
        text-align:center;
      }
      #pm-blocker h1 { color:#0066cc; margin-bottom:8px; }
      #pm-blocker p { color:#555; }
    `;
  document.documentElement.appendChild(style);

  const blocker = document.createElement("div");
  blocker.id = "pm-blocker";
  blocker.innerHTML = `
      <h1>Stay Productive!</h1>
      <p>This site is blocked during focus time.</p>
    `;
  document.documentElement.appendChild(blocker);
}
