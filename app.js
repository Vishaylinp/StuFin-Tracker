// app.js - Main application logic

import { auth } from './services/firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { signUp, logIn } from './services/auth.js';
import { addTransaction } from './components/form.js';

// Place the authentication listener at the top level of the script.
// This acts as the central control for your app's state.
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in! This is where we show the main dashboard.
        console.log("User is logged in:", user.email);
        
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
    console.log('StuFin Tracker app loaded!');

    const authForm = document.getElementById('authForm');
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
            const result = await logIn(email, password);
            if (result.success) {
                console.log('Logged in successfully!');
            } else {
                console.error('Login failed:', result.error);
                // Let users explicitly choose to sign up
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

            const result = await addTransaction(type, amount, description);
            if (result.success) {
                transactionForm.reset();
            } else {
                console.error('Failed to add transaction:', result.error);
            }
        });
    }
});