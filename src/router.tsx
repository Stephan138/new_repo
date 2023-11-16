import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LinkPage,
  LoginPage,
  ProtectedRoot,
  RegisterPage,
  Root,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoot />,
    children: [
      {
        index: true,
        element: <Navigate to="/drive" replace />,
      },
      {
        path: "drive",
        element: <HomePage />,
      },
      {
        path: "folders/:folder",
        element: <HomePage />,
      },
      {
        path: "link/:id",
        element: <LinkPage />,
      },
    ],
  },
]);
