import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function TodoItem({ todo, dark }) {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(todo.task);
  const [done, setDone] = useState(todo.done);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if todo is expired
  useEffect(() => {
    if (!todo.time) return;

    const checkExpire = () => {
      const now = new Date();
      const [h, m] = todo.time.split(":");
      const taskTime = new Date();
      taskTime.setHours(h);
      taskTime.setMinutes(m);

      setExpired(taskTime < now && !done);
    };

    checkExpire();
    const interval = setInterval(checkExpire, 60000);
    return () => clearInterval(interval);
  }, [todo.time, done]);

  // Update task
  const updateTask = async () => {
    if (!task.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await updateDoc(doc(db, "todos", todo.id), { task, done });
      toast.success("Task updated");
      setEdit(false);
    } catch (err) {
      toast.error("Failed to update task");
      console.error(err);
    }
    setLoading(false);
  };

  // Delete task
  const removeTask = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "todos", todo.id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error(err);
    }
    setLoading(false);
  };

  // Toggle done
  const toggleDone = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "todos", todo.id), { done: !done });
      setDone(!done);
      toast.success(done ? "Marked as not done" : "Marked as done");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow transition-all duration-200
        ${
          expired
            ? dark
              ? "bg-red-800 border border-red-600"
              : "bg-red-100 border border-red-400"
            : dark
            ? "bg-gray-800 border border-gray-700"
            : "bg-white dark:bg-gray-800"
        }
        ${done ? "opacity-70 line-through" : ""}`}
    >
      {edit ? (
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={`border p-2 rounded w-3/4 focus:outline-none focus:ring-2 ${
            dark
              ? "focus:ring-indigo-400 bg-gray-700 text-white border-gray-600"
              : "focus:ring-indigo-500 bg-white text-black border-gray-300"
          }`}
          disabled={loading}
        />
      ) : (
        <div>
          <p
            className="
              font-semibold
            "
          >{todo.task}</p>
          <p
            className={`text-sm ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {todo.time || "--:--"} | {todo.category}
            {expired && (
              <span
                className="
                  ml-3
                  text-red-600 font-bold
                "
              >Expired</span>
            )}
          </p>
        </div>
      )}

      <div
        className="
          flex
          gap-2
        "
      >
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="text-blue-500 hover:underline"
            disabled={loading}
          >
            Edit
          </button>
        ) : (
          <button
            onClick={updateTask}
            className="
              text-green-500 hover:underline
            "
            disabled={loading}
          >
            Save
          </button>
        )}

        <button
          onClick={removeTask}
          className="
            text-red-500 hover:underline
          "
          disabled={loading}
        >
          Delete
        </button>

        <button
          onClick={toggleDone}
          className={`hover:underline ${
            done ? "text-yellow-400" : "text-yellow-500"
          }`}
          disabled={loading}
        >
          {done ? "Undo" : "Done"}
        </button>
      </div>
    </div>
  );
}