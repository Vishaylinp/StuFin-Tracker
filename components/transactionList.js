/**
 * @file Manages the display and calculation of financial transactions.
 * @author [Your Name/Team Name]
 */

/**
 * Calculates the net balance from a list of transactions.
 *
 * @param {Array<object>} transactions - An array of transaction objects, each with 'type' (income/expense) and 'amount' properties.
 * @returns {number} The calculated net balance.
 */
const calculateBalance = (transactions) => {
  let balance = 0;
  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      balance += transaction.amount;
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount;
    }
  });
  return balance;
};

/**
 * Renders a list of transactions to a specified container and updates the balance display.
 *
 * @param {string} containerId - The ID of the HTML element where the transaction list will be rendered.
 * @sideEffects - Modifies the DOM by adding transaction list items and updating the balance display.
 *                Fetches transaction data from Firestore based on the current user's UID.
 *                Logs errors to the console if the container is not found or no user is logged in.
 */
const renderTransactionList = (containerId) => {
  const container = document.getElementById(containerId);
  const balanceSpan = document.getElementById('balance');

  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  const user = window.auth.currentUser;
  if (!user) {
    console.error("No user logged in. Cannot render transaction list.");
    container.innerHTML = ""; // Clear any existing list items if user logs out
    if (balanceSpan) {
      balanceSpan.textContent = "$0.00"; // Reset balance
    }
    return;
  }

  const q = window.db.collection("transactions").where("uid", "==", user.uid).orderBy("timestamp", "desc");

  q.onSnapshot((snapshot) => {
    container.innerHTML = ""; // Clear existing list items
    const transactions = [];
    snapshot.forEach((doc) => {
      const transaction = doc.data();
      transactions.push(transaction);
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center";
      listItem.innerHTML = `
        <div>
          ${transaction.description} (<span class="text-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.type}</span>)
        </div>
        <span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'} rounded-pill">$${transaction.amount.toFixed(2)}</span>
      `;
      container.appendChild(listItem);
    });

    // Update balance
    if (balanceSpan) {
      const currentBalance = calculateBalance(transactions);
      balanceSpan.textContent = `$${currentBalance.toFixed(2)}`;
    }
  });
};

// Make function globally accessible
window.renderTransactionList = renderTransactionList;