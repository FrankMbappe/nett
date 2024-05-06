import React from "react";
import User from "src/models/User";

const AuthContext = React.createContext<{
  currentUser?: User;
  setCurrentUser?: (user: User) => void;
}>({});

export default AuthContext;
