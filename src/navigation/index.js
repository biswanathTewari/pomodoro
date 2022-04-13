import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { Landing, Home } from "../Pages";

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
    </Routes>
  );
};

export default Navigation;
