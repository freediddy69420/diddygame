chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("diddygame-9c3dcabbabc277935bd61b5601bf61fa6807d6c1/index.html") });
});