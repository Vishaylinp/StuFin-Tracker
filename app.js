// app.js - Main application logic

// Use a single `DOMContentLoaded` listener for initial UI setup.
// This runs once the HTML is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired.");

    // Get references to DOM elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const dashboard = document.getElementById('dashboard');
    const transactionList = document.getElementById('transaction-list');
    const logoutButton = document.getElementById('logout-button');

    // Place the authentication listener inside DOMContentLoaded.
    // This acts as the central control for your app's state.
    window.auth.onAuthStateChanged((user) => {
        if (user) {
            // User is logged in! This is where we show the main dashboard.
            console.log("User is logged in:", user.email);
            // if (logoutButton) logoutButton.style.display = 'block'; // Show logout button
            if (dashboard) dashboard.style.display = 'block'; // Show dashboard
            if (loginForm) loginForm.style.display = 'none'; // Hide login form
            if (signupForm) signupForm.style.display = 'none'; // Hide signup form
            window.renderTransactionList('transaction-list');
            // Call a function to display the main app UI and fetch data.
            // For example: initDashboard(user);

        } else {
            // No user is logged in. This is where we show the login/signup page.
            console.log("No user is logged in.");
            // if (logoutButton) logoutButton.style.display = 'none'; // Hide logout button
            if (dashboard) dashboard.style.display = 'none'; // Hide dashboard
            if (loginForm) loginForm.style.display = 'block'; // Show login form
            if (signupForm) signupForm.style.display = 'block'; // Show signup form
            // Call a function to display the login/signup forms.
            // For example: showLoginForms();
        }
    });

    const authForm = document.getElementById('authForm');
    console.log("authForm element:", authForm);
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;
            
            // Add basic validation
            if (!email || !password) {
                console.error('Please fill in all fields');
                return;
            }

            // Determine intent based on button clicked or separate forms
            const result = await window.logIn(email, password);
            if (result.success) {
                console.log('Logged in successfully!');
                window.renderTransactionList('transaction-list');
            } else {
                console.error('Login failed:', result.error);
                // Let users explicitly choose to sign up
            }
        });
    }

    const signUpButton = document.getElementById('signUpButton');
    if (signUpButton) {
        signUpButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;

            if (!email || !password) {
                console.error('Please fill in all fields for sign up');
                return;
            }

            const result = await window.signUp(email, password);
            if (result.success) {
                console.log('Signed up successfully!');
                window.renderTransactionList('transaction-list');
            } else {
                console.error('Sign up failed:', result.error);
            }
        });
    }

    const transactionFormElement = document.getElementById('transactionForm');
    if (transactionFormElement) {
        transactionFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            const type = transactionFormElement.type.value;
            const amount = transactionFormElement.amount.value;
            const description = transactionFormElement.description.value;

            const result = await window.addTransaction(type, amount, description);
            if (result.success) {
                transactionFormElement.reset();
            } else {
                console.error('Failed to add transaction:', result.error);
            }
        });
    }

    // Removed duplicate DOM element references
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await window.auth.signOut();
                console.log("User signed out successfully.");
                // The onAuthStateChanged listener will handle UI updates
            } catch (error) {
                console.error("Error signing out:", error);
            }
        });
    }
});