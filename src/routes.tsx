import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/signIn";
import { SignUp } from "./pages/auth/signUp";
import { AppLayout } from "./pages/_layouts/app";
import ProtectedRoute from "./components/protected_route";
import { Products } from "./pages/app/products/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/",
    element: <ProtectedRoute element={<AppLayout />} />,
    children: [{ path: "/products", element: <Products /> }],
  },
]);
