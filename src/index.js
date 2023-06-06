import React from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import './index.css';
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import AddStudent from "./components/AddStudent/AddStudent";
import UserDashboard from "./components/UserDashboard/UserDashboard";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/addstudent",
    element: <AddStudent />
  },
  {
    path: "/userdashboard",
    element: <UserDashboard />
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
