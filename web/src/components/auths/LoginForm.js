import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <div className={classes.container}>
        <br />
        <form onSubmit={handleSubmitLogin}>
          <div>
            <label htmlFor="username"> </label>
            <input
              className={classes.loginInput}
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"> </label>
            <input
              className={classes.loginInput}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={classes.loginButton} type="submit">
              ล็อกอิน
            </button>
          </div>
        </form>
        <hr/>
        <div>
          <button
            className={classes.button}
            onClick={() => navigate("/register")}
          >
            สมัครสมาชิก
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
