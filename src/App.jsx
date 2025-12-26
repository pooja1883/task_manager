import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 👇 ADD THIS ROUTE */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
