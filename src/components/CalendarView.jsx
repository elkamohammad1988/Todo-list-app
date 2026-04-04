import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView({ todos }) {

  const events = todos
    .filter(todo => todo.time)
    .map(todo => {

      const today = new Date();
      const [hour, minute] = todo.time.split(":");

      const start = new Date(today);
      start.setHours(Number(hour));
      start.setMinutes(Number(minute));

      const end = new Date(start);
      end.setMinutes(start.getMinutes() + 30);

      return {
        title: todo.task,
        start,
        end,
      };
    });

  return (
    <div
      className="
        p-6 mt-6
        bg-white dark:bg-gray-800
        rounded-2xl
        shadow
      "
    >
      
      <h2
        className="
          mb-4
          text-xl font-bold
        "
      >
        Tasks Calendar
      </h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

    </div>
  );
}