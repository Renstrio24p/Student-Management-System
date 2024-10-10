import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import Classes from "../pages/Admin/Classes";
import Examination from "../pages/Admin/Examination";
import Performance from "../pages/Admin/Performance";
import Teachers from "../pages/Admin/Teachers";
import Students from "../pages/Admin/Students";
import Assignments from "../pages/Admin/Assignments";
import Library from "../pages/Admin/Library";
import PrivateAuth from "../private/PrivateAuth";
const Choice = lazy(() => import("../components/Choice"));
const Home = lazy(() => import("../pages/Home/Home"));
const Layout = lazy(() => import("../layouts/Layout"));
const About = lazy(() => import("../pages/About/About"));
const Products = lazy(() => import("../pages/Products/Products"));
const NotFound = lazy(() => import("../pages/404/NotFound"));
const ErrorElement = lazy(() => import("../errors/ErrorElement"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "choice-user",
        element: <Choice />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateAuth allowedRoles={["Admin", "Teacher", "Student"]}>
            <Dashboard />
          </PrivateAuth>
        ),
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Classes />,
          },
          {
            path: "exams",
            element: <Examination />,
          },
          {
            path: "performance",
            element: (
              <PrivateAuth allowedRoles={["Admin", "Teacher"]}>
                <Performance />
              </PrivateAuth>
            ),
          },
          {
            path: "teachers",
            element: (
              <PrivateAuth allowedRoles={["Admin", "Teacher"]}>
                <Teachers />
              </PrivateAuth>
            ),
          },
          {
            path: "students",
            element: (
              <PrivateAuth allowedRoles={["Admin", "Teacher"]}>
                <Students />
              </PrivateAuth>
            ),
          },
          {
            path: "assignments",
            element: <Assignments />,
          },
          {
            path: "library",
            element: <Library />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
