
/**
 * Adds a new transaction to Firestore.
 *
 * @param {string} type - The type of the transaction (e.g., "income", "expense").
 * @param {number} amount - The amount of the transaction.
 * @param {string} description - A description of the transaction.
 * @returns {object} An object indicating success or failure, and an error message if applicable.
 * @sideEffects - Adds a document to the "transactions" collection in Firestore.
 *                Logs messages to the console.
 */
const addTransaction = async (type, amount, description) => {
  try {
    const user = window.auth.currentUser;
    if (!user) {
      throw new Error("No user logged in. Cannot add transaction.");
    }

    await firebase.firestore().collection("transactions").add({
      type,
      amount: parseFloat(amount),
      description,
      timestamp: firebase.firestore.Timestamp.now(),
      uid: user.uid, // Add user's UID
    });
    console.log("Transaction added!");
    return { success: true };
  } catch (error) {
    console.error("Error adding transaction: ", error);
    return { success: false, error: error.message };
  }
};

// Make the function globally accessible
window.addTransaction = addTransaction;