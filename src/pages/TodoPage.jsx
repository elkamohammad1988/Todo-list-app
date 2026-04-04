import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

import Navbar from "../components/Navbar";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import StatsPanel from "../components/StatsPanel";

export default function TodoPage({ dark, toggleDark }) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

  // Load todos from Firestore
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoData);
    });

    return () => unsubscribe();
  }, []);

  // Add Todo
  async function addTodo(task, time, category) {
    if (!task) return;

    await addDoc(collection(db, "todos"), {
      task,
      time,
      category,
      done: false,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    });
  }

  // Search Filter
  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="
        min-h-screen
        bg-linear-to-br from-blue-100 dark:from-gray-900
        to-purple-200 dark:to-gray-800
        transition-colors duration-300
      "
    >
      <Navbar dark={dark} toggleDark={toggleDark} />

      <div
        className="
          max-w-4xl
          p-6 mx-auto
        "
      >
        {/* Stats */}
        <StatsPanel todos={todos} />

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Add Task */}
        <TodoInput addTodo={addTodo} />

        {/* Todo List */}
        <TodoList todos={filteredTodos} />
      </div>
    </div>
  );
}
