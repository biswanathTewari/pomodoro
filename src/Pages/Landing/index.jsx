import React from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

import { signInGoogle, signOutGoogle } from "../../services";
import { actions, useUser, useGlobalState } from "../../store";
import "./styles.scss";

const Landing = () => {
  const { showToast } = useGlobalState();
  const { isLoggedIn, dispatchUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from?.pathname : "/todos";

  const handleSignIn = async () => {
    try {
      const res = await signInGoogle();
      dispatchUser({
        type: actions.login,
        payload: res,
      });
      showToast({
        message: "Login Successful",
        type: "success",
      });
      navigate(from, { replace: true });
    } catch (err) {
      showToast({
        message: "Login Failed",
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
    } catch (err) {
      showToast({
        message: "Logout Failed",
        type: "error",
      });
    }
  };

  if (isLoggedIn) return <Navigate to={"/todos"} replace />;

  return (
    <div className="landing padding-default">
      <h1 className="h1">iPomodoro</h1>
      <h1 className="h6 landing__quote">
        "Time is the most valuable currency in the world"
      </h1>
      <h1 className="h6 landing__quote">by bizan</h1>
      {!isLoggedIn && (
        <div
          className="btn btn-transparent landing__btn"
          onClick={handleSignIn}
        >
          Login
        </div>
      )}
      {isLoggedIn && (
        <div
          className="btn btn-transparent landing__btn"
          onClick={handleSignOut}
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default Landing;
