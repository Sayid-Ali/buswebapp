import React from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout1({ children }) {
  const navigate = useNavigate();
  const [collapsed, steCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "/bookings",
    },
    {
      name: "profile",
      icon: "ri-file-user-line",
      path: "/profile",
    },
    {
      name: "feedback",
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
  // const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }
  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">MBL</h1>
          <h1 className="role">
            <h1 className="role">
              {user?.name}
              <br />
              Role : {user && user?.isAdmin ? "Admin" : "User"}
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
                        localStorage.removeItem("token");
                        navigate("/login");
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
    </div>
  );
}

export default DefaultLayout1;
