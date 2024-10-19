import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createContext } from "react";

export const Context = createContext({ isAuthenticated: false });

const AppWraper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <App />
      <Toaster />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWraper />
  </StrictMode>
);
