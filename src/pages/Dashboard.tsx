import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import "../styles/Dashboard.scss";
import { DashboardStats } from "../types";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await api.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className={`layout__sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      <div className="layout__main">
        <Header onMenuToggle={handleMenuToggle} />

        <div className="layout__content">
          <div className="dashboard__header">
            <h1 className="dashboard__title">Dashboard</h1>
            <p className="dashboard__subtitle">Welcome to your dashboard</p>
          </div>

          {stats && (
            <div className="dashboard__stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card__icon stat-card__icon--users">
                    👥
                  </div>
                  <div className="stat-card__content">
                    <h3 className="stat-card__label">USERS</h3>
                    <p className="stat-card__value">
                      {stats.users.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon stat-card__icon--active">
                    👥
                  </div>
                  <div className="stat-card__content">
                    <h3 className="stat-card__label">ACTIVE USERS</h3>
                    <p className="stat-card__value">
                      {stats.activeUsers.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon stat-card__icon--loans">
                    💰
                  </div>
                  <div className="stat-card__content">
                    <h3 className="stat-card__label">USERS WITH LOANS</h3>
                    <p className="stat-card__value">
                      {stats.usersWithLoans.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon stat-card__icon--savings">
                    🐷
                  </div>
                  <div className="stat-card__content">
                    <h3 className="stat-card__label">USERS WITH SAVINGS</h3>
                    <p className="stat-card__value">
                      {stats.usersWithSavings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="dashboard__actions">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/users")}
            >
              View All Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
