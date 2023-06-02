import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../components/dashboard/index";
import Layout from "../components/layout/index";
import Comments from "../components/comments";
import Profile from "../components/profile/index.js";
import Users from "../components/users";
import SubjectLists from "../components/post/SubjectList";
import LandingPage from "../components/landingPage/LandingPage";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/dashboard";
export const USERS = "/users";
export const PROFILE = "/profile/:id";
export const COMMENTS = "/comments/:id";
export const SUBJECTS = "/subjects/:subject";

export const router = createBrowserRouter([
  { path: ROOT, element: <LandingPage /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: ROOT,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: USERS,
        element: <Users />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
      {
        path: COMMENTS,
        element: <Comments />,
      },
      {
        path: SUBJECTS,
        element: <SubjectLists />,
      },
    ],
  },
]);
