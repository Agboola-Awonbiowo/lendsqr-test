import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import "../styles/UserDetails.scss";
import { User } from "../types";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserDetails(id);
    }
  }, [id]);

  const fetchUserDetails = async (userId: string) => {
    setLoading(true);
    try {
      // First try to get from localStorage
      const storedUser = localStorage.getItem(`user_${userId}`);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
        return;
      }

      // If not in localStorage, fetch from API
      const userData = await api.getUserById(userId);
      if (userData) {
        setUser(userData);
        // Store in localStorage for future use
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserAction = async (action: "activate" | "blacklist") => {
    if (!user) return;

    try {
      const newStatus = action === "activate" ? "Active" : "Blacklisted";
      await api.updateUserStatus(user.id, newStatus);

      // Update local state and localStorage
      const updatedUser = { ...user, status: newStatus as User["status"] };
      setUser(updatedUser);
      localStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // const getStatusClass = (status: User["status"]) => {
  //   return `status status--${status.toLowerCase()}`;
  // };

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={`star ${i < tier ? "filled" : ""}`}>
        ⭐
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="user-details">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details">
        <div className="error">User not found</div>
      </div>
    );
  }

  return (
    <div className="user-details">
      <div className={`layout__sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      <div className="layout__main">
        <Header onMenuToggle={handleMenuToggle} />

        <div className="layout__content">
          <div className="user-details__header">
            <button className="back-button" onClick={() => navigate("/users")}>
              ← Back to Users
            </button>

            <div className="user-details__actions">
              <button
                className="btn btn--danger"
                onClick={() => handleUserAction("blacklist")}
              >
                BLACKLIST USER
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => handleUserAction("activate")}
              >
                ACTIVATE USER
              </button>
            </div>
          </div>

          <div className="user-details__summary">
            <div className="user-summary">
              <div className="user-summary__avatar">
                <div className="avatar">{user.fullName?.charAt(0) || "U"}</div>
              </div>

              <div className="user-summary__info">
                <h2 className="user-summary__name">{user.fullName}</h2>
                <p className="user-summary__id">{user.id}</p>

                <div className="user-summary__tier">
                  <span>User's Tier</span>
                  <div className="tier-stars">{renderStars(user.tier)}</div>
                </div>
              </div>

              <div className="user-summary__financial">
                <h3 className="user-summary__balance">{user.accountBalance}</h3>
                <p className="user-summary__account">
                  {user.accountNumber}/{user.bank}
                </p>
              </div>
            </div>
          </div>

          <div className="user-details__tabs">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "general" ? "active" : ""}`}
                onClick={() => setActiveTab("general")}
              >
                General Details
              </button>
              <button
                className={`tab ${activeTab === "documents" ? "active" : ""}`}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </button>
              <button
                className={`tab ${activeTab === "bank" ? "active" : ""}`}
                onClick={() => setActiveTab("bank")}
              >
                Bank Details
              </button>
              <button
                className={`tab ${activeTab === "loans" ? "active" : ""}`}
                onClick={() => setActiveTab("loans")}
              >
                Loans
              </button>
              <button
                className={`tab ${activeTab === "savings" ? "active" : ""}`}
                onClick={() => setActiveTab("savings")}
              >
                Savings
              </button>
              <button
                className={`tab ${activeTab === "app" ? "active" : ""}`}
                onClick={() => setActiveTab("app")}
              >
                App and System
              </button>
            </div>
          </div>

          <div className="user-details__content">
            {activeTab === "general" && (
              <div className="details-section">
                <div className="details-grid">
                  <div className="detail-group">
                    <h4>Personal Information</h4>
                    <div className="detail-item">
                      <span className="detail-label">FULL NAME</span>
                      <span className="detail-value">{user.fullName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">PHONE NUMBER</span>
                      <span className="detail-value">{user.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">EMAIL ADDRESS</span>
                      <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">BVN</span>
                      <span className="detail-value">{user.bvn}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">GENDER</span>
                      <span className="detail-value">{user.gender}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">MARITAL STATUS</span>
                      <span className="detail-value">{user.maritalStatus}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">CHILDREN</span>
                      <span className="detail-value">{user.children}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">TYPE OF RESIDENCE</span>
                      <span className="detail-value">
                        {user.typeOfResidence}
                      </span>
                    </div>
                  </div>

                  <div className="detail-group">
                    <h4>Education and Employment</h4>
                    <div className="detail-item">
                      <span className="detail-label">LEVEL OF EDUCATION</span>
                      <span className="detail-value">
                        {user.levelOfEducation}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">EMPLOYMENT STATUS</span>
                      <span className="detail-value">
                        {user.employmentStatus}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">SECTOR OF EMPLOYMENT</span>
                      <span className="detail-value">
                        {user.sectorOfEmployment}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                        DURATION OF EMPLOYMENT
                      </span>
                      <span className="detail-value">
                        {user.durationOfEmployment}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">OFFICE EMAIL</span>
                      <span className="detail-value">{user.officeEmail}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">MONTHLY INCOME</span>
                      <span className="detail-value">{user.monthlyIncome}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">LOAN REPAYMENT</span>
                      <span className="detail-value">{user.loanRepayment}</span>
                    </div>
                  </div>

                  <div className="detail-group">
                    <h4>Socials</h4>
                    <div className="detail-item">
                      <span className="detail-label">TWITTER</span>
                      <span className="detail-value">{user.twitter}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">FACEBOOK</span>
                      <span className="detail-value">{user.facebook}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">INSTAGRAM</span>
                      <span className="detail-value">{user.instagram}</span>
                    </div>
                  </div>

                  <div className="detail-group">
                    <h4>Guarantor</h4>
                    {user.guarantors.map((guarantor, index) => (
                      <div key={index} className="guarantor">
                        <div className="detail-item">
                          <span className="detail-label">FULL NAME</span>
                          <span className="detail-value">
                            {guarantor.fullName}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">PHONE NUMBER</span>
                          <span className="detail-value">
                            {guarantor.phoneNumber}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">EMAIL ADDRESS</span>
                          <span className="detail-value">
                            {guarantor.emailAddress}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">RELATIONSHIP</span>
                          <span className="detail-value">
                            {guarantor.relationship}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="details-section">
                <p>Documents section - No documents available</p>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="details-section">
                <div className="detail-group">
                  <h4>Bank Details</h4>
                  <div className="detail-item">
                    <span className="detail-label">BANK</span>
                    <span className="detail-value">{user.bank}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ACCOUNT NUMBER</span>
                    <span className="detail-value">{user.accountNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ACCOUNT BALANCE</span>
                    <span className="detail-value">{user.accountBalance}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="details-section">
                <p>Loans section - No loan information available</p>
              </div>
            )}

            {activeTab === "savings" && (
              <div className="details-section">
                <p>Savings section - No savings information available</p>
              </div>
            )}

            {activeTab === "app" && (
              <div className="details-section">
                <p>App and System section - No system information available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
