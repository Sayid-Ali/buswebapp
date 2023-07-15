import React, { useState } from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"; // Import the eye icons
import "../resources/auth.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        values
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/home";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-450 card p-3">
        <h1 className="text-lg">Mumtazbus Login</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <div className="password-input">
              <input type={passwordVisible ? "text" : "password"} />
              <span
                className="password-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </Form.Item>
          <div className="d-flex justify-content-end gap-3">
            <button className="secondary-btn login-btn" type="submit">
              Login
            </button>
            <button
              className="secondary-btn forgot-password-btn"
              type="button"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </button>
          </div>
          <div>
            <Link to="/register" className="signup-link">
              Don't have an account? Sign up
            </Link>
          </div>
        </Form>
      </div>
      <hr />
      <div className="footer2">
        &copy; {new Date().getFullYear()} Mumtaz Bus LTD
      </div>
    </div>
  );
}

export default Login;
