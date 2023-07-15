import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

function ForgetPasswordPage() {
  const onFinish = (values) => {

    // Handle form submission here
    console.log('Submitted values:', values);
    // Send a request to the server's password reset API endpoint
    // with the entered email for further processing
  };
  

  return (
    <div className="container4">
      <h1>Forget Password</h1>
      <Form onFinish={onFinish} className="form py-2 justify-content-center;">
        <Form.Item 
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-between">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/register">
              <Button type="link">Register</Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgetPasswordPage;
