import React, { useState } from 'react';
import { useJobly } from './JoblyContext';

function JobCard({ job }) {
  const { currentUser, hasAppliedToJob, applyToJob } = useJobly();
  const [applied, setApplied] = useState(hasAppliedToJob(job.id));

  async function handleApply() {
    if (currentUser && !applied) {
      try {
        await applyToJob(job.id);
        setApplied(true);
      } catch (err) {
        console.error("Error applying to job:", err);
      }
    }
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">
          {job.companyName && <strong>{job.companyName}</strong>}
          {job.salary && <span className="ms-2">Salary: ${job.salary.toLocaleString()}</span>}
          {job.equity && <span className="ms-2">Equity: {job.equity}</span>}
        </p>
        {currentUser && (
          <button 
            className={`btn ${applied ? 'btn-success' : 'btn-primary'}`}
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? 'Applied' : 'Apply'}
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;