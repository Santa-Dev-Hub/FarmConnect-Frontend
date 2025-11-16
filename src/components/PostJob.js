import React, { useState } from 'react';
import axios from 'axios';

function PostJob({ token }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    job_title: '',
    skill_required: '',
    workers_needed: 1,
    wage_per_day: '',
    job_date: '',
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
        'process.env.REACT_APP_API_URL/api/labour/post-job',
        formData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage('✅ Job posted successfully! Workers are being matched...');
        setFormData({
          job_title: '',
          skill_required: '',
          workers_needed: 1,
          wage_per_day: '',
          job_date: '',
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
      <h2>📝 Post a Labour Job</h2>

      {message && (
        <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="job_title"
          placeholder="Job Title (e.g., Harvesting)"
          value={formData.job_title}
          onChange={handleChange}
          required
        />

        <select
          name="skill_required"
          value={formData.skill_required}
          onChange={handleChange}
          required
        >
          <option value="">Select Required Skill</option>
          <option value="harvesting">Harvesting</option>
          <option value="pruning">Pruning</option>
          <option value="irrigation">Irrigation</option>
          <option value="weeding">Weeding</option>
          <option value="planting">Planting</option>
        </select>

        <input
          type="number"
          name="workers_needed"
          placeholder="Number of Workers Needed"
          value={formData.workers_needed}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="number"
          name="wage_per_day"
          placeholder="Wage per Day (₹)"
          value={formData.wage_per_day}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="job_date"
          value={formData.job_date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Posting...' : '📤 Post Job'}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
