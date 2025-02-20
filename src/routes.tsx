import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/signIn";
import { SignUp } from "./pages/auth/signUp";
import { AppLayout } from "./pages/_layouts/app";
import ProtectedRoute from "./components/protected_route";
import { Products } from "./pages/app/products/products";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Orders } from "./pages/app/orders/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<AppLayout />} />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);
