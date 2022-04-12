import React from "react";
import { useNavigate } from "react-router-dom";

import { Todo, TodoForm } from "../../components";
import { useUser, useGlobalState, actions } from "../../store";
import { signOutGoogle, addTodoService } from "../../services";
import "./styles.scss";

const Home = () => {
  const { showToast } = useGlobalState();
  const {
    user: { displayName, photoURL },
    dispatchUser,
  } = useUser();
  const navigate = useNavigate();
  const [toggleProfile, setToggleProfile] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

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
            <i class="fas fa-sign-out-alt"></i>
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
          <Todo item={"Home work"} />
          <Todo item={"Home work"} />
          <Todo item={"Home work"} />
          <Todo item={"Home work"} />
          <Todo item={"Home work"} />
        </div>
      </main>
      <TodoForm
        visible={showModal}
        onClose={() => setShowModal((p) => !p)}
        addTodo={addTodo}
      />
    </div>
  );
};

export default Home;
