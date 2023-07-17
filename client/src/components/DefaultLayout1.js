import React, { useState } from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";

function DefaultLayout1({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // State for logout modal visibility
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useSelector((state) => state.users);
  console.log(user);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/home",
    },

    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "/bookings",
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
      path: "/home",
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
      name: "Profile",
      icon: "ri-file-user-line",
      path: "/profile",
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
        name: "Profile",
        icon: "ri-file-user-line",
        path: "/profile",
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
      <div className="mobile-menu-toggle">
          {!mobileMenu ? (
            <i
            className="ri-menu-2-line"
            onClick={() => setMobileMenu(true)}
          ></i>
        ) : (
          <i
            className="ri-close-circle-line"
            onClick={() => setMobileMenu(false)}
          ></i>
        )}
            
        </div>
        <div className="sidebar-header">
          {/* <h1 className="logo">MBL</h1> */}
          <img src="images/logo1.png" alt="" className="logo"/>
          <span className="role">
            <h1 className="role">
              {user?.firstName ? user.firstName : user.name}
              <br />
              Role: {user && user?.isAdmin ? "Admin" : ( user?.isOperator ? "Operator" : "User")}
            </h1>
          </span>
        </div>
        <div className={`d-flex flex-column gap-3 justify-content-start
                            ${mobileMenu ? 'mobile-menu' : 'menu'}`}>
          {menuToBeRendered.map((item, index) => {

            return (
              <div
                key={index}
                //add mobile menu class
                className={`${
                  activeRoute === item.path && "active-menu-item"
                }  ${mobileMenu ? 'mobile-menu-item' : 'menu-item'} `}
              >
                <i className={item.icon}   onClick={() => {
                      if (item.path === "/logout") {
                        showLogoutModal();
                      } else {
                        navigate(item.path);
                      }
                    }} ></i>
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
              className="ri-menu-2-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              className="ri-close-circle-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          )}
        </div>
        
        <div className="content">{children} </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Logout"
        open={logoutModalVisible}
        onCancel={handleCancel}
        onOk={handleLogout}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

export default DefaultLayout1;
