function updateRules() {
    chrome.storage.sync.get(["redirectEnabled", 'file_name', 'folder', 'redirect_to'], function (data) {
      if (!data.redirectEnabled) {
        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
        return;
      }
      
      const newRule = {
        "id": 1,
        "priority": 1,
        "action": {
          "type": "redirect",
          "redirect": { "regexSubstitution": `${data.redirect_to}/\\1` }
        },
        "condition": {
          "regexFilter": `${data.folder}/(${data.file_name})`,
          "resourceTypes": ["script", "stylesheet"]
        }
      };
      
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [newRule],
        removeRuleIds: [1]
      });
    });
}

chrome.storage.onChanged.addListener(updateRules);
chrome.runtime.onInstalled.addListener(updateRules);