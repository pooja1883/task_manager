import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function AddTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    dueDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    dispatch(addTask(form)).then(() => navigate("/tasks"));
  };

  return (
    <Layout>
      <div className="container-fluid py-3">
        <h4 className="fw-semibold mb-3">
          <i className="bi bi-plus-circle me-2"></i>Add Task
        </h4>

        <form onSubmit={submit} className="card shadow-sm p-4">
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              name="title"
              placeholder="Enter task title"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              placeholder="Describe the task..."
              className="form-control"
              rows={3}
              onChange={handleChange}
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Priority</label>
              <select
                name="priority"
                className="form-select"
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                className="form-select"
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary px-4">
            <i className="bi bi-save me-2"></i>
            Save Task
          </button>
        </form>
      </div>
    </Layout>
  );
}
