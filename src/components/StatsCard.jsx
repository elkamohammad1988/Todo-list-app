export default function StatsCard({ title, value }) {
  return (
    <div
      className="
        p-6
        bg-gray-800
        rounded-2xl
        shadow-lg hover:shadow-2xl transition-transform duration-300
        transform
        hover:-translate-y-1
      "
    >
      <h3
        className="
          text-gray-400 text-sm font-medium
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-white text-3xl font-bold
        "
      >
        {value}
      </p>
    </div>
  );
}
