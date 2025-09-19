// app.js - Main application logic
// Place the authentication listener at the top level of the script.
// This acts as the central control for your app's state.
window.auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in! This is where we show the main dashboard.
        console.log("User is logged in:", user.email);
        window.renderTransactionList('transaction-list');
        // Call a function to display the main app UI and fetch data.
        // For example: initDashboard(user);

    } else {
        // No user is logged in. This is where we show the login/signup page.
        console.log("No user is logged in.");
        
        // Call a function to display the login/signup forms.
        // For example: showLoginForms();
    }
});

// Use a single `DOMContentLoaded` listener for initial UI setup.
// This runs once the HTML is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired.");
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

    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const type = transactionForm.type.value;
            const amount = transactionForm.amount.value;
            const description = transactionForm.description.value;

            const result = await window.addTransaction(type, amount, description);
            if (result.success) {
                transactionForm.reset();
            } else {
                console.error('Failed to add transaction:', result.error);
            }
        });
    }
});