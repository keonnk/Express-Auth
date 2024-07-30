import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import { ToastContainer } from "react-toastify";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage isSignup={false} />,
    },
    {
      path: "/signup",
      element: <LoginPage isSignup={true} />,
    },
    {
      path: "/products",
      element: <ProductPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
