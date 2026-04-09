import { useState, useEffect, useMemo, useRef } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  const { todos, setTodos } = useTodoStore();
  const [plan, setPlan] = useState("free");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sectionRefs = useRef([]);

  // Inject fade-in CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .fade-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      .fade-section.show {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e =>
          e.target.classList.toggle("show", e.isIntersecting)
        ),
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => sectionRefs.current.forEach(ref => ref && observer.unobserve(ref));
  }, []);

  // Fetch user plan
  useEffect(() => {
    (async () => {
      try {
        setPlan(await getUserPlan());
      } catch (err) {
        console.error("Failed to fetch user plan:", err);
      }
    })();
  }, []);

  // Auth + Firestore
  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      unsubscribeSnapshot();
      if (!user) {
        setTodos([]);
        setLoading(false);
        return;
      }
      const q = query(collection(db, "todos"), where("userId", "==", user.uid));
      unsubscribeSnapshot = onSnapshot(
        q,
        snap => {
          setTodos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
          setLoading(false);
        },
        err => console.error("Firestore error:", err)
      );
    });
    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, [setTodos]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filteredTodos = useMemo(
    () =>
      todos.filter(
        t =>
          t.task &&
          t.task.toLowerCase().includes(debouncedSearch.toLowerCase())
      ),
    [todos, debouncedSearch]
  );

  async function handleAddTodo(task, time, category) {
    if (!task?.trim() || !auth.currentUser) return;

    if (!isPro(plan) && todos.length >= 5) {
      alert("Free plan limit reached. Upgrade to Pro 🚀");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        task,
        time,
        category,
        done: false,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        createdAtLocal: Date.now(),
      });
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  }

  const sections = [
    { comp: <StatsPanel todos={todos} dark={dark} /> },
    { comp: <StatsChart todos={todos} dark={dark} /> },
    { comp: <CalendarView todos={todos} dark={dark} /> },
    {
      comp: loading ? (
        <div
          className="
            space-y-2
            animate-pulse
          "
        >
          <div
            className="
              h-4 w-3/4
              bg-gray-700
              rounded
            "
          ></div>
          <div
            className="
              h-4 w-1/2
              bg-gray-700
              rounded
            "
          ></div>
          <div
            className="
              h-4 w-5/6
              bg-gray-700
              rounded
            "
          ></div>
        </div>
      ) : (
        <TodoList todos={filteredTodos} dark={dark} />
      ),
    },
    { comp: <TodoInput addTodo={handleAddTodo} dark={dark} /> },
  ];

  return (
    <div
      style={{ backgroundColor: dark ? "#0f1117" : "#f7f7f7" }}
      className="
        flex
        min-h-screen
        text-white
      "
    >
      {/* Sidebar */}
      <div
        style={{ width: sidebarOpen ? 220 : 64 }}
        className="
          flex-shrink-0 overflow-hidden
          transition-all duration-300
        "
      >
        <Sidebar collapsed={!sidebarOpen} dark={dark} />
      </div>

      {/* Main */}
      <div
        className="
          flex-1 flex flex-col overflow-hidden
        "
      >
        <Navbar
          dark={dark}
          toggleDark={toggleDark}
          toggleSidebar={() => setSidebarOpen(v => !v)}
          search={search}
          setSearch={setSearch}
          plan={plan}
        />

        <div
          className="
            flex-1 overflow-y-auto
            p-5 space-y-4
          "
        >
          {sections.map(({ comp }, i) => (
            <div
              key={i}
              ref={el => (sectionRefs.current[i] = el)}
              className={`fade-section p-5 rounded-2xl transition-colors duration-300`}
              style={{
                backgroundColor: dark ? "#171b26" : "#ffffff",
                border: dark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.07)",
              }}
            >
              {comp}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}