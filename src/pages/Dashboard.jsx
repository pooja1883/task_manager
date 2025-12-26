import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toggleTheme } from "../features/ui/uiSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector(s => s.tasks.entities);
  const theme = useSelector(s => s.ui.theme);

  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  const completionPercent =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  // Show last 5 tasks
  const recent = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Layout>
      {/* HEADER + THEME TOGGLE */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold m-0">Dashboard</h3>

        <button
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => dispatch(toggleTheme())}
        >
          <i className={`bi ${theme === "light" ? "bi-moon" : "bi-sun"}`} />
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div
            className="stat-card total p-3 interactive-card"
            onClick={() => navigate("/tasks")}
          >
            <div className="icon fs-3 mb-2"><i className="bi bi-list-task"></i></div>
            <h6 className="text-muted">Total Tasks</h6>
            <h3>{tasks.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="stat-card completed p-3 interactive-card"
            onClick={() => navigate("/tasks")}
          >
            <div className="icon fs-3 mb-2"><i className="bi bi-check2-circle"></i></div>
            <h6 className="text-muted">Completed</h6>
            <h3>{completed}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="stat-card p-3 interactive-card"
            style={{ background: "linear-gradient(135deg,#d7f1ff,#eef8ff)" }}
            onClick={() => navigate("/tasks")}
          >
            <div className="icon fs-3 mb-2"><i className="bi bi-arrow-repeat"></i></div>
            <h6 className="text-muted">In Progress</h6>
            <h3>{inProgress}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="stat-card pending p-3 interactive-card"
            onClick={() => navigate("/tasks")}
          >
            <div className="icon fs-3 mb-2"><i className="bi bi-hourglass-split"></i></div>
            <h6 className="text-muted">Pending</h6>
            <h3>{pending}</h3>
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="card p-3 mb-4 shadow-sm">
        <h6 className="text-muted mb-2">Overall Progress</h6>

        <div className="progress" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        <small className="text-muted mt-2 d-block">
          {completionPercent}% tasks completed
        </small>
      </div>

      {/* RECENT TASKS */}
      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="m-0 text-muted">Recent Tasks</h6>
          <Link to="/tasks" className="btn btn-sm btn-outline-primary">
            View All
          </Link>
        </div>

        {recent.length === 0 && (
          <p className="text-muted text-center m-0">No tasks yet.</p>
        )}

        {recent.length > 0 && (
          <ul className="list-group list-group-flush">
            {recent.map(t => (
              <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{t.title}</span>

                {t.status === "Completed" ? (
                  <span className="badge bg-success">Completed</span>
                ) : t.status === "In Progress" ? (
                  <span className="badge bg-info text-dark">In Progress</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pending</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
