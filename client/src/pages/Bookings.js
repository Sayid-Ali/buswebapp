import React, { useRef } from "react";
import moment from "moment";
import PageTitle from "../components/PageTitle";
import BusForm from "../components/BusForm";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosIntance";
import { message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";

function Bookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [userBooked, setUserBooked] = useState(null);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-all-users",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const allUsers = response.data.data;
        const bookingUserIds = bookings.map((booking) => booking.user);
        const usersForThisBus = allUsers.filter((user) =>
          bookingUserIds.includes(user._id)
        );
        setUsers(usersForThisBus);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
            // ...booking.bus.user,
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

  const usersForThisBus = users.filter((user) => user._id === userBooked);

  //table of the data in the bookings
  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => <span></span>,
    },
    // {
    //   title: "Name",
    //   dataIndex: "user",
    // },
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Reg",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Departure Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(" , ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <h1
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticket
          </h1>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getBookings();
    getUsers();
  }, []);
  console.log("boookings", bookings);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setShowPrintModal(false);
      setSelectedBooking(null);
    },
  });
  return (
    <div>
      <PageTitle title={"Bookings"} />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>
      {showPrintModal && (
        <Modal
          title="Print Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="d-flex flex-column p-5 " ref={componentRef}>
            <p style={{backgroundColor: 'green', color: 'white', padding: '1rem 1rem 0rem 0rem', textAlign:'center', marginBottom: '1rem', fontSize: '1.5rem'}}>Mumtaz Bus Limited</p>
            <p>Name: {selectedBooking?.user?.firstName} {selectedBooking?.user?.middleName} {selectedBooking?.user?.lastName}</p>
            <p>Bus: {selectedBooking?.number}</p>
            <p>
              {selectedBooking?.from} - {selectedBooking?.to}
            </p>
            <hr />
            <p>
              <span>Departure Date:</span>{" "}
              {moment(selectedBooking?.journeyDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <span>Departure Time:</span> {selectedBooking?.departure}
            </p>
            <p>
              <hr />
              <span>Seat Number(s):</span> <br />
              {selectedBooking?.seats.join(", ")}
            </p>
            <hr />
            <p>
              <span>Total Amount:</span>{" "}
              {selectedBooking?.fare * selectedBooking?.seats.length} /-
            </p>
            <p>
              <span>Printed Date:</span> {moment().format("DD-MM-YYYY-HH:mm")}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;
