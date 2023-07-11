import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form, message } from "antd";
import { axiosInstance } from "../helpers/axiosIntance";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

function PassengerForm({
  showPassengerForm,
  setShowPassengerForm,
  selectedBusId,
  userData,
  showStripe,
  setShowStripe,
  bus,
  selectedSeats,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usersArray, setUsersArray] = useState([]);

  console.log('selectedSeats', selectedSeats)

  const onFinish = async (values) => {
    let users = [values];
    let userarr = users[0];
    console.log("users", userarr);
    try {
      setShowStripe(true);
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/book-seat",
        {
          bus: bus._id,
        //   users: usersArray,
          seats: selectedSeats,
          transactionId,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/make-payment",
        {
          token,
          amount: selectedSeats.length * bus.fare * 100,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setUsersArray([userData]);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      width={800}
      title="Confirm Details"
      visible={showPassengerForm}
      onCancel={() => setShowPassengerForm(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={24}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Middle Name" name="middleName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="ID Number" name="idNumber">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]} justify="end">
          <Col>
            <button className="primary-btn" onClick={onFinish}>
              Confirm
            </button>
          </Col>
        </Row>
      </Form>

      {showStripe && (
        <StripeCheckout
          billingAddress
          token={onToken}
          amount={bus.fare * selectedSeats.length * 100}
          currency="KES"
          stripeKey="pk_test_51NIsBDFTWFOfdLiuuDzFo81BBTv1BtJ6wOeo5KqoM4uFh4V6M88Bp04MEdzCx91HbKCoNBiwHzGlkaXZsU1wE1GV00IMud9F57"
        >
          {/* <button
            className='primary-btn'
            disabled={selectedSeats.length === 0}
          >
            Continue Booking
          </button> */}
        </StripeCheckout>
      )}
    </Modal>
  );
}

export default PassengerForm;
