import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  function handleDeletePost() {
    setDeleted(true);
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-card">
        <div className="welcome-section">
          <p className="eyebrow">LOGIN SUCCESSFUL</p>
          <h1>
            Welcome, {currentUser?.username} ({currentUser?.role})
          </h1>
          <p className="muted">
            Your available action depends on the role selected during login.
          </p>
        </div>

        <div className="role-action">
          {currentUser?.role === 'Admin' ? (
            <>
              <div className="access-box admin-access">
                <h2>Admin Access</h2>
                <p>As an Admin, you can manage posts.</p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeletePost}
                  disabled={deleted}
                >
                  {deleted ? 'Post Deleted' : 'Delete Post'}
                </button>
              </div>
            </>
          ) : (
            <div className="access-box viewer-access">
              <h2>Viewer Access</h2>
              <p>Read-only access</p>
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn btn-secondary logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
