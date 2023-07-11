import React from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosIntance";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import moment from "moment";

function OperatorBuses() {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBusForm, setShowBusForm] = React.useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const [operators, setOperators] = useState([]);
  console.log("user", user)
  const operatorWithUserEmail = operators.find((operator) => operator.email === user.email);
  console.log("operatorWithUserEmail", operatorWithUserEmail)
  const operatorsBuses = buses.filter((bus) => bus.operator === operatorWithUserEmail?._id);
  console.log("operatorsBuses", operatorsBuses)
const getOperators = async () => {
  try {
    dispatch(ShowLoading());
    const response = await axiosInstance.get(
      "http://localhost:5000/api/operator/get-all-operators",
      {}
    );
    dispatch(HideLoading());
    if (response.data.success) {
      setOperators(response.data.data);
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    dispatch(HideLoading());
    message.error(error.message);
  }
};


  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/buses/get-all-buses",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  //deletebus logic here
  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/buses/delete-bus",
        {
          _id: id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  //data tables
  const columns = [
 
    {
      title: "Number Plate",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      // render: (journeyDate) => moment(journeyDate).format("mm-dd-yyyy"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          {/* // if bus is completed show green check mark */}
          {record.status === "Completed" ? (
            <i className="ri-check-line text-success"></i>
          ) : (
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}
          ></i>
          )}
          <i
            className="ri-eye-line"
            onClick={() => {
              setSelectedBus(record);
              // navigate("/operator/buses/" + record._id);
             
              navigate("/operator/buses/" + record._id, {state : {bus: record}});
            }}
          ></i>
       
          
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses();
    getOperators();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Buses" />
        {/* <button className="primary-btn" onClick={() => setShowBusForm(true)}>
          Add Bus
        </button> */}
      </div>
      <Table columns={columns} dataSource={operatorsBuses} rowKey="_id" />
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
}

export default OperatorBuses;
