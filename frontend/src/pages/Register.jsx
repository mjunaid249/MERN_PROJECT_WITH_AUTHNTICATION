import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../main";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [registered, setRegistered] = useState(false);
  const registerUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/new",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setRegistered(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setRegistered(false);
    }
  };

  if (registered) return <Navigate to={"/login"} />;

  return (
    <div className="login">
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <h1>Sign Up</h1>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Sign Up</button>
          <h4>Already have an account?</h4>
          <Link className="form-link" to={"/login"}>
            Login
          </Link>
        </form>
      </section>
    </div>
  );
};
