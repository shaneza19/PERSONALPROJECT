import React, { useState } from "react";
import axios from "axios";
import { Form, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import localStorageService from "../../services/LocalStorageService";
import buttonstyle from "./Button.module.css";
import classes from "./Login.module.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = { username, password };
      const response = await axios.post(
        "http://localhost:8000/user/login",
        user
      );
      setUser(response.data);
      // store the user in localStorage in string format
      localStorage.setItem("user", JSON.stringify(response.data));
      //set Token and role
      localStorageService.setToken(response.data.token);
      props.setRole("user");
      notification.success({
        message: `เข้าสู่ระบบสำเร็จ`,
        placement: `bottomRight`,
      });
      navigate('/profile');
    } catch {
      notification.error({
        message: `การเข้าระบบล้มเหลว`,
        placement: `bottomRight`,
      });
    }
  };

  return (
    <div>
      <br /> <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">ชื่อผู้ใช้งาน: </label>
        <input
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUsername(target.value)}
          style={{ "border-radius": "4px", border: "4px solid grey" }}
        />
        <br /> <br />
        <div>
          <label htmlFor="password">&nbsp;&nbsp;&nbsp;พาสเวิร์ด: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ "border-radius": "4px", border: "4px solid grey" }}
          />
        </div>
        <br /> <br />
        
        <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
          <button className={buttonstyle.glowOnHover} type="submit">
          ล็อกอิน (Login)
          </button>
        </Form.Item>
      </form>
    
      <Link to="/register">
        <button className={buttonstyle.button}>
          สมัครสมาชิกใหม่ (Register)
        </button>
      </Link>
    </div>
  );
};

export default Login;

