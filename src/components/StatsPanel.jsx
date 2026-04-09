import { motion } from "framer-motion";

export default function StatsPanel({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const pending = total - completed;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);
  const productivity = total === 0 ? 0 : Math.min(100, completionRate + 5);

  const stats = [
    { label: "Total Tasks", value: total, icon: "◈", color: "#7f77dd" },
    { label: "Completed", value: completed, icon: "✓", color: "#5dcaa5" },
    { label: "Pending", value: pending, icon: "◷", color: "#ef9f27" },
    {
      label: "Completion Rate",
      value: completionRate + "%",
      icon: "◎",
      color: "#7f77dd",
    },
    {
      label: "Productivity",
      value: productivity + "%",
      icon: "▲",
      color: "#5dcaa5",
    },
  ];

  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5
        w-full
        gap-3
      "
    >
      {stats.map((item, index) => (
        <motion
          .div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          style={{ borderTop: `2px solid ${item.color}` }}
          className="
            relative overflow-hidden
            p-4
            bg-[#171b26]
            border border-white/[0.07] hover:border-white/20 rounded-2xl
            transition-all duration-300
            hover:-translate-y-0.5 group
          "
        >
          {/* glow */}
          <div
            className="
              absolute inset-0
              rounded-2xl
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
            style={{
              background: `radial-gradient(circle at 50% 0%, ${item.color}18 0%, transparent 70%)`,
            }}
          /
          >

          <div
            className="
              relative z-10
            "
          >
            <div
              className="
                flex items-center justify-between
                mb-3
              "
            >
              <p
                className="
                  text-xs text-white/40 font-medium tracking-wide uppercase
                "
              >
                {item.label}
              </p>
              <span
                className="
                  text-base
                "
                style={{ color: item.color }}
              >
                {item.icon}
              </span>
            </div>
            <p
              className="
                text-2xl font-bold tracking-tight
              "
              style={{ color: item.color }}
            >
              {item.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
