import React from "react";

/*
  Error Boundary Component
  ------------------------
  Catches JavaScript errors anywhere in the component tree
  and displays a fallback UI instead of crashing the app.
*/

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

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="
            flex items-center justify-center
            min-h-screen
            text-red-600
            bg-red-50
          "
        >
          <h1
            className="
              text-xl font-bold
            "
          >
            Something went wrong.
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}