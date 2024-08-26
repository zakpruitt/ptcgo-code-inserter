chrome.storage.local.get('codes', data => {
    const codes: string[] = data.codes || [];
    const batchSize = 10;
    let currentIndex = 0;

    function enterAndSubmitCodes() {
        if (currentIndex >= codes.length) {
            alert('All codes have been entered and submitted.');
            return;
        }

        // Get the current batch of codes
        const batchEnd = Math.min(currentIndex + batchSize, codes.length);
        const code = codes[currentIndex];
        const inputField = document.querySelector<HTMLInputElement>('input#code');
        const submitButton = document.querySelector<HTMLButtonElement>('button[data-testid="verify-code-button"]');

        if (inputField && submitButton) {
            // Set the value of the input field to the current code
            inputField.value = code;

            // Dispatch input events to ensure the form recognizes the new input value
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
            inputField.dispatchEvent(new Event('change', { bubbles: true }));

            // Trigger the submit button click using a more realistic event
            submitButton.dispatchEvent(new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            }));

            // Increment to the next code
            currentIndex++;

            if (currentIndex % batchSize === 0 || currentIndex >= codes.length) {
                // After every batch of 10 codes or at the end of the list, click the redeem button
                setTimeout(clickRedeemButton, 2000); // Delay before clicking the redeem button
            } else {
                // Wait a bit before submitting the next code to avoid overwhelming the server
                setTimeout(enterAndSubmitCodes, 2000); // 2-second delay between submissions
            }
        } else {
            console.error('Input field or submit button not found.');
        }
    }

    function clickRedeemButton() {
        const redeemButton = document.querySelector<HTMLButtonElement>('button[data-testid="button-redeem"]');

        if (redeemButton && !redeemButton.disabled) {
            redeemButton.dispatchEvent(new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            }));

            // Continue with the next batch after a delay
            setTimeout(enterAndSubmitCodes, 5000); // 5-second delay to wait for the redemption to process
        } else {
            console.error('Redeem button not found or disabled.');
            // Retry clicking the redeem button after a delay if it's disabled or not found
            setTimeout(clickRedeemButton, 2000);
        }
    }

    enterAndSubmitCodes();
});
