import { createBrowserRouter } from 'react-router-dom'
import Login from 'components/auth/Login'
import Register from 'components/auth/Register'
import Dashboard from 'components/dashboard'
import Layout from 'components/layout/index'
import Comments from 'components/comments'
import Profile from 'components/profile/index.js'
import Users from 'components/users'
import SubjectLists from 'components/post/SubjectList'
import LandingPage from 'components/LandingPage'

export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTER = '/register'
export const PROTECTED = '/protected'
export const DASHBOARD = '/protected/dashboard'
export const USERS = '/protected/users'
export const PROFILE = '/protected/profile/:id'
export const COMMENTS = '/protected/comments/:id'
export const SUBJECTS = '/protected/subjects/:subject'

export const router = createBrowserRouter([
  { path: ROOT, element: <LandingPage /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
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
])
