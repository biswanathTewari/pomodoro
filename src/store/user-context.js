import React from "react";
import { actions } from "./";

const UserContext = React.createContext({
  isLoggedIn: false,
  user: {},
});

const UserReducer = (state, action) => {
  switch (action.type) {
    case actions.login:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case actions.logout:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [user, dispatchUser] = React.useReducer(UserReducer, {
    isLoggedIn: false,
    user: {},
  });

  return (
    <UserContext.Provider value={{ ...user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
