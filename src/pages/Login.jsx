import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(s => s.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");

    dispatch(login(form));

    // if login succeeded, redirect
    if (form.email === "admin@test.com" && form.password === "123456") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h4 className="fw-bold mb-3 text-center">Login</h4>

      {error && (
        <div className="alert alert-danger py-2">{error}</div>
      )}

      <form onSubmit={submit} className="card shadow-sm p-4">

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>

      </form>
    </div>
  );
}
