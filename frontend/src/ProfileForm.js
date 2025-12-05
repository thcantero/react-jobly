import React, { useState, useEffect } from 'react';
import { useJobly } from './JoblyContext';
import JoblyApi from './api';

function ProfileForm() {
  const { currentUser } = useJobly();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        username: currentUser.username,
        password: ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    // Only include password if it's not empty
    if (formData.password) {
      profileData.password = formData.password;
    }

    try {
      await JoblyApi.updateProfile(currentUser.username, profileData);
      setSuccess(true);
      setErrors([]);
    } catch (err) {
      setErrors(err);
    }
  };

  if (!currentUser) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={formData.username}
                disabled
              />
              <div className="form-text">Username cannot be changed.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Confirm Password to Make Changes
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password to confirm changes"
              />
            </div>
            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                Profile updated successfully!
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;