import React from "react";
import { useNavigate } from "react-router-dom";

import { Todo, TodoForm } from "../../components";
import { useUser, useGlobalState, useTodo, actions } from "../../store";
import {
  signOutGoogle,
  addTodoService,
  getTodosService,
  updateTodoService,
} from "../../services";
import "./styles.scss";

const Home = () => {
  const { showToast } = useGlobalState();
  const {
    user: { displayName, photoURL },
    dispatchUser,
  } = useUser();
  const { todos, dispatchTodo } = useTodo();
  const navigate = useNavigate();
  const [toggleProfile, setToggleProfile] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [myTodo, setMyTodo] = React.useState({
    title: "",
    description: "",
    time: "",
    id: "",
  });

  const handleSignOut = async () => {
    try {
      await signOutGoogle();
      dispatchUser({
        type: actions.logout,
      });
      showToast({
        message: "Logout Successful",
        type: "success",
      });
      navigate("/");
    } catch (err) {
      showToast({
        message: "Logout Failed",
        type: "error",
      });
    }
  };

  const addTodo = async (title, description, time) => {
    try {
      await addTodoService(title, description, time);
      showToast({
        message: "Task added successfully!",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      showToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  const updateTodo = async (id, title, description, time) => {
    try {
      updateTodoService(id, title, description, time);
      showToast({
        message: "Task updated successfully!",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      showToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  const setTodos = async (todos) => {
    dispatchTodo({
      type: actions.fetchTodosSuccess,
      payload: todos,
    });
  };

  const handleEdit = (todo) => {
    setShowModal(true);
    setMyTodo(todo);
  };

  React.useEffect(() => {
    const unsub = getTodosService(setTodos);

    return () => unsub();
  }, []);

  return (
    <div className="padding-default home">
      <div className="home__header">
        <div>
          <h1 className="h5">Welcome back, {displayName} !</h1>
          <h1 className="text-lg">
            You have 4 tasks assigned, all the best !!
          </h1>
        </div>
        <div
          className="home__header--profile"
          onClick={() => setToggleProfile((prev) => !prev)}
        >
          <img
            src={photoURL}
            alt="profile"
            className="avatar avatar-small img-responsive"
          />
          <div
            className={`logout ${toggleProfile && `logout--active`}`}
            onClick={handleSignOut}
          >
            {" "}
            <p className="text-rg">logout</p>{" "}
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>

      <main className="todo padding-default">
        <div className="todo__header">
          <h1 className="h6">Todo List</h1>
          <div className="todo__add" onClick={() => setShowModal(true)}>
            <p className="text-lg">+</p>
          </div>
        </div>
        <div className="todo__list">
          {todos.length > 0 &&
            todos.map((todo) => (
              <Todo key={todo.id} todo={todo} onEdit={handleEdit} />
            ))}
        </div>
      </main>
      <TodoForm
        visible={showModal}
        todo={myTodo}
        onClose={() => setShowModal((p) => !p)}
        addTodo={addTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default Home;
