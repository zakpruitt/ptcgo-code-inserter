document.getElementById('start')?.addEventListener('click', () => {
    const codes = (document.getElementById('codes') as HTMLTextAreaElement).value
        .split('\n')
        .filter(code => code.trim() !== '');

    const status = document.getElementById('status') as HTMLParagraphElement;
    if (codes.length > 0) {
        chrome.storage.local.set({ codes: codes }, () => {
            chrome.runtime.sendMessage({ action: 'startAutomation' });
        });
        // codes.forEach((code) => {
        //     status.textContent += code + '\n';
        // })
    } else {
        status.textContent = 'Please enter some codes!';
    }
});
