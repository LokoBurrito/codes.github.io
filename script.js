// Function to generate a random key
function generateKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) { // Length of the key
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }
    return key;
}

// Function to simulate typing effect
function typeKey(key) {
    let index = 0;
    const keyElement = document.getElementById("key");
    const underscoreElement = document.querySelector('.underscore');
    
    // Set the interval for the typing effect (character by character)
    const typingInterval = setInterval(() => {
        // Add one character at a time
        keyElement.textContent += key.charAt(index);
        index++;

        // Move the underscore to the next character position
        if (index <= key.length) {
            underscoreElement.style.display = 'inline';  // Show the underscore
        } else {
            clearInterval(typingInterval); // Stop when the entire key is typed
        }
    }, 100); // Adjust this value for faster/slower typing
}

// Wait for the page to load, then generate and display the key
window.onload = function() {
    const generatedKey = generateKey(); // Generate a random key
    typeKey(generatedKey); // Start typing the key character by character
};
