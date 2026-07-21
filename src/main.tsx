import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

window.addEventListener("error", (e) => {
  document.getElementById("root")!.innerHTML = `<pre style="color:red;padding:2rem;font-size:14px;white-space:pre-wrap;">ERROR: ${e.message}\n${e.filename}:${e.lineno}:${e.colno}\n${e.error?.stack || ""}</pre>`;
});
window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
  document.getElementById("root")!.innerHTML = `<pre style="color:red;padding:2rem;font-size:14px;white-space:pre-wrap;">UNHANDLED REJECTION: ${e.reason}\n${e.reason?.stack || ""}</pre>`;
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
