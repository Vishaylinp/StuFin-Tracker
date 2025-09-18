import { db } from "../services/firebase.js";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const addTransaction = async (type, amount, description) => {
  try {
    await addDoc(collection(db, "transactions"), {
      type,
      amount: parseFloat(amount),
      description,
      timestamp: Timestamp.now(),
    });
    console.log("Transaction added!");
    return { success: true };
  } catch (error) {
    console.error("Error adding transaction: ", error);
    return { success: false, error: error.message };
  }
};