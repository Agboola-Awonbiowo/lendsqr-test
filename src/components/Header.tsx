import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/Header.scss";
import Logo from "./Logo";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  return (
    <header className="header">
      <div className="header__left">
        <button className="mobile-menu-toggle" onClick={onMenuToggle}>
          ☰
        </button>
        <div className="logo">
          <Logo height={30} width={145} />
        </div>
      </div>

      <form className="header__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="header__search-input"
        />
        <button type="submit" className="header__search-button">
          🔍
        </button>
      </form>

      <div className="header__right">
        <button className="header__docs" type="button">
          Docs
        </button>
        <button className="header__notifications">🔔</button>
        <div className="header__user" ref={dropdownRef}>
          <div className="header__user-avatar">
            {user?.fullName?.charAt(0) || "A"}
          </div>
          <span className="header__user-name">
            {user?.fullName || "Adedeji"}
          </span>
          <button
            className="header__user-dropdown"
            onClick={toggleUserDropdown}
            aria-label="User menu"
          >
            ▼
          </button>

          {showUserDropdown && (
            <div className="header__user-dropdown-menu">
              <div className="header__user-dropdown-item">
                <span className="header__user-dropdown-label">Profile</span>
              </div>
              <div className="header__user-dropdown-item">
                <span className="header__user-dropdown-label">Settings</span>
              </div>
              <div className="header__user-dropdown-divider"></div>
              <button
                className="header__user-dropdown-item header__user-dropdown-item--logout"
                onClick={handleLogout}
              >
                <span className="header__user-dropdown-label">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
