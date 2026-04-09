// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

// Core App
import App from "./App.jsx";

// Styles
import "./index.css";

// Components
import ErrorBoundary from "./components/ErrorBoundary";

// Routing
import { BrowserRouter } from "react-router-dom";

// Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* ErrorBoundary catches runtime errors in the app */}
    <ErrorBoundary>
      {/* BrowserRouter with basename for GitHub Pages deployment */}
      <BrowserRouter basename="/Todo-list-app">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
