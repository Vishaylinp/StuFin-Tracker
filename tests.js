// tests.js

// Helper function to log test results
function logTestResult(testName, passed) {
    if (passed) {
        console.log(`✅ ${testName}: Test Passed`);
    } else {
        console.error(`❌ ${testName}: Test Failed`);
    }
}

// --- Authentication Tests ---

// Test 1: User Signup
async function testUserSignup() {
    console.log("Running User Signup Test...");
    // This test requires manual interaction or a mock Firebase setup
    // For a real test, you would simulate a new user signing up
    // and then check if the user is logged in or if a user record is created.
    // Since we are not modifying app logic, we'll just log a placeholder.
    const email = `test-${Date.now()}@example.com`;
    const password = "password123";
    const result = await window.signUp(email, password);
    logTestResult("User Signup", result.success);
    if (result.success) {
        await firebase.auth().signOut(); // Clean up after signup
    }
}

// Test 2: User Login
async function testUserLogin() {
    console.log("Running User Login Test...");
    const email = "test@example.com"; // Assuming a test user exists or was created by signup test
    const password = "password123";

    // Ensure a user exists for login test (optional, but good for isolated testing)
    await window.signUp(email, password); // Try to sign up, if already exists, it will fail, but we can still try to login
    await firebase.auth().signOut();

    const result = await window.logIn(email, password);
    logTestResult("User Login", result.success);
    if (result.success) {
        await firebase.auth().signOut(); // Clean up after login
    }
}

// Test 3: User Logout
async function testUserLogout() {
    console.log("Running User Logout Test...");
    // First, ensure a user is logged in to test logout
    const email = "test@example.com";
    const password = "password123";
    await window.signUp(email, password);
    await window.logIn(email, password);

    await firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    logTestResult("User Logout", user === null);
}

// --- Transaction Tests ---

// Helper to get transaction list count
function getTransactionCount() {
    const transactionList = document.getElementById('transaction-list');
    return transactionList ? transactionList.children.length : 0;
}

// Helper to get current balance
function getCurrentBalance() {
    const balanceSpan = document.getElementById('balance');
    return balanceSpan ? parseFloat(balanceSpan.textContent.replace('$', '')) : 0;
}

// Test 4: Adding a transaction updates the transaction list
async function testAddTransactionUpdatesList() {
    console.log("Running Add Transaction Updates List Test...");
    const email = "test-transactions@example.com";
    const password = "password123";
    await window.signUp(email, password);
    await window.logIn(email, password);

    const initialCount = getTransactionCount();
    const transactionType = "income";
    const transactionAmount = 100;
    const transactionDescription = "Test Income";

    const addResult = await window.addTransaction(transactionType, transactionAmount, transactionDescription);

    // Wait for UI to update (Firestore snapshot listener)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay if needed

    const newCount = getTransactionCount();

    logTestResult("Add Transaction Updates List", addResult.success && newCount === initialCount + 1);

    // Clean up
    await firebase.auth().signOut();
}

// Test 5: Balance updates correctly after income or expense
async function testBalanceUpdatesCorrectly() {
    console.log("Running Balance Updates Correctly Test...");
    const email = "test-balance@example.com";
    const password = "password123";
    await window.signUp(email, password);
    await window.logIn(email, password);

    const initialBalance = getCurrentBalance();

    // Add income
    const incomeAmount = 200;
    await window.addTransaction("income", incomeAmount, "Test Income for Balance");
    await new Promise(resolve => setTimeout(resolve, 1000));
    const balanceAfterIncome = getCurrentBalance();

    // Add expense
    const expenseAmount = 50;
    await window.addTransaction("expense", expenseAmount, "Test Expense for Balance");
    await new Promise(resolve => setTimeout(resolve, 1000));
    const finalBalance = getCurrentBalance();

    const incomeTestPassed = balanceAfterIncome === initialBalance + incomeAmount;
    const expenseTestPassed = finalBalance === initialBalance + incomeAmount - expenseAmount;

    logTestResult("Balance Updates Correctly (Income)", incomeTestPassed);
    logTestResult("Balance Updates Correctly (Expense)", expenseTestPassed);

    // Clean up
    await firebase.auth().signOut();
}

// Test 6: Invalid inputs are handled properly
async function testInvalidInputs() {
    console.log("Running Invalid Inputs Test...");
    const email = "test-invalid@example.com";
    const password = "password123";
    await window.signUp(email, password);
    await window.logIn(email, password);

    // Test empty amount
    const emptyAmountResult = await window.addTransaction("income", "", "Empty Amount");
    logTestResult("Invalid Inputs (Empty Amount)", !emptyAmountResult.success);

    // Test invalid amount (non-numeric, though parseFloat might handle some)
    const invalidAmountResult = await window.addTransaction("income", "abc", "Invalid Amount");
    logTestResult("Invalid Inputs (Non-numeric Amount)", !invalidAmountResult.success);

    // Test invalid type (assuming only 'income' and 'expense' are valid)
    const invalidTypeResult = await window.addTransaction("invalidType", 100, "Invalid Type");
    logTestResult("Invalid Inputs (Invalid Type)", !invalidTypeResult.success);

    // Clean up
    await firebase.auth().signOut();
}

// Run all tests
async function runAllTests() {
    console.log("--- Running All Tests ---");
    await testUserSignup();
    await testUserLogin();
    await testUserLogout();
    await testAddTransactionUpdatesList();
    await testBalanceUpdatesCorrectly();
    await testInvalidInputs();
    console.log("--- All Tests Finished ---");
}

// Call to run tests when the page loads
// You might want to trigger this manually or on a specific event in a real scenario
// For now, we'll just make it available to call from the console.
// window.onload = runAllTests; // Uncomment to run on page load