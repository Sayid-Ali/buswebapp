import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Table, Select } from "antd";
import moment from "moment";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosIntance";
import PageTitle from "../../components/PageTitle";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const { Option } = Select;

const styles = StyleSheet.create({
  container: {
    padding: 3,
    width: "100%",
  },
  title: {
    fontSize: 24,
    
    textAlign: "center",
    backgroundColor: "green",
    color: "white",
  },
  ptag: {
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "green",
    color: "white",
  },
  date: {
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "green",
    color: "#dbdbdb",
  },
  table: {
    marginTop: 10,
    display: "table",
    width: "100%",
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  tableCell: {
    padding: 5,
    fontSize: 8,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
});

const AdminUsers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [filter, setFilter] = useState("all");
  const [usertype, setUsertype] = useState("all users");

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

  const generateUserReport = () => {
    try {
      const data = filteredUsers || users;

      const MyDoc = () => (
        <Document>
          <Page size="A4">
            <View style={styles.container}>
              <Text style={styles.title}>Mumtaz bus ltd </Text>
             <Text style={styles.ptag}>{usertype}</Text>
             <Text style={styles.date}>
              Date Printed: {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Name</Text>
                  <Text style={styles.tableHeader}>Email</Text>
                  <Text style={styles.tableHeader}>Status</Text>
                  <Text style={styles.tableHeader}>Role</Text>
                </View>
                {data.map((user) => (
                  <View style={styles.tableRow} key={user.email}>
                    <Text style={styles.tableCell}>{user.firstName}</Text>
                    <Text style={styles.tableCell}>{user.email}</Text>
                    <Text style={styles.tableCell}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </Text>
                    <Text style={styles.tableCell}>
                      {user.isAdmin ? "Admin" : user.isOperator ? "Operator" : "User"}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      );

      return (
        <PDFDownloadLink document={<MyDoc />} fileName="user_report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              "Generating PDF..."
            ) : (
              <button className="primary-btn" type="primary">
                Download as PDF
              </button>
            )
          }
        </PDFDownloadLink>
      );
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
      setUsertype("all users");
    } else if (filter === "admins") {
      const admins = users.filter((user) => user.isAdmin);
      setUsertype("admins");
      setFilteredUsers(admins);
    } else if (filter === "operators") {
      const operators = users.filter((user) => user.isOperator);
      setFilteredUsers(operators);
      setUsertype("operators");
    }
    else if (filter === "users") {
      const regularUsers = users.filter(
        (user) => !user.isAdmin && !user.isBlocked && !user.isOperator
      );

      setFilteredUsers(regularUsers);
      setUsertype("regular users");
    } else if (filter === "blocked") {
      const blockedUsers = users.filter((user) => user.isBlocked);
      setFilteredUsers(blockedUsers);
      setUsertype("blocked users");
    } else if (filter === "active users") {
      const unblockedUsers = users.filter((user) => !user.isBlocked);
      setFilteredUsers(unblockedUsers);
      setUsertype("active users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    filterUsers(filter);
  }, [users, filter]);

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
  ];

  return (
    <>
      {user?.isAdmin && (
        <div>
          <div className="d-flex justify-content-between my-2">
            <PageTitle title="Registered Users" />
            {generateUserReport()}
          </div>
          <Select
            value={filter}
            style={{ marginBottom: "16px", width: "15%" }}
            onChange={handleFilterChange}
          >
            <Option value="all">All</Option>
            <Option value="admins">Admins</Option>
            <Option value="operators">Operators</Option>
            <Option value="users">Users</Option>
            <Option value="blocked">Blocked Users</Option>
            <Option value="active users">Unblocked Users</Option>
          </Select>
          <Table columns={columns} dataSource={filteredUsers || users} />
        </div>
      )}
    </>
  );
};

export default AdminUsers;
