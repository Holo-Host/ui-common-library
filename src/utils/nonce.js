export const generateB64Nonce = () => {
    const nonceLength = 16;
    const nonceArray = new Uint8Array(nonceLength);

    if (window.crypto === undefined || window.crypto.getRandomValues === undefined) {
        const crypto = require('crypto');

        Object.defineProperty(globalThis, 'crypto', {
        value: {
            getRandomValues: arr => crypto.randomBytes(arr.length)
        }
        })
    } else {
        window.crypto.getRandomValues(nonceArray);
    }
    

    // Encode the nonce in Base64
    const base64Nonce = window.btoa(String.fromCharCode(...nonceArray));

    return base64Nonce;
}