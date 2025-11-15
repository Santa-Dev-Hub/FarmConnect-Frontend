import React, { useState } from 'react';
import PostJob from '../components/PostJob';
import PostAvailability from '../components/PostAvailability';
import ListEquipment from '../components/ListEquipment';
import EquipmentBrowser from '../components/EquipmentBrowser';
import CreateCampaign from '../components/CreateCampaign';

function Dashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="dashboard">
      <div className="navbar">
        <h1>🌾 FarmConnect</h1>
        <div className="user-info">
          <span>👤 {user.name} ({user.role})</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          🏠 Home
        </button>

        {user.role === 'FARMER' && (
          <>
            <button
              className={activeTab === 'post-job' ? 'active' : ''}
              onClick={() => setActiveTab('post-job')}
            >
              📝 Post Job
            </button>
            <button
              className={activeTab === 'list-equipment' ? 'active' : ''}
              onClick={() => setActiveTab('list-equipment')}
            >
              🚜 List Equipment
            </button>
          </>
        )}

        {user.role === 'WORKER' && (
          <button
            className={activeTab === 'availability' ? 'active' : ''}
            onClick={() => setActiveTab('availability')}
          >
            ✅ Post Availability
          </button>
        )}

        {user.role === 'COMPANY' && (
          <button
            className={activeTab === 'ads' ? 'active' : ''}
            onClick={() => setActiveTab('ads')}
          >
            📢 Create Campaign
          </button>
        )}

        <button
          className={activeTab === 'browse-equipment' ? 'active' : ''}
          onClick={() => setActiveTab('browse-equipment')}
        >
          🔍 Browse Equipment
        </button>
      </div>

      <div className="content">
        {activeTab === 'home' && (
          <div className="home">
            <h2>Welcome to FarmConnect! 👋</h2>
            <p className="welcome-text">Your role: <strong>{user.role}</strong></p>
            <div className="features">
              <div className="feature">
                <h3>💼 Labour Exchange</h3>
                <p>Connect farmers with workers efficiently. Post jobs and find skilled workers nearby.</p>
              </div>
              <div className="feature">
                <h3>🚜 Equipment Leasing</h3>
                <p>Rent or lease farm equipment from nearby owners. Save costs on expensive machinery.</p>
              </div>
              <div className="feature">
                <h3>📢 Targeted Ads</h3>
                <p>Reach farmers based on their needs. Data-driven advertising for better ROI.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'post-job' && <PostJob token={token} />}
        {activeTab === 'availability' && <PostAvailability token={token} />}
        {activeTab === 'list-equipment' && <ListEquipment token={token} />}
        {activeTab === 'browse-equipment' && <EquipmentBrowser token={token} />}
        {activeTab === 'ads' && <CreateCampaign token={token} />}
      </div>
    </div>
  );
}

export default Dashboard;
