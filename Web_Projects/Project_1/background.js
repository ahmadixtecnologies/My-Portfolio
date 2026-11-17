// Smart Dost service worker. Storage is shared by extension pages in the same Chrome profile.
chrome.runtime.onInstalled.addListener(async () => {
  const defaults = {
    notes: "",
    tasks: [],
    shortcuts: [
      { name: "Google", url: "https://www.google.com" },
      { name: "YouTube", url: "https://www.youtube.com" },
      { name: "GitHub", url: "https://github.com" }
    ],
    prompts: [
      { title: "Learn a topic", text: "Explain [topic] in simple steps, with examples and a short quiz." },
      { title: "Improve writing", text: "Improve this text for clarity and grammar while keeping my meaning: [paste text]" },
      { title: "Project ideas", text: "Suggest 10 practical beginner-friendly project ideas for [technology]." }
    ],
    clipboardHistory: [],
    darkMode: true,
    clipboardEnabled: false
  };
  const existing = await chrome.storage.local.get(Object.keys(defaults));
  const missing = {};
  for (const [key, value] of Object.entries(defaults)) {
    if (existing[key] === undefined) missing[key] = value;
  }
  if (Object.keys(missing).length) await chrome.storage.local.set(missing);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "OPEN_DASHBOARD") {
    chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
    sendResponse({ ok: true });
  }
  return true;
});