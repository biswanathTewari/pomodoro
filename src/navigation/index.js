import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { Landing, Home, Task } from "../Pages";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todos/:id"
        element={
          <ProtectedRoute>
            <Task />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Navigation;
