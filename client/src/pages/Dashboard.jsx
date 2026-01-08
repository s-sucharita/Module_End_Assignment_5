import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

function Dashboard() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title: task },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTask("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTasks();
  };

  const updateTask = async (id) => {
    const newTitle = prompt("Edit task:");
    if (!newTitle) return;

    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title: newTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTasks();
  };

  return (
    <div className="page">
      <Header />

      <main className="container">
        <div className="card dashboard-card">
          <div className="card-head">
            <div>
              <h2>My Tasks</h2>
              <div className="muted small">Manage and track your tasks</div>
            </div>
            <div className="task-count">{list.length}</div>
          </div>

          <div className="input-row">
            <input
              className="task-input"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task"
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button className="btn" onClick={addTask}>
              Add
            </button>
          </div>

          <div className="task-list">
            {list.length === 0 && (
              <div className="empty-state">
                <svg width="86" height="66" viewBox="0 0 86 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="8" width="82" height="50" rx="8" fill="rgba(255,255,255,0.03)" />
                  <path d="M18 28h50" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 36h34" stroke="rgba(255,255,255,0.04)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="muted">No tasks yet — add your first task.</div>
              </div>
            )}

            {list.map((t) => (
              <div className="task-item" key={t._id}>
                <span className="task-title">{t.title}</span>
                <div className="task-actions">
                  <button className="btn btn-sm" onClick={() => updateTask(t._id)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
