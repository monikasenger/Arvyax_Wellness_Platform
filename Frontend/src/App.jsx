import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";

import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-sessions"
            element={
              <PrivateRoute>
                <MySessions />
              </PrivateRoute>
            }
          />
          <Route
            path="/editor/:id?"
            element={
              <PrivateRoute>
                <SessionEditor />
              </PrivateRoute>
            }
          />

          {/* Redirect root */}
          <Route
            path="/"
            element={
             
                <Dashboard />
          
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
