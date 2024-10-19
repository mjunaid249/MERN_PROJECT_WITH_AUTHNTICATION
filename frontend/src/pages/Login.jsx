import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const LoginUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            LoginUser();
          }}
        >
          <h1>Login</h1>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <h4>OR</h4>
          <Link className="form-link" to={"/register"}>
            Sign Up
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
