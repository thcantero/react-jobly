import React, { createContext, useContext, useState, useEffect } from 'react';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';

const JoblyContext = createContext();

export function useJobly() {
  return useContext(JoblyContext);
}

export function JoblyProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jobly-token"));
  const [applicationIds, setApplicationIds] = useState(new Set());

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
      localStorage.setItem("jobly-token", token);
    } else {
      JoblyApi.token = null;
      localStorage.removeItem("jobly-token");
    }
  }, [token]);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
          setApplicationIds(new Set(user.applications));
        } catch (err) {
          console.error("Error loading user:", err);
          setToken(null);
        }
      } else {
        setCurrentUser(null);
        setApplicationIds(new Set());
      }
    }
    getCurrentUser();
  }, [token]);

  async function login(loginData) {
    const token = await JoblyApi.login(loginData);
    setToken(token);
  }

  async function register(signupData) {
    const token = await JoblyApi.register(signupData);
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  function hasAppliedToJob(jobId) {
    return applicationIds.has(jobId);
  }

  function applyToJob(jobId) {
    if (currentUser && !hasAppliedToJob(jobId)) {
      JoblyApi.applyToJob(currentUser.username, jobId);
      setApplicationIds(new Set([...applicationIds, jobId]));
    }
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    hasAppliedToJob,
    applyToJob,
    token
  };

  return (
    <JoblyContext.Provider value={value}>
      {children}
    </JoblyContext.Provider>
  );
}