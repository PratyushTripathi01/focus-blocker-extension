chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.sync.get(["blockedSites", "focusMode"], (data) => {
      if (!data.focusMode) return; // If OFF, do nothing

      const sites = data.blockedSites || [];
      for (let blocked of sites) {
        if (tab.url.includes(blocked)) {
          chrome.tabs.update(tabId, { url: chrome.runtime.getURL("block.html") });
          break;
        }
      }
    });
  }
});

