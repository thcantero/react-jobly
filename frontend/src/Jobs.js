import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';
import SearchForm from './SearchForm';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    getJobs();
  }, []);

  async function search(filters) {
    setLoading(true);
    try {
      const jobs = await JoblyApi.getJobs(filters);
      setJobs(jobs);
    } catch (err) {
      console.error("Error searching jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <SearchForm searchFor={search} type="jobs" />
          {jobs.length === 0 ? (
            <p className="text-center">No jobs found.</p>
          ) : (
            jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;