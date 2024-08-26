chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startAutomation') {
        // Query the currently active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id !== undefined) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['dist/content.js'],
                });
            } else {
                console.error('No active tab found.');
            }
        });
    }
});
