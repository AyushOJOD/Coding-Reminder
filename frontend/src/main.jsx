import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/auth/login', element: <Login /> },
  { path: '/auth/register', element: <Register /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
