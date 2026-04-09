import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b from-indigo-50 dark:from-slate-900
        via-white dark:via-slate-950 to-white dark:to-slate-950
        transition-colors
      "
    >
      
      {/* Hero Section */}
      <div
        className="
          max-w-6xl
          mx-auto px-6 py-24 space-y-8
          text-center
        "
      >
        <h1
          className="
            text-5xl sm:text-6xl font-bold leading-tight
          "
        >
          Organize Your Work <br />
          Like a{" "}
          <span
            className="
              text-indigo-600 dark:text-indigo-400
            "
          >Startup</span>
        </h1>

        <p
          className="
            max-w-2xl
            mx-auto
            text-gray-500 dark:text-gray-300 text-lg sm:text-xl
          "
        >
          A modern SaaS Todo App with authentication, roles, subscriptions,
          analytics and real-time sync.
        </p>

        <div
          className="
            flex flex-col sm:flex-row justify-center
            mt-6
            gap-4
          "
        >
          <Link
            to="/register"
            className="
              px-8 py-3
              text-white font-semibold
              bg-indigo-600 hover:bg-indigo-700
              rounded-lg
              transition shadow-md
              transform hover:scale-105
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              px-8 py-3
              font-semibold
              hover:bg-gray-200 dark:hover:bg-gray-800
              border border-gray-300 dark:border-gray-600 rounded-lg
              transition shadow-sm
              transform hover:scale-105
            "
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div
        className="
          py-20
          bg-white dark:bg-slate-900
          transition-colors
        "
      >
        <div
          className="
            grid md:grid-cols-3
            max-w-6xl
            mx-auto px-6
            text-center
            gap-10
          "
        >
          {[
            { title: "Real-time Sync", desc: "Firestore live updates instantly." },
            { title: "Free / Pro System", desc: "Subscription-ready architecture." },
            { title: "Admin Ready", desc: "Role-based access control." },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="
                space-y-3 p-6
                hover:bg-indigo-50 dark:hover:bg-slate-800
                rounded-xl
                transition shadow-sm hover:shadow-md
              "
            >
              <h3
                className="
                  text-xl text-indigo-600 dark:text-indigo-400 font-semibold
                "
              >
                {feature.title}
              </h3>
              <p
                className="
                  text-gray-500 dark:text-gray-300
                "
              >{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}