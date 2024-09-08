import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar">
      <h3 className="logo">
        <span style={{ color: "#1E2A5E", fontSize: "40px" }}>
          ChalkBoard
        </span>
        <span>LMS</span>
      </h3>
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <li>
          <Link
            to="/home"
            className={location.pathname === "/home" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Sign Up
          </Link>
        </li>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
}

export default Header;
