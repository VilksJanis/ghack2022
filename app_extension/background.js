chrome.webNavigation.onDOMContentLoaded.addListener(({ tabId, frameId }) => {
    if (frameId != 0) return;
    
    // Injecting a javascript file into the website
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["inject.js"]
    })
  })