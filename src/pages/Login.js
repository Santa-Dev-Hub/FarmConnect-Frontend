import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'FARMER'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister
        ? formData
        : { phone: formData.phone, password: formData.password };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        onLogin(response.data.user, response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🌾 FarmConnect</h1>
        <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isRegister && (
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="FARMER">I am a Farmer</option>
              <option value="WORKER">I am a Worker</option>
              <option value="COMPANY">I am a Company</option>
            </select>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login')}
          </button>
        </form>

        <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
          {isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}

export default Login;
