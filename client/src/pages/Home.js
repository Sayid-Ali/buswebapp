import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosIntance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, Row, message } from "antd";
import Bus from "../components/Bus";
import { Select } from "antd";

const { Option } = Select;

function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [selectedBus, setSelectedBus] = useState("");
  const [filters, setFilters] = useState({});

  const getBuses = async () => {
    const tempFilters = {
      journeyDate: filters.journeyDate,
      from: filters.from,
      to: filters.to,
    };

    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/buses/get-all-buses",
        { filters: tempFilters },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const filteredBuses = response.data.data.filter((bus) => {
          return (
            (!tempFilters.from || bus.from === tempFilters.from) &&
            (!tempFilters.to || bus.to === tempFilters.to)
          );
        });
        setBuses(filteredBuses);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <Select
              style={{ width: "100%" }}
              placeholder="From"
              value={filters.from}
              onChange={(value) => setFilters({ ...filters, from: value })}
            >
              <Option value="Nairobi">Nairobi</Option>
              <Option value="Garissa">Garissa</Option>
              <Option value="Wajir">Wajir</Option>
              <Option value="Elwak">Elwak</Option>
              <Option value="Mandera">Mandera</Option>
              <Option value="Isiolo">Isiolo</Option>
              {/*  we can add more Option available locations */}
            </Select>
          </Col>
          <Col lg={6} sm={24}>
            <Select
              style={{ width: "100%" }}
              placeholder="To"
              value={filters.to}
              onChange={(value) => setFilters({ ...filters, to: value })}
            >
              <Option value="Nairobi">Nairobi</Option>
              <Option value="Garissa">Garissa</Option>
              <Option value="Wajir">Wajir</Option>
              <Option value="Elwak">Elwak</Option>
              <Option value="Mandera">Mandera</Option>
              <Option value="Isiolo">Isiolo</Option>

              {/*  we can add more Option available locations */}
            </Select>
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  journeyDate: e.target.value,
                  from: filters.from,
                  to: filters.to,
                })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Search
              </button>
              <button
                className="outlined px-3"
                onClick={() =>
                  setFilters({
                    from: "",
                    to: "",
                    journeyDate: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row gutter={[15, 15]}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus) => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
