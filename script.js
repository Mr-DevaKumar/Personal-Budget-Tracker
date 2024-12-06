// Hardcoded username and password (for demo purposes)
const USERNAME = "user123";
const PASSWORD = "password123";

// Elements
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// Handle login form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    // Check if the entered credentials match the hardcoded ones
    if (enteredUsername === USERNAME && enteredPassword === PASSWORD) {
        // Login successful: Redirect to dashboard.html
        window.location.href = "index.html"; // Redirect to the next page (dashboard)
    } else {
        // Login failed: Show error message
        loginError.style.display = "block";
    }
});
