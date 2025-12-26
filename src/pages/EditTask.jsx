import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../features/tasks/tasksSlice";
import Layout from "../components/Layout";

export default function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector(state =>
    state.tasks.entities.find(t => t.id === id)
  );

  const [form, setForm] = useState(task);

  if (!task) return <p className="p-4">Task not found.</p>;

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    dispatch(updateTask(form)).then(() => navigate("/tasks"));
  };

  return (
    <Layout>
      <div className="container py-4">
        <h4 className="fw-semibold mb-3">
          <i className="bi bi-pencil-square me-2"></i>Edit Task
        </h4>

        <form onSubmit={submit} className="card shadow-sm p-4 mt-2">
          <input
            name="title"
            className="form-control mb-3"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
          />

          <textarea
            name="description"
            className="form-control mb-3"
            value={form.description}
            rows={3}
            onChange={handleChange}
            placeholder="Task description..."
          />

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <select
                name="priority"
                className="form-select"
                value={form.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="col-md-4">
              <input
                type="date"
                name="dueDate"
                className="form-control"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary">
            <i className="bi bi-save me-2" />
            Update Task
          </button>
        </form>
      </div>
    </Layout>
  );
}
