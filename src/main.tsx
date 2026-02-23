import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

// ✅ ADD THESE
import { AuthProvider } from "./context/AuthContext";
import { CalendarProvider } from "./context/CalendarContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <AuthProvider>

      <CalendarProvider>

        <App />

      </CalendarProvider>

    </AuthProvider>

  </StrictMode>
);