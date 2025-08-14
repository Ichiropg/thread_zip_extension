
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            if (typeof saveThreadAsZip === "function") {
                saveThreadAsZip();
            } else {
                alert("ZIP保存関数が見つかりません。ページを再読み込みしてください。");
            }
        }
    });
});
