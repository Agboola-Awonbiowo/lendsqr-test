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
        { path: "/dashboard", label: "Dashboard", icon: "🏠", active: true },
        { path: "/users", label: "Users", icon: "👥", active: true },
        { path: "/guarantors", label: "Guarantors", icon: "🛡️", active: false },
        { path: "/loans", label: "Loans", icon: "💰", active: false },
        {
          path: "/decision-models",
          label: "Decision Models",
          icon: "⚙️",
          active: false,
        },
        { path: "/savings", label: "Savings", icon: "🐷", active: false },
        {
          path: "/loan-requests",
          label: "Loan Requests",
          icon: "📋",
          active: false,
        },
        { path: "/whitelist", label: "Whitelist", icon: "📄", active: false },
        { path: "/karma", label: "Karma", icon: "⭐", active: false },
      ],
    },
    {
      section: "BUSINESSES",
      items: [
        {
          path: "/organization",
          label: "Organization",
          icon: "💼",
          active: false,
        },
        {
          path: "/loan-products",
          label: "Loan Products",
          icon: "💰",
          active: false,
        },
        {
          path: "/savings-products",
          label: "Savings Products",
          icon: "🐷",
          active: false,
        },
        {
          path: "/fees-charges",
          label: "Fees and Charges",
          icon: "📄",
          active: false,
        },
        {
          path: "/transactions",
          label: "Transactions",
          icon: "🔄",
          active: false,
        },
        { path: "/services", label: "Services", icon: "⚙️", active: false },
        {
          path: "/service-account",
          label: "Service Account",
          icon: "👤",
          active: false,
        },
        {
          path: "/settlements",
          label: "Settlements",
          icon: "📊",
          active: false,
        },
        { path: "/reports", label: "Reports", icon: "📈", active: false },
      ],
    },
    {
      section: "SETTINGS",
      items: [
        {
          path: "/preferences",
          label: "Preferences",
          icon: "⚙️",
          active: false,
        },
        {
          path: "/fees-pricing",
          label: "Fees and Pricing",
          icon: "💲",
          active: false,
        },
        { path: "/audit-logs", label: "Audit Logs", icon: "📋", active: false },
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
          <div className="sidebar__item sidebar__item--disabled" title="Coming soon">
            <span className="sidebar__item-icon">💼</span>
            <span>Switch Organization</span>
            <span style={{ marginLeft: "auto" }}>▼</span>
          </div>
        </div>

        {navItems.map((section) => (
          <div key={section.section} className="sidebar__section">
            <div className="sidebar__section-title">{section.section}</div>
            {section.items.map((item) => (
              item.active ? (
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
              ) : (
                <div
                  key={item.path}
                  className="sidebar__item sidebar__item--disabled"
                  title="Coming soon"
                >
                  <span className="sidebar__item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
