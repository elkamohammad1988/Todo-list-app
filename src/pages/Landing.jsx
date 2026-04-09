import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="
        min-h-screen
        bg-white dark:bg-gray-900
        transition
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
            text-5xl text-black dark:text-white sm:text-6xl font-bold
          "
        >
          Organize Your Work <br />
          Like a{" "}
          <span
            className="
              text-indigo-600 dark:text-indigo-400
            "
          >
            Startup
          </span>
        </h1>

        <p
          className="
            max-w-2xl
            mx-auto
            text-gray-500 dark:text-gray-300 text-lg
          "
        >
          A modern SaaS Todo App with authentication, roles,
          subscriptions, analytics and real-time sync.
        </p>

        <div
          className="
            flex flex-col sm:flex-row justify-center
            gap-4
          "
        >
          <Link
            to="/register"
            className="
              px-8 py-3
              text-white
              bg-indigo-600 hover:bg-indigo-700
              rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              px-8 py-3
              text-black dark:text-white
              bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
              border border-gray-300 dark:border-gray-700 rounded-lg
              transition
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
            {
              title: "Real-time Sync",
              desc: "Firestore live updates instantly.",
            },
            {
              title: "Free / Pro System",
              desc: "Subscription-ready architecture.",
            },
            {
              title: "Admin Ready",
              desc: "Role-based access control.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="
                p-6
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700 rounded-lg
                transition hover:shadow-md
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
                  mt-2
                  text-gray-500 dark:text-gray-300
                "
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}