import React, { useState } from 'react';
import axios from 'axios';

function CreateCampaign({ token }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState(null);
  const [formData, setFormData] = useState({
    campaign_name: '',
    ad_content: '',
    target_role: 'FARMER',
    budget: ''
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
        'process.env.REACT_APP_API_URL/api/ads/campaign',
        formData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage('✅ Campaign created successfully!');
        getTargetAudience();
        setFormData({
          campaign_name: '',
          ad_content: '',
          target_role: 'FARMER',
          budget: ''
        });
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getTargetAudience = async () => {
    try {
      const response = await axios.get(
        `process.env.REACT_APP_API_URL/api/ads/target-audience?target_role=${formData.target_role}`
      );

      if (response.data.success) {
        setTargetAudience(response.data);
      }
    } catch (error) {
      console.error('Error fetching audience:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>📢 Create Ad Campaign</h2>

      {message && (
        <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="campaign_name"
          placeholder="Campaign Name"
          value={formData.campaign_name}
          onChange={handleChange}
          required
        />

        <textarea
          name="ad_content"
          placeholder="Ad Content (Describe your product or service)"
          value={formData.ad_content}
          onChange={handleChange}
          required
          rows="5"
        />

        <select name="target_role" value={formData.target_role} onChange={handleChange}>
          <option value="FARMER">Target: Farmers</option>
          <option value="WORKER">Target: Workers</option>
        </select>

        <input
          type="number"
          name="budget"
          placeholder="Budget (₹)"
          value={formData.budget}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Creating...' : '✨ Create Campaign'}
        </button>
        <button
          type="button"
          onClick={getTargetAudience}
          style={{ marginTop: '10px', background: '#764ba2' }}
        >
          👥 Check Target Audience
        </button>
      </form>

      {targetAudience && (
        <div className="audience-info">
          <h3>👥 Target Audience</h3>
          <p>Your campaign will reach <strong>{targetAudience.audience_count}</strong> {formData.target_role}s</p>
          <div className="audience-list">
            {targetAudience.audience.slice(0, 10).map((user, index) => (
              <div key={index} className="audience-item">
                {user.name} - {user.phone}
              </div>
            ))}
            {targetAudience.audience_count > 10 && (
              <div className="audience-item">
                ... and {targetAudience.audience_count - 10} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCampaign;
