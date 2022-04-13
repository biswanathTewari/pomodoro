import React from "react";

import { deleteTodoService } from "../../services";
import "./styles.scss";

const Todo = ({ todo, onEdit }) => {
  return (
    <div className="todo__item">
      <h1 className="text-lg">{todo.title}</h1>
      <div className="todo__actions">
        <i className="fas fa-edit" onClick={() => onEdit(todo)}></i>
        <i
          className="fas fa-trash-alt"
          onClick={() => deleteTodoService(todo.id)}
        ></i>
      </div>
    </div>
  );
};

export default Todo;
