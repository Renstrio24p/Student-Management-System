import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/Router";
import { useAuthStore } from "./auth/Zustand";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

export default function App() {
  const initializeUser = useAuthStore(state => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return <RouterProvider router={router} />;
}
