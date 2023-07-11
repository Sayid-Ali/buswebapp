import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Card, message, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { axiosInstance } from '../../helpers/axiosIntance';
import { useDispatch } from 'react-redux';

const { Search } = Input;

function SingleOperatorBus() {
  const dispatch = useDispatch();
  const { bus } = useLocation().state;
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

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
      const response = await axiosInstance.get(
        `http://localhost:5000/api/bookings/get-bookings-by-bus-id?busId=${bus._id}`
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBookings(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    getUsers();
  }, [bookings]);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  const handleSearch = (value) => {
    if (value.trim() === '') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) => {
        const user = users.find((user) => user._id === booking.user);
        const fullName = `${user?.firstName} ${user?.middleName} ${user?.lastName}`.toLowerCase();
        const idNumber = user?.idNumber.toLowerCase();
        return (
          fullName.includes(value.toLowerCase()) ||
          idNumber.includes(value.toLowerCase())
        );
      });
      setFilteredBookings(filtered);
    }
  };

  const columns = [
    {
      title: 'Passenger Name',
      render: (record) => {
        const user = users.find((user) => user._id === record.user);
        return <span>{user?.firstName} {user?.middleName} {user?.lastName}</span>;
      },
      key: 'passengerName',
    },
    {
      title: 'Phone Number',
      render: (record) => {
        const user = users.find((user) => user._id === record.user);
        return <span>{user?.phoneNumber}</span>;
      },
    },
    {
      title: 'ID Number',
      render: (record) => {
        const user = users.find((user) => user._id === record.user);
        return <span>{user?.idNumber}</span>;
      },
      key: 'idNumber',
    },
    {
      title: 'Seat Number',
      render: (record) => <span>{record.seats.join(', ')}</span>,
      key: 'seatNumber',
    },
    {
      title: 'Total Fare',
      render: (record) => <span>{record.seats.length * bus.fare}</span>,
      key: 'fare',
    },
    {
      title: 'Date Booked',
      render: (record) => <span>{new Date(record.createdAt).toLocaleString()}</span>,
      key: 'dateBooked',
    },
    
  ];

   // Compute total fare
   const totalFare = filteredBookings.reduce(
    (total, booking) => total + booking.seats.length * bus.fare,
    0
  );

  return (
    <div className="bus-info-container">
      <h1 className="bus-info-title">Bus: {bus.number}</h1>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={true} className="bus-info-card">
            <p className="bus-info-label">Departure Date</p>
            {/* Replace with actual departure date and time */}
            <p className="bus-info-value">{bus.journeyDate} : {bus.departure}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={true} className="bus-info-card">
            <p className="bus-info-label">Seats Booked of Capacity</p>
            {/* Replace with actual seats booked and capacity */}
            <p className="bus-info-value">{bus.seatsBooked.length}/{bus.capacity}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={true} className="bus-info-card">
            <p className="bus-info-label">From and To</p>
            {/* Replace with actual from and to destinations */}
            <p className="bus-info-value">{bus.from} to {bus.to}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={true} className="bus-info-card">
            <p className="bus-info-label">Fare</p>
            {/* Replace with actual fare */}
            <p className="bus-info-value">{bus.fare}</p>
          </Card>
        </Col>
      </Row>

        <div className="my-3">
            <Search
                placeholder="Search by name or ID number"
                onSearch={handleSearch}
                enterButton
                // size="large"
                style={{ width: '30rem' }}
            />
        </div>


      <div className="" style={{position: 'relative'}}>
          <Table  columns={columns} dataSource={filteredBookings} footer={() => (
            <div style={{ fontWeight: 'bold', position: 'absolute', right:'18rem'}}>Total Fare: {totalFare}</div>
          )} />
      </div>
    </div>
  );
}

export default SingleOperatorBus;
