import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";
import "../styles/Header.scss";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

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
        <div className="header__user">
          <div className="header__user-avatar">
            {user?.fullName?.charAt(0) || "A"}
          </div>
          <span className="header__user-name">
            {user?.fullName || "Adedeji"}
          </span>
          <button className="header__user-dropdown">▼</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
