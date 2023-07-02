import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resources/auth.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        window.location.href = "/";
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
            <input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register">Click here to Register</Link>
            <button className="secondary-btn" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>

      <div className="footer">
        &copy; {new Date().getFullYear()} Mumtaz Bus LTD
      </div>
    </div>
  );
}

export default Login;
