import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css"; // Ensure global styles are loaded
import ResumeAnalyzerApp from "./components/ResumeAnalyzerApp"; // Use new component

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResumeAnalyzerApp />
  </StrictMode>
);