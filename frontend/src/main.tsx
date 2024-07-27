import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import LoginPage from './pages/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage isSignup={false} />
  },
  {
    path: "/signup",
    element: <LoginPage isSignup={true} />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
