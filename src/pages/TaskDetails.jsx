import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

export default function TaskDetails() {
  const { id } = useParams();

  const task = useSelector(s =>
    s.tasks.entities.find(t => t.id === id)
  );

  if (!task)
    return (
      <Layout>
        <p className="p-4">Task not found.</p>
      </Layout>
    );

  const statusBadge = {
    "Pending": "badge bg-warning text-dark",
    "In Progress": "badge bg-info text-dark",
    "Completed": "badge bg-success",
  };

  const priorityBadge = {
    "Low": "badge bg-secondary",
    "Medium": "badge bg-primary",
    "High": "badge bg-danger",
  };

  return (
    <Layout>
      <div className="container py-3">
        <div className="card shadow-sm border-0">
          {/* Header */}
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-card-checklist me-2"></i>
              Task Details
            </h5>

            <span className={statusBadge[task.status]}>
              {task.status}
            </span>
          </div>

          {/* Body */}
          <div className="card-body p-4">
            <h4 className="fw-semibold mb-3">{task.title}</h4>

            <p className="text-muted mb-4">
              {task.description || "No description provided"}
            </p>

            {/* Details Table */}
            <table className="table table-bordered mb-4">
              <tbody>
                <tr>
                  <th width="25%">Priority</th>
                  <td>
                    <span className={priorityBadge[task.priority]}>
                      {task.priority}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>
                    <span className={statusBadge[task.status]}>
                      {task.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>Due Date</th>
                  <td>{task.dueDate || "Not set"}</td>
                </tr>
              </tbody>
            </table>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <Link to="/tasks" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Back
              </Link>

              <Link to={`/edit-task/${task.id}`} className="btn btn-primary">
                <i className="bi bi-pencil-square me-2"></i>
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
