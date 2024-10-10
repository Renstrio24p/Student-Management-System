import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "boxicons/css/boxicons.min.css";
import "./index.css";
const App = lazy(() => import("./App"));
const Loading = lazy(() => import("./components/Loading/Loading"));
const ErrorBoundary = lazy(() => import("./errors/ErrorBoundary"));

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
);
