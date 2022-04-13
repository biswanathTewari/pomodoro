import React from "react";

import { actions } from "./";

const TodoContext = React.createContext({});

const TodoReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.fetchTodosSuccess:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case actions.fetchTodosFailure:
      return {
        ...state,
        isLoading: false,
        todos: [],
      };
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatchTodo] = React.useReducer(TodoReducer, {
    isLoading: false,
    todos: [],
  });

  return (
    <TodoContext.Provider value={{ ...state, dispatchTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => React.useContext(TodoContext);

export { TodoProvider, useTodo };
