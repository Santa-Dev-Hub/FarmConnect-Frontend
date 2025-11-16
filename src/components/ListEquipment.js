import React, { useState } from 'react';
import axios from 'axios';

function ListEquipment({ token }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    equipment_name: '',
    equipment_type: '',
    rental_rate_per_day: '',
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
        'process.env.REACT_APP_API_URL/api/equipment/list',
        formData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage('✅ Equipment listed successfully! It will now appear in the equipment browser.');
        setFormData({
          equipment_name: '',
          equipment_type: '',
          rental_rate_per_day: '',
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
      <h2>🚜 List Your Equipment</h2>

      {message && (
        <div className={message.includes('✅') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="equipment_name"
          placeholder="Equipment Name (e.g., Tractor John Deere)"
          value={formData.equipment_name}
          onChange={handleChange}
          required
        />

        <select
          name="equipment_type"
          value={formData.equipment_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Equipment Type</option>
          <option value="tractor">Tractor</option>
          <option value="harvester">Harvester</option>
          <option value="pump">Water Pump</option>
          <option value="drill">Drill Machine</option>
          <option value="sprayer">Sprayer</option>
        </select>

        <input
          type="number"
          name="rental_rate_per_day"
          placeholder="Rental Rate per Day (₹)"
          value={formData.rental_rate_per_day}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Listing...' : '📤 List Equipment'}
        </button>
      </form>
    </div>
  );
}

export default ListEquipment;
