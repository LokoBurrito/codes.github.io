
function generateKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let key = '';
    for (let i = 0; i < 16; i++) { // Length of the key
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }
    return key;
}

// Update the key on page load
window.onload = function() {
    const keyElement = document.getElementById("key");
    keyElement.textContent = generateKey();
}
