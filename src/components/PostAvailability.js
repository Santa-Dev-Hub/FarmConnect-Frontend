import React, { useState } from 'react';
import axios from 'axios';

function PostAvailability({ token }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    skills: '',
    availability_date: '',
    hourly_rate: '',
    location_lat: 28.7041,
    location_lng: 77.1025
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'process.env.REACT_APP_API_URL/api/labour/post-availability',
        formData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage('✅ Availability posted! Jobs matching your skills will appear shortly...');
        setFormData({
          skills: '',
          availability_date: '',
          hourly_rate: '',
          location_lat: 28.7041,
          location_lng: 77.1025
        });
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>✅ Post Your Availability</h2>

      {message && (
        <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="skills"
          placeholder="Your Skills (e.g., harvesting, pruning)"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="availability_date"
          value={formData.availability_date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="hourly_rate"
          placeholder="Your Hourly Rate (₹)"
          value={formData.hourly_rate}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Posting...' : '📤 Post Availability'}
        </button>
      </form>
    </div>
  );
}

export default PostAvailability;
