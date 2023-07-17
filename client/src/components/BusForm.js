import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form, message, Select } from "antd";
import { axiosInstance } from "../helpers/axiosIntance";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import moment from "moment";

const { Option } = Select;

function BusForm({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
  users,
}) {
  const user = useSelector((state) => state.users.user);
  console.log("user is admin", user.isAdmin);

  //get all operators from http://localhost:5000/api/operator/get-all-operators
  const [operators, setOperators] = useState([]);

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

  useEffect(() => {
    getOperators();
  }, []);

  console.log("operators", operators);
  const dispatch = useDispatch();
  const validateDate = (_, value) => {
    const currentDate = moment().format("YYYY-MM-DD");
    if (moment(value).isSameOrBefore(currentDate)) {
      return Promise.reject("Please select a future date.");
    }
    return Promise.resolve();
  };
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post(
          "http://localhost:5000/api/buses/add-bus",
          values
        );
      } else {
        response = await axiosInstance.post(
          "http://localhost:5000/api/buses/update-bus",
          {
            ...values,
            _id: selectedBus._id,
          }
        );
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus(null);

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  
  return (
    <Modal
      width={800}
      title={type === "add" && user?.isAdmin ? "Add Bus" : "Update bus"}
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Number Plate"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Please enter the bus number plate.",
                },
              ]}
            >
              <input type="text" disabled={!user?.isAdmin} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[
                {
                  required: true,
                  message: "Please enter the bus capacity.",
                },
              ]}
            >
              <input type="text" disabled={!user?.isAdmin} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="From"
              name="from"
              rules={[
                { required: true, message: "Please select a departure location." },
              ]}
            >
              <Select
                placeholder="Select a location"
                disabled={!user?.isAdmin}
              >
                <Option value="Nairobi">Nairobi</Option>
                <Option value="Garissa">Garissa</Option>
                <Option value="Wajir">Wajir</Option>
                <Option value="Mandera">Mandera</Option>
                <Option value="Isiolo">Isiolo</Option>
                {/* Add more options here if needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="To"
              name="to"
              rules={[
                { required: true, message: "Please select a destination location." },
              ]}
            >
              <Select placeholder="Select a location" disabled={!user?.isAdmin}>
                <Option value="Nairobi">Nairobi</Option>
                <Option value="Garissa">Garissa</Option>
                <Option value="Wajir">Wajir</Option>
                <Option value="Mandera">Mandera</Option>
                <Option value="Isiolo">Isiolo</Option>
                {/* Add more options here if needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Model"
              name="model"
              rules={[
                { required: true, message: "Please enter the bus model." },
              ]}
            >
              <input type="text" disabled={!user?.isAdmin} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Engine"
              name="engine"
              rules={[
                { required: true, message: "Please enter the bus engine." },
              ]}
            >
              <input type="text" disabled={!user?.isAdmin} />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure">
              <input type="time" disabled={user?.isAdmin ? false : true} />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival">
              <input type="time" disabled={user?.isAdmin ? false : true} />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select a type." }]}
            >
              <select name="" id="" required disabled={user?.isAdmin ? false : true} >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Fare" name="fare">
                <input type="text" disabled={user?.isAdmin ? false : true} />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select name="" id="">
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
            
          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Assign Operator" name="operator"    rules={[{ required: true, message: "Please select an operator." }]}>
  <select name="operator" id="operator-select" disabled={user?.isAdmin ? false : true}>
    {operators?.map((operator) => (
      <option  value={operator._id} key={operator?._id} >
      
        {operator?.firstName ? operator.firstName : operator.name} 
      </option>
    ))}
  </select>


</Form.Item>
            
          </Col>
        </Row>
        <div className="d-flex-justify-content-end">
          <button className="primary-btn" type="submit">
          {type === "add" && user?.isAdmin ? "Add Bus" : "Update bus"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;
