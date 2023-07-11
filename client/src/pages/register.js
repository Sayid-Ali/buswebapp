import React, { useState } from "react";
import { Form, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../resources/auth.css";


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFinish = async (values) => {
    console.log(values)
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        values
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      console.log("err", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-450 card p-3">
        <h1 className="text-lg">Mumtaz Bus Sign Up</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your First name!" },
                ]}
              >
                <input type="text" />
              </Form.Item>
              <Form.Item label="Middle Name" name="middleName">
                <input type="text" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your Last name!" },
                ]}
              >
                <input type="text" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email address!" },
                  {
                    pattern: /\.com$/,
                    message: "Email must end with '.com'!",
                  },
                ]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                label="ID Number"
                name="idNumber"
                rules={[
                  { required: true, message: "Please enter your ID number!" },
                ]}
              >
                <input type="text" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter your phone number!" },
                ]}
              >
                <input type="text" />
              </Form.Item>
              
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter a password!" }]}
              >
                <div className="password-input">
                  <input type={passwordVisible ? "text" : "password"} />
                 
                  <div
                    className={`password-icon ${
                      passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                    }`}
                    onClick={togglePasswordVisibility}
                  >
                     <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <input type="password" />
              </Form.Item>
              
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/Login">Click here to Login</Link>
            <button className="secondary-btn" type="submit">
              Register
            </button>
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

export default Register;
