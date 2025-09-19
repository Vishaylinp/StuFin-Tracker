
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