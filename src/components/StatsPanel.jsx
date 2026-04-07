
import { motion } from "framer-motion";

export default function StatsPanel({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const pending = total - completed;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
  const productivity = total === 0 ? 0 : Math.min(100, completionRate + 5);

  const stats = [
    { label: "Total Tasks", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
    { label: "Completion Rate", value: completionRate + "%" },
    { label: "Productivity", value: productivity + "%" },
  ];

  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5
        w-full
        gap-4
      "
    >
      {stats.map((item, index) => (
        <motion
          .div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="
            p-4
            bg-white dark:bg-gray-800
            rounded-2xl
            shadow hover:shadow-lg transition
          "
        >
          <p
            className="
              text-sm text-gray-500 dark:text-gray-400
            "
          >{item.label}</p>
          <p
            className="
              text-2xl text-indigo-600 dark:text-indigo-400 font-bold
            "
          >{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}