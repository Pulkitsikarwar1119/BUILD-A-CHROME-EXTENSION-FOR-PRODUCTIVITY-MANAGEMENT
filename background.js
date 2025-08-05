const blockedSites = ["youtube.com", "facebook.com"];
let currentTabId = null;
let activeStartTime = null;
let activeDomain = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await logTime();
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    trackTab(tab);
  }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    await logTime();
    activeDomain = null;
  }
});

function trackTab(tab) {
  try {
    const domain = new URL(tab.url).hostname;

    if (blockedSites.some(site => domain.includes(site))) {
      chrome.tabs.update(tab.id, { url: "about:blank" });
      return;
    }

    currentTabId = tab.id;
    activeStartTime = Date.now();
    activeDomain = domain;
  } catch (e) {
    console.error("Invalid URL or missing:", e);
  }
}

async function logTime() {
  if (!activeDomain || !activeStartTime) return;

  const endTime = Date.now();
  const timeSpent = Math.floor((endTime - activeStartTime) / 1000);

  const result = await chrome.storage.local.get([activeDomain]);
  const existingLogs = result[activeDomain] || [];

  const newLog = {
    start: activeStartTime,
    end: endTime,
    duration: timeSpent,
    userId: "user1"
  };

  const updatedLogs = [...existingLogs, newLog];
  await chrome.storage.local.set({ [activeDomain]: updatedLogs });

  // Sync with backend
  fetch("http://localhost:5000/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLog),
  }).catch(err => console.error("Sync failed:", err));

  console.log(`Synced ${timeSpent}s for ${activeDomain}`);
}
