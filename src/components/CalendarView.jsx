import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CATEGORY_COLORS = {
  Work: { bg: "#7f77dd", hover: "#534ab7" },
  Personal: { bg: "#5dcaa5", hover: "#1d9e75" },
  Urgent: { bg: "#e24b4a", hover: "#a32d2d" },
  default: { bg: "#ef9f27", hover: "#ba7517" },
};

export default function CalendarView({ todos, dark = true }) {
 
  const events = todos
    .filter((todo) => todo.time)
    .map((todo) => {
      const today = new Date();
      const [hour, minute] = todo.time.split(":");
      const start = new Date(today);
      start.setHours(Number(hour));
      start.setMinutes(Number(minute));
      start.setSeconds(0);
      const end = new Date(start);
      end.setMinutes(start.getMinutes() + 30);
      return {
        title: todo.task,
        start,
        end,
        category: todo.category,
        done: todo.done,
      };
    });

  const eventPropGetter = (event) => {
    const color = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.default;
    return {
      style: {
        backgroundColor: event.done ? (dark ? "#555" : "#ccc") : color.bg,
        border: "none",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "12px",
        padding: "2px 8px",
        opacity: event.done ? 0.5 : 1,
        textDecoration: event.done ? "line-through" : "none",
        cursor: "pointer",
      },
    };
  };

  const dayPropGetter = () => ({
    style: { backgroundColor: "transparent" },
  });
  const bgColor = dark ? "#171b26" : "#fff";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textColor = dark ? "rgba(255,255,255,0.8)" : "#111827";
  const headerTextColor = dark ? "rgba(255,255,255,0.4)" : "#6b7280";

  return (
    <div
      className="
        overflow-x-auto
        p-6
        rounded-2xl border
      "
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      {/* Header */}
      <div
        className="
          flex items-center justify-between
          mb-5
        "
      >
        <h2
          className="
            text-base font-semibold tracking-wide
          "
          style={{ color: textColor }}
        >
          Tasks Calendar
        </h2>
        <div
          className="
            flex items-center
            gap-3
          "
        >
          {Object.entries(CATEGORY_COLORS)
            .filter(([k]) => k !== "default")
            .map(([label, { bg }]) => (
              <div
                key={label}
                className="
                  flex items-center
                  gap-1.5
                "
              >
                <span
                  className="
                    w-2 h-2
                    rounded-full
                  "
                  style={{ background: bg }}
                /
                >
                <span
                  className="
                    text-xs
                  "
                  style={{ color: headerTextColor }}
                >
                  {label}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Custom styles for react-big-calendar */}
      <style>{`
        .rbc-calendar { background: transparent; font-family: inherit; color: ${
          dark ? "rgba(255,255,255,0.75)" : "#111827"
        }; }
        .rbc-header { background: ${
          dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"
        }; border-color: ${borderColor} !important; padding: 8px 0; font-size: 12px; font-weight: 500; color: ${
          dark ? "rgba(255,255,255,0.4)" : "#6b7280"
        }; text-transform: uppercase; letter-spacing: 0.5px; }
        .rbc-month-view, .rbc-time-view, .rbc-agenda-view { border-color: ${borderColor} !important; border-radius: 12px; overflow: hidden; }
        .rbc-day-bg { border-color: ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} !important; }
        .rbc-off-range-bg { background: ${dark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.05)"} !important; }
        .rbc-today { background: ${dark ? "rgba(127,119,221,0.08)" : "rgba(127,119,221,0.05)"} !important; }
        .rbc-date-cell { padding: 6px 8px; font-size: 12px; color: ${
          dark ? "rgba(255,255,255,0.4)" : "#6b7280"
        }; }
        .rbc-date-cell.rbc-now { color: #7f77dd; font-weight: 700; }
        .rbc-toolbar { margin-bottom: 16px; gap: 8px; flex-wrap: wrap; }
        .rbc-toolbar button { background: ${
          dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
        }; border: 1px solid ${borderColor}; color: ${
          dark ? "rgba(255,255,255,0.6)" : "#6b7280"
        }; border-radius: 8px; padding: 5px 12px; font-size: 12px; font-family: inherit; cursor: pointer; transition: all 0.15s; }
        .rbc-toolbar button:hover { background: rgba(127,119,221,0.15); color: #7f77dd; border-color: rgba(127,119,221,0.3); }
        .rbc-toolbar button.rbc-active { background: rgba(127,119,221,0.2); color: #7f77dd; border-color: rgba(127,119,221,0.4); }
        .rbc-toolbar-label { color: ${dark ? "rgba(255,255,255,0.7)" : "#374151"}; font-weight: 600; font-size: 14px; }
        .rbc-time-slot { border-color: ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} !important; }
        .rbc-timeslot-group { border-color: ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"} !important; }
        .rbc-current-time-indicator { background: #7f77dd; }
        .rbc-show-more { color: #7f77dd; background: transparent; font-size: 11px; }
        .rbc-selected { box-shadow: 0 0 0 2px #7f77dd !important; }
      `}</style>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 520 }}
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
}
