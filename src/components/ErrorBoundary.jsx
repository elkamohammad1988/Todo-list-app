import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload(); 
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="
            flex flex-col items-center justify-center
            min-h-screen
            p-6
            text-red-600 dark:text-red-400
            bg-red-50 dark:bg-gray-900
          "
        >
          <h1
            className="
              mb-4
              text-2xl font-bold
            "
          >Oops! Something went wrong.</h1>
          <p
            className="
              mb-6
              text-center text-gray-700 dark:text-gray-300
            "
          >
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            className="
              px-4 py-2
              text-white
              bg-red-600 hover:bg-red-700
              rounded-lg
              transition
            "
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}