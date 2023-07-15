import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Table, Select } from "antd";
import moment from "moment";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosIntance";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";

const { Option } = Select;

function AdminUsers() {
  const dispatch = useDispatch();
  //get user from dispatch
  const user = useSelector((state) => state.users.user);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(null); // Added state for filtered users
  const [filter, setFilter] = useState("all"); // Added state for filter selection

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-all-users",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateUserPermissions = async (user, action) => {
    try {
      let payload = null;
      if (action === "make-admin") {
        payload = {
          ...user,
          isAdmin: true,
        };
      } else if (action === "make-operator") {
        payload = {
          ...user,
          isOperator: true,
        };
      } else if (action === "remove-operator") {
        payload = {
          ...user,
          isOperator: false,
        };
      } else if (action === "remove-admin") {
        payload = {
          ...user,
          isAdmin: false,
        };
      } else if (action === "block") {
        payload = {
          ...user,
          isBlocked: true,
        };
      } else if (action === "unblock") {
        payload = {
          ...user,
          isBlocked: false,
        };
      }

      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/update-user-permissions",
        payload
      );

      dispatch(HideLoading());
      if (response.data.success) {
        getUsers();
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const generateUserReport = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/api/users/generate-user-report",
        { responseType: "blob" }
      );

      // Create a blob URL from the response data
      const blobUrl = URL.createObjectURL(response.data);

      // Create a temporary anchor element to initiate the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "user_report.pdf";
      link.click();

      // Clean up the temporary anchor element
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    filterUsers(value);
  };

  const filterUsers = (filter) => {
    if (filter === "all") {
      setFilteredUsers(null);
    } else if (filter === "admins") {
      const admins = users.filter((user) => user.isAdmin);
      setFilteredUsers(admins);
    } else if (filter === "users") {
      const regularUsers = users.filter(
        (user) => !user.isAdmin && !user.isBlocked
      );
      setFilteredUsers(regularUsers);
    } else if (filter === "blocked") {
      const blockedUsers = users.filter((user) => user.isBlocked);
      setFilteredUsers(blockedUsers);
    } else if (filter === "unblocked") {
      const unblockedUsers = users.filter((user) => !user.isBlocked);
      setFilteredUsers(unblockedUsers);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    filterUsers(filter);
  }, [users, filter]);

  // Define the columns variable here
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => {
        return data.isBlocked ? "Blocked" : "Active";
      },
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin) {
          return "Admin";
        } else if (data?.isOperator) {
          return "Operator";
        } else {
          return "User";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          {record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "unblock")}
            >
              UnBlock
            </p>
          )}
          {!record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "block")}
            >
              Block
            </p>
          )}
          {record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "remove-admin")}
            >
              Remove Admin
            </p>
          )}
          {!record?.isAdmin && !record?.isOperator && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "make-admin")}
            >
              Make Admin
            </p>
          )}
          {record?.isOperator && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "remove-operator")}
            >
              Remove Operator
            </p>
          )}
          {!record?.isOperator && !record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "make-operator")}
            >
              Make Operator
            </p>
          )}
        </div>
      ),
    },
  ];

  const handleGenerateUserReport = () => {
    generateUserReport();
  };

  return (
    <>
      {user?.isAdmin && (
        <div>
          <div className="d-flex justify-content-between my-2">
            <PageTitle title="Registered Users" />
            <button onClick={handleGenerateUserReport}>
              Generate Report
            </button>
          </div>
          <Select 
            value={filter}
            style={{ marginBottom: "16px", width:"15%" }}
            onChange={handleFilterChange}
          >
            <Option value="all">All</Option>
            <Option value="admins">Admins</Option>
            <Option value="users">Users</Option>
            <Option value="blocked">Blocked Users</Option>
            <Option value="unblocked">Unblocked Users</Option>
          </Select>
          <Table columns={columns} dataSource={filteredUsers || users} />
        </div>
      )}
    </>
  );
}

export default AdminUsers;
