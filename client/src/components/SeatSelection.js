// seatselection.js
import React, { useState } from "react";
import { Col, Row } from "antd";
import { MdOutlineEventSeat } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import "../resources/bus.css"; // Import the CSS file

function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {
  const capacity = 59; // Set the desired capacity of 59 seats

  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="mx-5">
      <div className="bus-container">
        {/* DRIVER */}
        <button className="border w-full p-2">
          <GiSteeringWheel size={40} color="green" />
        </button>
        <Row gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((index) => {
            const seatNumber = index + 1;
            let seatClass = "";
            if (selectedSeats.includes(seatNumber)) {
              seatClass = "selected-seat";
            } else if (bus.seatsBooked.includes(seatNumber)) {
              seatClass = "booked-seat";
            }
            return (
              <Col span={6}>
                <div
                  className={`seat ${seatClass}`}
                  onClick={() => selectOrUnselectSeats(seatNumber)}
                >
                  <MdOutlineEventSeat
                    size={28}
                    color={seatClass === "booked-seat" ? "white" : "black"}
                  />
                  {seatNumber}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SeatSelection;
