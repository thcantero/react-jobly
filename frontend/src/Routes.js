import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useJobly } from './JoblyContext';
import Homepage from './Homepage';
import Companies from './Companies';
import CompanyDetail from './CompanyDetail';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';

function PrivateRoute({ children }) {
  const { currentUser } = useJobly();
  return currentUser ? children : <Navigate to="/login" />;
}

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      
      <Route path="/companies" element={
        <PrivateRoute>
          <Companies />
        </PrivateRoute>
      } />
      
      <Route path="/companies/:handle" element={
        <PrivateRoute>
          <CompanyDetail />
        </PrivateRoute>
      } />
      
      <Route path="/jobs" element={
        <PrivateRoute>
          <Jobs />
        </PrivateRoute>
      } />
      
      <Route path="/profile" element={
        <PrivateRoute>
          <ProfileForm />
        </PrivateRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  );
}

export default Routes;