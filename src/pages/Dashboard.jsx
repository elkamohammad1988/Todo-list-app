import { useState, useEffect, useMemo } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useTodoStore } from "../store/useTodoStore";
import { getUserPlan, isPro } from "../utils/plan";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import StatsPanel from "../components/StatsPanel";
import CalendarView from "../components/CalendarView";
import StatsChart from "../components/StatsChart";

export default function Dashboard({ dark, toggleDark }) {
  const { todos, setTodos, addTodo } = useTodoStore();

  const [plan, setPlan] = useState("free");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      const userPlan = await getUserPlan();
      setPlan(userPlan);
    }
    fetchPlan();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTodos([]);
        setLoading(false);
        return;
      }
      const q = query(collection(db, "todos"), where("userId", "==", user.uid));
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTodos(list);
        setLoading(false);
      });
      return () => unsubscribeSnapshot();
    });
    return () => unsubscribeAuth();
  }, [setTodos]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredTodos = useMemo(
    () => todos.filter((todo) => todo.task.toLowerCase().includes(debouncedSearch.toLowerCase())),
    [todos, debouncedSearch]
  );

  async function handleAddTodo(task, time, category) {
    if (!task?.trim() || !auth.currentUser) return;
    if (!isPro(plan) && todos.length >= 5) {
      alert("Free plan limit reached. Upgrade to Pro 🚀");
      return;
    }
    const newTodo = {
      id: crypto.randomUUID(),
      task,
      time,
      category,
      done: false,
      userId: auth.currentUser.uid,
      createdAt: Date.now(),
    };
    addTodo(newTodo);
    await addDoc(collection(db, "todos"), newTodo);
  }

  return (
    <div
      className={`
        flex min-h-screen flex-col md:flex-row
        transition-colors duration-300
        ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
      `}
    >
      <div className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}>
        <Sidebar collapsed={!sidebarOpen} dark={dark} />
      </div>

      <div
        className="
          flex-1 flex flex-col
        "
      >
        <Navbar
          dark={dark}
          toggleDark={toggleDark}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          search={search}
          setSearch={setSearch}
          plan={plan}
        />

        <div
          className="
            max-w-7xl
            mx-auto p-6 space-y-8
          "
        >
          <StatsPanel todos={todos} />

          <div
            className="
              p-6
              bg-white dark:bg-slate-900
              rounded-2xl
              shadow hover:shadow-lg transition
            "
          >
            <StatsChart todos={todos} />
          </div>

          <div
            className="
              p-6
              bg-white dark:bg-slate-900
              rounded-2xl
              shadow hover:shadow-lg transition
            "
          >
            <CalendarView todos={todos} />
          </div>

          <div
            className="
              min-h-[300px]
              p-6
              bg-white dark:bg-slate-900
              rounded-2xl
              shadow hover:shadow-lg transition
            "
          >
            {loading ? <p
              className="
                text-center text-gray-500 dark:text-gray-400
              "
            >Loading...</p> : <TodoList todos={filteredTodos} />}
          </div>

          <div
            className="
              p-6
              bg-white dark:bg-slate-900
              rounded-2xl
              shadow hover:shadow-lg transition
            "
          >
            <TodoInput addTodo={handleAddTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}