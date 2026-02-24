import { createBrowserRouter, Outlet, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./features/home/HomePage";
import { lazy } from "react";

const LoginPage   = lazy(() => import("./features/auth/LoginPage"));

function ProtectedRoute() {
  // const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage />},
  {
    element: <ProtectedRoute />,
    children: [
      // rotas privadas
    ]
  },
  // Depois montar uma 404 bonita
  // { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

