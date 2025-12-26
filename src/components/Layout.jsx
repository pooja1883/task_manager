import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(state => state.ui.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={`d-flex min-vh-100 ${theme === "dark" ? "theme-dark" : "theme-light"}`}>

      {/* Sidebar */}
      <aside className={`sidebar p-3 ${collapsed ? "collapsed" : ""}`}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          
          {!collapsed && (
            <h4 className="fw-bold m-0 sidebar-title d-flex align-items-center gap-2">
              <span className="material-icons plan-icon">
                event_available
              </span>
              PlanKit
            </h4>
          )}

          <button
            className="btn btn-light btn-sm"
            onClick={() => setCollapsed(prev => !prev)}
          >
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
          </button>
        </div>

        <nav className="nav flex-column gap-2">
          <NavLink to="/dashboard" className="nav-link sidebar-link">
            <i className="bi bi-speedometer2"></i>
            {!collapsed && <span className="ms-2">Dashboard</span>}
          </NavLink>

          <NavLink to="/tasks" className="nav-link sidebar-link">
            <i className="bi bi-list-task"></i>
            {!collapsed && <span className="ms-2">Tasks</span>}
          </NavLink>

          <NavLink to="/add-task" className="nav-link sidebar-link">
            <i className="bi bi-plus-circle"></i>
            {!collapsed && <span className="ms-2">Add Task</span>}
          </NavLink>

          <button
            onClick={handleLogout}
            className="btn btn-outline-danger mt-4 d-flex align-items-center justify-content-center"
          >
            <i className={`bi bi-box-arrow-right ${!collapsed ? "me-2" : ""}`}></i>
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-grow-1 p-4 dashboard-bg">
        {children}
      </main>
    </div>
  );
}
