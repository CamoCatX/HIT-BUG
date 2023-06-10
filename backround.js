// Listen for scroll events
window.addEventListener("scroll", function() {
  try {
    // Check if the page has scrolled to the top
    if (window.scrollY === 0) {
      // Scroll down by a small amount to prevent the page from sticking at the top
      window.scrollBy(0, 1);
    }
  } catch (error) {
    console.error("An error occurred while processing the scroll event:", error);
  }
});

// Add the lock overlay when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function() {
  try {
    addLockOverlay();
  } catch (error) {
    console.error("An error occurred while adding the lock overlay:", error);
  }
});

// Add a lock overlay to the active tab
function addLockOverlay() {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tabId = tabs[0]?.id;
      if (typeof tabId === 'number') {
        const fileUrl = chrome.runtime.getURL("overlay.css");
        if (typeof fileUrl === 'string') {
          chrome.tabs.insertCSS(tabId, { file: fileUrl }, function() {
            if (chrome.runtime.lastError) {
              console.error("An error occurred while adding the lock overlay:", chrome.runtime.lastError);
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("An error occurred while adding the lock overlay:", error);
  }
}

// Remove the lock overlay from the active tab
function removeLockOverlay() {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tabId = tabs[0]?.id;
      if (typeof tabId === 'number') {
        const fileUrl = chrome.runtime.getURL("overlay.css");
        if (typeof fileUrl === 'string') {
          chrome.tabs.removeCSS(tabId, { file: fileUrl }, function() {
            if (chrome.runtime.lastError) {
              console.error("An error occurred while removing the lock overlay:", chrome.runtime.lastError);
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("An error occurred while removing the lock overlay:", error);
  }
}
