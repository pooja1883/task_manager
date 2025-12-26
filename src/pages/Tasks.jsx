import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { deleteTask } from "../features/tasks/tasksSlice";

export default function Tasks() {
  const tasks = useSelector(s => s.tasks.entities);
  const dispatch = useDispatch();

  const handleDelete = id => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold">Tasks</h4>

        <Link to="/add-task" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Task
        </Link>
      </div>

      <div className="card p-3 shadow-sm">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>

                <td>
                  {t.status === "Completed" ? (
                    <span className="badge bg-success">Completed</span>
                  ) : (
                    <span className="badge bg-warning text-dark">{t.status}</span>
                  )}
                </td>

                <td>
                  <Link to={`/tasks/${t.id}`} className="btn btn-sm btn-outline-primary me-2">
                    Details
                  </Link>

                  <Link to={`/edit-task/${t.id}`} className="btn btn-sm btn-outline-secondary me-2">
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <p className="text-center text-muted mt-3">
            No tasks yet. Create one!
          </p>
        )}
      </div>
    </Layout>
  );
}
