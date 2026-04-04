import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100 dark:bg-slate-950
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
            text-5xl font-bold leading-tight
          "
        >
          Organize Your Work <br />
          Like a{" "}
          <span
            className="
              text-indigo-600
            "
          >
            Startup
          </span>
        </h1>

        <p
          className="
            max-w-2xl
            mx-auto
            text-gray-500 text-lg
          "
        >
          A modern SaaS Todo App with authentication, roles, subscriptions,
          analytics and real-time sync.
        </p>

        <div
          className="
            flex justify-center
            gap-4
          "
        >
          <Link
            to="/register"
            className="
              px-8 py-3
              text-white
              bg-indigo-600 hover:bg-indigo-700
              rounded-lg
              transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              px-8 py-3
              hover:bg-gray-200 dark:hover:bg-gray-800
              border rounded-lg
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
          bg-white dark:bg-slate-900
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
          <div
            className="
              space-y-3
            "
          >
            <h3
              className="
                text-xl font-semibold
              "
            >
              Real-time Sync
            </h3>
            <p
              className="
                text-gray-500
              "
            >
              Firestore live updates instantly.
            </p>
          </div>

          <div
            className="
              space-y-3
            "
          >
            <h3
              className="
                text-xl font-semibold
              "
            >
              Free / Pro System
            </h3>
            <p
              className="
                text-gray-500
              "
            >
              Subscription-ready architecture.
            </p>
          </div>

          <div
            className="
              space-y-3
            "
          >
            <h3
              className="
                text-xl font-semibold
              "
            >
              Admin Ready
            </h3>
            <p
              className="
                text-gray-500
              "
            >
              Role-based access control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
