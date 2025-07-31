import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.scss";
import Logo from "./Logo";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      section: "CUSTOMERS",
      items: [
        { path: "/dashboard", label: "Dashboard", icon: "🏠" },
        { path: "/users", label: "Users", icon: "👥" },
        { path: "/guarantors", label: "Guarantors", icon: "🛡️" },
        { path: "/loans", label: "Loans", icon: "💰" },
        { path: "/decision-models", label: "Decision Models", icon: "⚙️" },
        { path: "/savings", label: "Savings", icon: "🐷" },
        { path: "/loan-requests", label: "Loan Requests", icon: "📋" },
        { path: "/whitelist", label: "Whitelist", icon: "📄" },
        { path: "/karma", label: "Karma", icon: "⭐" },
      ],
    },
    {
      section: "BUSINESSES",
      items: [
        { path: "/organization", label: "Organization", icon: "💼" },
        { path: "/loan-products", label: "Loan Products", icon: "💰" },
        { path: "/savings-products", label: "Savings Products", icon: "🐷" },
        { path: "/fees-charges", label: "Fees and Charges", icon: "📄" },
        { path: "/transactions", label: "Transactions", icon: "🔄" },
        { path: "/services", label: "Services", icon: "⚙️" },
        { path: "/service-account", label: "Service Account", icon: "👤" },
        { path: "/settlements", label: "Settlements", icon: "📊" },
        { path: "/reports", label: "Reports", icon: "📈" },
      ],
    },
    {
      section: "SETTINGS",
      items: [
        { path: "/preferences", label: "Preferences", icon: "⚙️" },
        { path: "/fees-pricing", label: "Fees and Pricing", icon: "💲" },
        { path: "/audit-logs", label: "Audit Logs", icon: "📋" },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <div className="logo">
          <Logo height={30} width={145} />
        </div>
      </div>

      <div className="sidebar__nav">
        <div className="sidebar__section">
          <div className="sidebar__section-title">Switch Organization</div>
          <Link to="#" className="sidebar__item">
            <span className="sidebar__item-icon">💼</span>
            <span>Switch Organization</span>
            <span style={{ marginLeft: "auto" }}>▼</span>
          </Link>
        </div>

        {navItems.map((section) => (
          <div key={section.section} className="sidebar__section">
            <div className="sidebar__section-title">{section.section}</div>
            {section.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar__item ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <span className="sidebar__item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
