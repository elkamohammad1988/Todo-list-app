import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Work");

  function submit(e) {
    e.preventDefault();
    if (!task) return;
    addTodo(task, time, category);
    setTask("");
    setTime("");
    setCategory("Work");
  }

  return (
    <form
      onSubmit={submit}
      className="
        flex flex-wrap
        mb-4
        gap-2
      "
    >
      {/* Task Input */}
      <input
        type="text"
        placeholder="Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="
          flex-1
          p-2
          border border-gray-300 dark:border-gray-700
          rounded-lg
          bg-white dark:bg-gray-800
          text-black dark:text-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition
        "
      />

      {/* Time Input */}
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="
          p-2
          border border-gray-300 dark:border-gray-700
          rounded-lg
          bg-white dark:bg-gray-800
          text-black dark:text-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition
        "
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          p-2
          border border-gray-300 dark:border-gray-700
          rounded-lg
          bg-white dark:bg-gray-800
          text-black dark:text-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition
        "
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          px-4 py-2
          text-white
          bg-indigo-600 hover:bg-indigo-700
          rounded-lg
          transition
        "
      >
        Add Task
      </button>
    </form>
  );
}