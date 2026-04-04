import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

/*
  Todo Service Layer
  ------------------
  Separates Firestore logic from components
  for better architecture and scalability.
*/

export async function createTodo(todo) {
  return await addDoc(collection(db, "todos"), todo);
}
