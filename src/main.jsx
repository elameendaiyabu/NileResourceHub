import 'process'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './pages/ErrorPage'
import './index.css'
import SignUp from './pages/SignUp'
import Submission from './pages/Submission'
import FeaturedResources from './pages/FeaturedResources'
import UserFeedback from './pages/UserFeedback'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Community from './pages/Community'
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute><Home /></ProtectedRoute>),
    errorElement: <ErrorPage />,
  },
  {
    path: "/featured-resources",
    element: <FeaturedResources />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/submission",
    element: <Submission />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user-feedback",
    element: <UserFeedback />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/community",
    element: <Community />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={true}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)