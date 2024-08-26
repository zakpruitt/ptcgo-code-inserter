chrome.storage.local.get('codes', data => {
    const codes: string[] = data.codes || [];
    const batchSize = 10;
    let currentIndex = 0;

    function enterAndSubmitCodes() {
        if (currentIndex >= codes.length) {
            alert('All codes have been entered and submitted.');
            return;
        }

        const batch = codes.slice(currentIndex, currentIndex + batchSize);
        const inputFields = document.querySelectorAll<HTMLInputElement>('input[type="text"]');

        batch.forEach((code, index) => {
            if (inputFields[index]) {
                inputFields[index].value = code;
            }
        });

        const submitButton = document.querySelector<HTMLInputElement>('input[type="submit"]');
        if (submitButton) {
            submitButton.click();
        }

        currentIndex += batchSize;
        setTimeout(enterAndSubmitCodes, 5000);
    }

    enterAndSubmitCodes();
});
