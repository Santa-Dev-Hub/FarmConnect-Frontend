import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EquipmentBrowser({ token }) {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.get(
        'process.env.REACT_APP_API_URL/api/equipment/nearby?lat=28.7041&lng=77.1025',
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setEquipment(response.data.equipment);
        if (response.data.equipment.length === 0) {
          setMessage('No equipment found nearby');
        }
      }
    } catch (error) {
      setMessage(`Error fetching equipment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="equipment-container">
      <h2>🔍 Browse Equipment Near You</h2>

      {message && <div className="error-message">{message}</div>}

      <div className="filter-bar">
        <button onClick={fetchEquipment} disabled={loading}>
          {loading ? '⏳ Loading...' : '🔄 Refresh Equipment'}
        </button>
      </div>

      {loading ? (
        <p>Loading equipment...</p>
      ) : (
        <div className="equipment-grid">
          {equipment.length === 0 ? (
            <p>No equipment available</p>
          ) : (
            equipment.map(item => (
              <div key={item.id} className="equipment-card">
                <h3>{item.equipment_name}</h3>
                <p><strong>Type:</strong> {item.equipment_type}</p>
                <p><strong>Rate:</strong> ₹{item.rental_rate_per_day}/day</p>
                <p><strong>Distance:</strong> {item.distance_km} km</p>
                <button className="book-btn">📅 Book Now</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EquipmentBrowser;
