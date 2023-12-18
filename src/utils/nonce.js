export const generateB64Nonce = () => {
    const nonceLength = 16;
    const nonceArray = new Uint8Array(nonceLength);
    window.crypto.getRandomValues(nonceArray);

    // Encode the nonce in Base64
    const base64Nonce = window.btoa(String.fromCharCode(...nonceArray));

    return base64Nonce;
}