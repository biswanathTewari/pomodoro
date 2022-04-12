import React from "react";

import "./styles.scss";

const Todo = ({ item }) => {
  return (
    <div className="todo__item">
      <h1 className="text-lg">{item}</h1>
      <div className="todo__actions">
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default Todo;
