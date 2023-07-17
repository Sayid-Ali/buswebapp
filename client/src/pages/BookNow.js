import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosIntance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, Row, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import StripeCheckout from "react-stripe-checkout";
import PassengerForm from "../components/PassengerForm";

function BookNow() {
  const { user } = useSelector((state) => state.users);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  console.log("show stripe", showStripe);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  console.log("bus", bus);
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/buses/get-bus-by-id",
        {
          _id: params.id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  // const bookNow = async (transactionId) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axiosInstance.post(
  //       "http://localhost:5000/api/bookings/book-seat",
  //       {
  //         bus: bus._id,
  //         seats: selectedSeats,
  //         transactionId,
  //       }
  //     );
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       navigate("/bookings");
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };
  //about the payment
  // const onToken = async (token) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axiosInstance.post(
  //       "http://localhost:5000/api/bookings/make-payment",
  //       {
  //         token,
  //         amount: selectedSeats.length * bus.fare * 100,
  //       }
  //     );
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       bookNow(response.data.data.transactionId);
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };
  console.log("show stripe", showStripe);

  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <p className="text-lg primary-text">{bus.number}</p>
            <p className="text-md">
              {bus.from} - {bus.to}
            </p>
            <hr />

            <div className="flex flex-col gap-2">
              <p className="text-md">Journey Date : {bus.journeyDate}</p>
              <p className="text-md">Fare:{bus.fare}</p>
              <hr />
              <p className="text-md">Departure Time : {bus.departure}</p>
              <p className="text-md">Arrival Time: {bus.arrivalTime}</p>
              <p className="text-md">Bus capacity : {bus.capacity}</p>
              <p className="text-md">
                {" "}
                Seats Left : {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">
                Selected Seats : {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-2xl mt-2">
                Price:ksh {bus.fare * selectedSeats.length}/-
              </h1>
              <hr />
              <button
                onClick={() => {
                  setShowPassengerForm(true);
                  // setShowStripe(true);
                }}
                className={`${
                  selectedSeats.length === 0 ? "disabled-btn" : ""
                } primary-btn`}
                disabled={selectedSeats.length === 0}
              >
                Book Now
              </button>

              <PassengerForm
                showPassengerForm={showPassengerForm}
                setShowPassengerForm={setShowPassengerForm}
                selectedBusId={bus._id}
                userData={user}
                showStripe={showStripe}
                setShowStripe={setShowStripe}
                bus={bus}
                selectedSeats={selectedSeats}
              />
              {showStripe ? "" : null}
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
