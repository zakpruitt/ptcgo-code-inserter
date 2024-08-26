chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startAutomation') {
        chrome.scripting.executeScript({
            target: { tabId: sender!.tab!.id! },
            files: ['dist/content.js'],
        });
    }
});
