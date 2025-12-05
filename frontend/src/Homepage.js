import React from 'react';
import { useJobly } from './JoblyContext';
import { Link } from 'react-router-dom';

function Homepage() {
  const { currentUser } = useJobly();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Jobly</h1>
          <p className="lead mb-4">
            All the jobs in one, convenient place.
          </p>
          
          {currentUser ? (
            <div>
              <h2>Welcome Back, {currentUser.firstName}!</h2>
              <p>Ready to continue your job search?</p>
              <div className="mt-4">
                <Link to="/companies" className="btn btn-primary me-3">
                  Browse Companies
                </Link>
                <Link to="/jobs" className="btn btn-success">
                  View Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p>Please log in or sign up to get started.</p>
              <div className="mt-4">
                <Link to="/login" className="btn btn-primary me-3">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-success">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;