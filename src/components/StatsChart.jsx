import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];
const DARK_TOOLTIP_STYLE = { backgroundColor: "#1f2937", color: "#f9fafb", borderRadius: "6px", padding: "6px 10px" };

export default function StatsChart({ todos, dark }) {
  const data = [
    { name: "Work", value: todos.filter((t) => t.category === "Work").length },
    { name: "Personal", value: todos.filter((t) => t.category === "Personal").length },
    { name: "Study", value: todos.filter((t) => t.category === "Study").length },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} label={{ fill: dark ? "#f9fafb" : "#111827" }}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={dark ? DARK_TOOLTIP_STYLE : {}}
          formatter={(value) => [value, "Tasks"]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}