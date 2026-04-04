export default function StatsCard({ title, value }) {
  return (
    <div
      className="
        p-6
        bg-white dark:bg-gray-800
        rounded-2xl
        shadow-xl hover:shadow-2xl transition
      "
    >
      <h3
        className="
          text-gray-500
        "
      >{title}</h3>

      <p
        className="
          text-3xl font-bold
        "
      >{value}</p>
    </div>
  );
}
