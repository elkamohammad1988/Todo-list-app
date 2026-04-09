import React, { memo, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORY_CONFIG = [
  { name: "Work", color: "#7f77dd" },
  { name: "Personal", color: "#5dcaa5" },
  { name: "Study", color: "#ef9f27" },
];

const StatCard = memo(({ label, value, color, dark }) => (
  <div
    style={{
      flex: 1,
      padding: "12px 10px",
      borderRadius: "10px",
      backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
      border: dark
        ? "1px solid rgba(255,255,255,0.07)"
        : "1px solid rgba(0,0,0,0.07)",
      textAlign: "center",
    }}
  >
    <p
      style={{
        fontSize: "12px",
        color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
        margin: "0 0 4px",
      }}
    >
      {label}
    </p>
    <p style={{ fontSize: "20px", fontWeight: 600, margin: 0, color }}>
      {value}
    </p>
  </div>
));

const CustomLegend = memo(({ data, total, dark }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      minWidth: "120px",
    }}
  >
    {data.map(({ name, value, color }) => (
      <div
        key={name}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        <span
          style={{
            fontSize: 13,
            color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            flex: 1,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: dark ? "rgba(255,255,255,0.75)" : "#111",
          }}
        >
          {total > 0 ? Math.round((value / total) * 100) : 0}%
        </span>
      </div>
    ))}
  </div>
));

export default function StatsChart({ todos = [], dark = true }) {
  const data = useMemo(() => {
    const counts = { Work: 0, Personal: 0, Study: 0 };
    todos.forEach((todo) => {
      if (counts[todo.category] !== undefined) counts[todo.category]++;
    });
    return CATEGORY_CONFIG.map((c) => ({
      name: c.name,
      value: counts[c.name],
      color: c.color,
    }));
  }, [todos]);

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
  );

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "24px",
        borderRadius: "16px",
        border: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(0,0,0,0.07)",
        backgroundColor: dark ? "#171b26" : "#ffffff",
      }}
    >
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {data.map((d) => (
          <StatCard
            key={d.name}
            label={d.name}
            value={d.value}
            color={d.color}
            dark={dark}
          />
        ))}
      </div>

      {total === 0 ? (
        <div
          style={{
            height: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
            fontSize: "14px",
            border: dark
              ? "1px dashed rgba(255,255,255,0.08)"
              : "1px dashed rgba(0,0,0,0.08)",
            borderRadius: "12px",
          }}
        >
          No tasks to display
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1, height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#171b26" : "#ffffff",
                    color: dark ? "rgba(255,255,255,0.85)" : "#111",
                    borderRadius: "10px",
                    padding: "8px 14px",
                    border: dark
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.07)",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [value, "Tasks"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend data={data} total={total} dark={dark} />
        </div>
      )}
    </div>
  );
}
