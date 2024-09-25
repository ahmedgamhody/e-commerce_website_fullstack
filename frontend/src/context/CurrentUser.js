import { createContext } from "react";
import { useState } from "react";

export const AuthUser = createContext();
function CurrentUserContext({ children }) {
  const [user, setUser] = useState({});

  return (
    <AuthUser.Provider value={{ user, setUser }}>{children}</AuthUser.Provider>
  );
}

export default CurrentUserContext;
