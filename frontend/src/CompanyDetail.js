import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err) {
        console.error("Error loading company:", err);
      } finally {
        setLoading(false);
      }
    }
    getCompany();
  }, [handle]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!company) {
    return <div className="container mt-5">Company not found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">{company.name}</h3>
              <p className="card-text">{company.description}</p>
              {company.logoUrl && (
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="float-end" 
                  style={{ maxHeight: '100px' }}
                />
              )}
            </div>
          </div>
          
          <h4>Jobs at {company.name}</h4>
          {company.jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            company.jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;