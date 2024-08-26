document.getElementById('start')?.addEventListener('click', () => {
    const codes = (document.getElementById('codes') as HTMLTextAreaElement).value
        .split('\n')
        .filter(code => code.trim() !== '');

    if (codes.length > 0) {
        chrome.storage.local.set({ codes: codes }, () => {
            chrome.runtime.sendMessage({ action: 'startAutomation' });
        });
    } else {
        const status = document.getElementById('status') as HTMLParagraphElement;
        status.textContent = 'Please enter some codes!';
    }
});
