import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

/**
 * Create a new Todo for the current user
 * @param {Object} todo - { task, time, category, done }
 * @returns {Promise<Object>} - created todo with id
 */
export async function createTodo(todo) {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const newTodo = {
    ...todo,
    done: todo.done || false,
    userId: auth.currentUser.uid,
    createdAt: new Date(),
  };

  const docRef = await addDoc(collection(db, "todos"), newTodo);

  return { id: docRef.id, ...newTodo };
}
