import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { Landing, Todos } from "../Pages";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <Todos />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Navigation;
