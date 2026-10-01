import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(role) {
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    setError('');

    try {
      login(username, role);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <p className="eyebrow">ROLE-BASED LOGIN</p>
          <h1>Login Form</h1>
          <p className="muted">
            Enter your username and choose a role to continue.
          </p>
        </div>

        <div className="auth-form">
          <label className="form-label">
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError('');
              }}
              placeholder="Enter your username"
              className="input-field"
            />
          </label>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="login-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleLogin('Admin')}
            >
              Login as Admin
            </button>

            <button
              type="button"
              className="btn btn-viewer"
              onClick={() => handleLogin('Viewer')}
            >
              Login as Viewer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
