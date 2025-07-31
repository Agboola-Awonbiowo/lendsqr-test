import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import "../styles/Users.scss";
import { FilterOptions, User } from "../types";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterOptions>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await api.getUsers();
      let filteredUsers = allUsers;

      // Apply filters
      if (filters.organization) {
        filteredUsers = filteredUsers.filter((user) =>
          user.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())
        );
      }
      if (filters.username) {
        filteredUsers = filteredUsers.filter((user) =>
          user.username.toLowerCase().includes(filters.username.toLowerCase())
        );
      }
      if (filters.email) {
        filteredUsers = filteredUsers.filter((user) =>
          user.email.toLowerCase().includes(filters.email.toLowerCase())
        );
      }
      if (filters.status) {
        filteredUsers = filteredUsers.filter(
          (user) => user.status === filters.status
        );
      }

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    setCurrentPage(1);
  };

  const handleFilterApply = () => {
    setShowFilter(false);
    fetchUsers();
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserAction = async (
    userId: string,
    action: "activate" | "blacklist"
  ) => {
    try {
      const newStatus = action === "activate" ? "Active" : "Blacklisted";
      await api.updateUserStatus(userId, newStatus);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const getStatusClass = (status: User["status"]) => {
    return `status status--${status.toLowerCase()}`;
  };

  if (loading) {
    return (
      <div className="users">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="users">
      <div className={`layout__sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      <div className="layout__main">
        <Header onMenuToggle={handleMenuToggle} />

        <div className="layout__content">
          <div className="users__header">
            <h1 className="users__title">Users</h1>
            <div className="users__actions">
              <button
                className="btn btn--secondary"
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter
              </button>
            </div>
          </div>

          {showFilter && (
            <div className="users__filter">
              <div className="filter-card">
                <div className="filter-card__header">
                  <h3>Filter</h3>
                </div>
                <div className="filter-card__content">
                  <div className="filter-row">
                    <div className="filter-group">
                      <label>Organization</label>
                      <select
                        value={filters.organization}
                        onChange={(e) =>
                          handleFilterChange("organization", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Lendsqr">Lendsqr</option>
                        <option value="Irorun">Irorun</option>
                        <option value="Lendstar">Lendstar</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="User"
                        value={filters.username}
                        onChange={(e) =>
                          handleFilterChange("username", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="filter-row">
                    <div className="filter-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={filters.email}
                        onChange={(e) =>
                          handleFilterChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="filter-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={filters.date}
                        onChange={(e) =>
                          handleFilterChange("date", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="filter-row">
                    <div className="filter-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={filters.phoneNumber}
                        onChange={(e) =>
                          handleFilterChange("phoneNumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="filter-group">
                      <label>Status</label>
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Blacklisted">Blacklisted</option>
                      </select>
                    </div>
                  </div>
                  <div className="filter-actions">
                    <button
                      className="btn btn--secondary"
                      onClick={handleFilterReset}
                    >
                      Reset
                    </button>
                    <button
                      className="btn btn--primary"
                      onClick={handleFilterApply}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="users__table-container">
            <table className="users__table">
              <thead>
                <tr>
                  <th>ORGANIZATION</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>PHONE NUMBER</th>
                  <th>DATE JOINED</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user: User) => (
                  <tr key={user.id}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <span className={getStatusClass(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="user-actions">
                        <button
                          className="user-actions__toggle"
                          onClick={() => {
                            // Toggle dropdown menu
                          }}
                        >
                          ⋮
                        </button>
                        <div className="user-actions__menu">
                          <button onClick={() => navigate(`/users/${user.id}`)}>
                            View Details
                          </button>
                          <button
                            onClick={() =>
                              handleUserAction(user.id, "blacklist")
                            }
                          >
                            Blacklist User
                          </button>
                          <button
                            onClick={() =>
                              handleUserAction(user.id, "activate")
                            }
                          >
                            Activate User
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="users__pagination">
            <div className="pagination-info">
              <span>Showing</span>
              <select
                value={itemsPerPage}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setItemsPerPage(Number(e.target.value))
                }
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>out of {users.length}</span>
            </div>

            <div className="pagination-controls">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ‹
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span>...</span>
                  <button
                    className={`pagination-btn ${
                      currentPage === totalPages ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
