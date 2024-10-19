import React, { useContext } from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const logouthandler = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/users/logout"
      );

      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };
  return (
    <header>
      <div className="logo">TODO APP .</div>
      <nav>
        <ul>
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          <Link to={"/profile"} className="nav-link">
            Profile
          </Link>
          {isAuthenticated ? (
            <button
              className="nav-link"
              onClick={() => {
                logouthandler();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
