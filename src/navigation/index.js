import React from "react";
import { Routes, Route } from "react-router-dom";

import { Landing } from "../Pages";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default Navigation;
