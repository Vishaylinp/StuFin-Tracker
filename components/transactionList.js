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

const renderTransactionList = (containerId) => {
  const container = document.getElementById(containerId);
  const balanceSpan = document.getElementById('balance');

  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  const q = window.db.collection("transactions").orderBy("timestamp", "desc");

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