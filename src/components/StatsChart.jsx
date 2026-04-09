import React, { memo, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORY_CONFIG = [
  { name: "Work", color: "#7f77dd" },
  { name: "Personal", color: "#5dcaa5" },
  { name: "Study", color: "#ef9f27" },
];

// 🧠 Stat Card (unchanged logic, improved smoothness)
const StatCard = memo(({ label, value, color, dark }) => (
  <div
    style={{
      flex: 1,
      padding: "14px 12px",
      borderRadius: "12px",
      backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
      border: dark
        ? "1px solid rgba(255,255,255,0.07)"
        : "1px solid rgba(0,0,0,0.07)",
      textAlign: "center",
      transition: "all 0.3s ease",
    }}
  >
    <p
      style={{
        fontSize: "12px",
        color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
        margin: "0 0 6px",
      }}
    >
      {label}
    </p>
    <p style={{ fontSize: "22px", fontWeight: 700, margin: 0, color }}>
      {value}
    </p>
  </div>
));

// 🧠 Legend (same logic, better spacing)
const CustomLegend = memo(({ data, total, dark }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {data.map(({ name, value, color }) => (
      <div
        key={name}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        <span
          style={{
            fontSize: 13,
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
            flex: 1,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: dark ? "rgba(255,255,255,0.85)" : "#111",
          }}
        >
          {total ? Math.round((value / total) * 100) : 0}%
        </span>
      </div>
    ))}
  </div>
));

export default function StatsChart({ todos = [], dark = true }) {
  // 📊 data logic unchanged
  const data = useMemo(() => {
    const counts = { Work: 0, Personal: 0, Study: 0 };

    todos.forEach((todo) => {
      if (counts[todo.category] !== undefined) {
        counts[todo.category]++;
      }
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
        transition: "all 0.3s ease",
      }}
    >
      {/* Top stats */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
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

      {/* Empty state */}
      {total === 0 ? (
        <div
          style={{
            height: 260,
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
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {/* ✅ FIX: stable chart container */}
          <div
            style={{
              flex: 1,
              minHeight: 260,
              height: 260,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                  stroke="none"
                >
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#171b26" : "#ffffff",
                    borderRadius: "10px",
                    border: dark
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.07)",
                    fontSize: "13px",
                  }}
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
