import { create } from "zustand";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

/*
  Global store for managing todos state with Firestore sync
*/
export const useTodoStore = create((set, get) => ({
  todos: [],

  // Set all todos
  setTodos: (todos) => set({ todos }),

  // Add todo locally and in Firestore
  addTodo: async (todo) => {
    if (!auth.currentUser) throw new Error("User not authenticated");

    const newTodo = {
      ...todo,
      done: false,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    };

    // Optimistic update
    set((state) => ({ todos: [newTodo, ...state.todos] }));

    try {
      const docRef = await addDoc(collection(db, "todos"), newTodo);
      // Update with Firestore ID
      get().updateTodo(newTodo.tempId || newTodo.id, { id: docRef.id });
    } catch (error) {
      alert("Failed to add todo: " + error.message);
      // Rollback
      get().deleteTodo(newTodo.id);
    }
  },

  // Update todo locally and optionally in Firestore
  updateTodo: async (id, updatedData) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t,
      ),
    }));

    if (!auth.currentUser) return;

    try {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      alert("Failed to update todo: " + error.message);
    }
  },

  // Delete todo locally and in Firestore
  deleteTodo: async (id) => {
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));

    if (!auth.currentUser) return;

    try {
      const docRef = doc(db, "todos", id);
      await deleteDoc(docRef);
    } catch (error) {
      alert("Failed to delete todo: " + error.message);
    }
  },

  // Clear all todos (e.g., on logout)
  clearTodos: () => set({ todos: [] }),
}));
