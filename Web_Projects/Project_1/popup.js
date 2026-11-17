const $ = (id) => document.getElementById(id);
async function load() {
  const data = await chrome.storage.local.get(["notes","tasks","darkMode"]);
  document.body.classList.toggle("app-light", data.darkMode === false);
  $("quickNote").value = data.notes || "";
  renderTasks(data.tasks || []);
}
function renderTasks(tasks) {
  const pending = tasks.filter(t => !t.done);
  $("taskCount").textContent = `${pending.length} pending`;
  $("taskPreview").innerHTML = "";
  if (!pending.length) { $("taskPreview").innerHTML = '<div class="muted small">No pending tasks. Open dashboard to add one.</div>'; return; }
  pending.slice(0,3).forEach(t => {
    const label = document.createElement("div"); label.className = "task-preview";
    const text = document.createElement("span"); text.textContent = t.text;
    label.append(text); $("taskPreview").append(label);
  });
}
let saveTimer;
$("quickNote").addEventListener("input", () => {
  $("saveState").textContent = "Saving…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await chrome.storage.local.set({notes:$("quickNote").value});
    $("saveState").textContent = "Saved locally";
  }, 250);
});
$("openDashboard").addEventListener("click", () => chrome.runtime.sendMessage({type:"OPEN_DASHBOARD"}));
$("settingsBtn").addEventListener("click", () => chrome.tabs.create({url:chrome.runtime.getURL("settings.html")}));
document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => chrome.tabs.create({url:chrome.runtime.getURL("dashboard.html")+"#"+b.dataset.open})));
chrome.storage.onChanged.addListener((changes) => { if (changes.tasks) renderTasks(changes.tasks.newValue || []); if (changes.darkMode) document.body.classList.toggle("app-light", changes.darkMode.newValue === false); });
load();