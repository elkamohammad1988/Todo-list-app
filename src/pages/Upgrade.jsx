import { useNavigate } from "react-router-dom";

export default function Upgrade({ dark }) {
  const navigate = useNavigate();

  return (
    <div
      className={`
        flex items-center justify-center
        min-h-screen
        p-6
        transition-colors duration-300
        ${dark ? "bg-slate-950" : "bg-slate-100"}
      `}
    >
      <div
        className={`
          max-w-3xl w-full
          p-10 space-y-8
          transition-colors duration-300
          ${dark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
          rounded-2xl
          shadow-xl
        `}
      >
        <h1
          className="
            text-4xl text-center font-bold
          "
        >
          Upgrade to Pro 🚀
        </h1>

        <p
          className="
            text-center text-gray-500 dark:text-gray-400
          "
        >
          Unlock unlimited productivity and premium features.
        </p>

        {/* Features Comparison */}
        <div
          className="
            grid md:grid-cols-2
            gap-6
          "
        >
          {/* Free Plan */}
          <div
            className={`
              p-6 space-y-3
              border rounded-xl
              transition-colors
              ${dark ? "border-gray-700" : "border-gray-300"}
            `}
          >
            <h2
              className="
                text-xl font-semibold
              "
            >Free Plan</h2>
            <ul
              className="
                pl-5 space-y-1
                text-sm text-gray-500 dark:text-gray-400
                list-disc
              "
            >
              <li>Up to 5 tasks</li>
              <li>Basic features</li>
              <li>Standard support</li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div
            className={`
              p-6 space-y-3
              border-2 rounded-xl
              ${dark ? "border-indigo-400" : "border-indigo-600"}
            `}
          >
            <h2 className={`text-xl font-semibold ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
              Pro Plan
            </h2>
            <ul
              className="
                pl-5 space-y-1
                text-sm text-gray-700 dark:text-gray-200
                list-disc
              "
            >
              <li>Unlimited tasks</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>Future updates</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div
          className="
            text-center
          "
        >
          <button
            onClick={() => alert("Connect Stripe here")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Upgrade Now
          </button>
        </div>

        <div
          className="
            text-center
          "
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}