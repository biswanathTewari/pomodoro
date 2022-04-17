import React from "react";
import { useNavigate } from "react-router-dom";

import { deleteTodoService } from "../../services";
import "./styles.scss";

const Todo = ({ todo, onEdit }) => {
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    if (e.target.classList.contains("fas")) return;
    navigate(`/todos/${todo.id}`, { state: { todo } });
  };
  return (
    <div className="todo__item" onClick={onClickHandler}>
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
