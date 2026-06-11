import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-surface-2)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border-2)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            borderRadius: "4px",
          },
          success: {
            iconTheme: {
              primary: "var(--color-accent)",
              secondary: "var(--color-bg)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--color-danger)",
              secondary: "var(--color-bg)",
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);