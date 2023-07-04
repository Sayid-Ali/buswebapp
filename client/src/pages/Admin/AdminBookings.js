import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { message, Modal, Table, Checkbox, Button } from "antd";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";

import { axiosInstance } from "../../helpers/axiosIntance";

function AdminBookings() {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const dispatch = useDispatch();

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => <span></span>,
    },
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedBookings((prev) => [...prev, record]);
            } else {
              setSelectedBookings((prev) =>
                prev.filter((booking) => booking.key !== record.key)
              );
            }
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const handlePrintSelected = () => {
    if (selectedBookings.length === 0) {
      message.error("Please select at least one booking.");
      return;
    }

    const printWindow = window.open("", "_blank");
    const htmlContent = selectedBookings.map((booking) => {
      return `
        <div>
          <p>Mumtaz Bus LTD</p>
          <p>Bus: ${booking.name}</p>
          <p>${booking.from} - ${booking.to}</p>
          <hr />
          <p>
            <span>Journey Date:</span> ${moment(booking.journeyDate).format(
              "DD-MM-YYYY HH:mm:ss"
            )}
          </p>
          <p>
            <span>Journey Time:</span> ${booking.departure}
          </p>
          <p>
            <hr />
            <span>Seat Numbers:</span> <br />
            ${booking.seats}
          </p>
          <hr />
          <p>
            <span>Total Amount:</span> ${booking.fare * booking.seats.length} /-
          </p>
          <p>
            <span>Printed Date:</span> ${moment().format("DD-MM-YYYY")}
          </p>
        </div>
      `;
    });

    printWindow.document.write(htmlContent.join(""));
    printWindow.print();
  };

  return (
    <div>
      <PageTitle title={"Bookings"} />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>
      {selectedBookings.length > 0 && (
        <div className="mt-2">
          <Button onClick={handlePrintSelected}>Print Selected Tickets</Button>
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
