// Add a site to the blocklist
document.getElementById("addBtn").addEventListener("click", () => {
  const site = document.getElementById("siteInput").value.trim();
  if (site) {
    chrome.storage.sync.get(["blockedSites"], (data) => {
      const sites = data.blockedSites || [];
      if (!sites.includes(site)) {
        sites.push(site);
        chrome.storage.sync.set({ blockedSites: sites }, () => {
          document.getElementById("siteInput").value = "";
          showSites();
        });
      }
    });
  }
});

// Display all blocked sites with ❌ remove buttons
function showSites() {
  chrome.storage.sync.get(["blockedSites"], (data) => {
    const list = document.getElementById("blockedList");
    list.innerHTML = "";
    const sites = data.blockedSites || [];

    sites.forEach((site, index) => {
      const li = document.createElement("li");

      // Create site name span
      const siteSpan = document.createElement("span");
      siteSpan.textContent = site;
      siteSpan.className = "site-name";

      // Create remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => {
        sites.splice(index, 1);
        chrome.storage.sync.set({ blockedSites: sites }, () => {
          showSites();
        });
      });

      // Append to list
      li.appendChild(siteSpan);
      li.appendChild(removeBtn);
      list.appendChild(li);
    });
  });
}

showSites(); // Load sites when popup opens

// ========== Focus Mode Toggle Logic ==========

// Reference to the toggle checkbox
const focusToggle = document.getElementById("focusToggle");

// Save toggle state to Chrome storage
focusToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ focusMode: focusToggle.checked });
});

// Load and set toggle state when popup opens
function initializeToggle() {
  chrome.storage.sync.get(["focusMode"], (data) => {
    focusToggle.checked = data.focusMode ?? true; // Default ON
  });
}

initializeToggle();

