import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

export default function StatsChart({ todos }) {
  const data = [
    { name: "Work", value: todos.filter((t) => t.category === "Work").length },
    {
      name: "Personal",
      value: todos.filter((t) => t.category === "Personal").length,
    },
    {
      name: "Study",
      value: todos.filter((t) => t.category === "Study").length,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}