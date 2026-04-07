import { useState, useEffect, useMemo, useRef } from "react";
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

  const sectionRefs = useRef([]);

  // Animate sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => {
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  // Fetch user plan
  useEffect(() => {
    async function fetchPlan() {
      const userPlan = await getUserPlan();
      setPlan(userPlan);
    }
    fetchPlan();
  }, []);

  // Fetch todos from Firebase
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

  // Debounced search
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
    // Save to LocalStorage as backup
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  }

  return (
    <div className={`flex min-h-screen flex-col md:flex-row transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
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
          {[StatsPanel, StatsChart, CalendarView, TodoList, TodoInput].map((Component, i) => (
            <div
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              className="hidden p-6 bg-white dark:bg-slate-900 rounded-2xl shadow hover:shadow-lg transition"
            >
              {i === 0 && <StatsPanel todos={todos} />}
              {i === 1 && <StatsChart todos={todos} />}
              {i === 2 && <CalendarView todos={todos} />}
              {i === 3 && (loading ? <p
                className="
                  text-center text-gray-500 dark:text-gray-400
                "
              >Loading...</p> : <TodoList todos={filteredTodos} />)}
              {i === 4 && <TodoInput addTodo={handleAddTodo} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}