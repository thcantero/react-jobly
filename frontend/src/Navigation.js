import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobly } from './JoblyContext';

function Navigation() {
  const { currentUser, logout } = useJobly();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>
        
        <div className="navbar-nav ms-auto">
          {currentUser ? (
            <>
              <Link className="nav-link" to="/companies">
                Companies
              </Link>
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <span className="navbar-text me-3">
                Welcome, {currentUser.username}!
              </span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;