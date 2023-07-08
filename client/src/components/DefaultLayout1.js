import React, { useState } from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";

function DefaultLayout1({ children }) {
  const navigate = useNavigate();
  const [collapsed, steCollapsed] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // State for logout modal visibility
  const { user } = useSelector((state) => state.users);
  console.log(user);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "bookings",
    },
    {
      name: "Profile",
      icon: "ri-file-user-line",
      path: "/profile",
    },
    {
      name: "Feedback",
      icon: "ri-feedback-line",
      path: "/feedback",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-r-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    ,
    {
      name: "Dashboard",
      icon: "ri-dashboard-line",
      path: "/admin/dashboard",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-file-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-r-line",
    },
  ];

  const operatorMenu = [
    {
      name: 'Home',
      path: '/home',
      icon: 'ri-home-line'
    },
      {
        name: "Buses",
        path: "/operator/buses",
        icon: "ri-bus-line",
      },
      {
        name: "Logout",
        path: "/logout",
        icon: "ri-logout-box-r-line",
      },
    

  ]

  const menuToBeRendered = user?.isAdmin ? adminMenu : (user?.isOperator ? operatorMenu : userMenu);

  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  const handleLogout = () => {
    setLogoutModalVisible(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleCancel = () => {
    setLogoutModalVisible(false);
  };

  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">MBL</h1>
          <h1 className="role">
            <h1 className="role">
              {user?.firstName ? user.firstName : user.name}
              <br />
              Role: {user && user?.isAdmin ? "Admin" : ( user?.isOperator ? "Operator" : "User")}
            </h1>
          </h1>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
              >
                <i className={item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        showLogoutModal();
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              class="ri-menu-2-line"
              onClick={() => steCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              class="ri-close-circle-line"
              onClick={() => steCollapsed(!collapsed)}
            ></i>
          )}
        </div>
        <div className="content">{children} </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Logout"
        visible={logoutModalVisible}
        onCancel={handleCancel}
        onOk={handleLogout}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

export default DefaultLayout1;
