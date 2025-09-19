
 const addTransaction = async (type, amount, description) => {
  try {
    await firebase.firestore().collection("transactions").add({
      type,
      amount: parseFloat(amount),
      description,
      timestamp: firebase.firestore.Timestamp.now(),
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