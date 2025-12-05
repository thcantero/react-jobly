import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error loading companies:", err);
      } finally {
        setLoading(false);
      }
    }
    getCompanies();
  }, []);

  async function search(filters) {
    setLoading(true);
    try {
      const companies = await JoblyApi.getCompanies(filters);
      setCompanies(companies);
    } catch (err) {
      console.error("Error searching companies:", err);
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
          <SearchForm searchFor={search} type="companies" />
          {companies.length === 0 ? (
            <p className="text-center">No companies found.</p>
          ) : (
            companies.map(company => (
              <CompanyCard key={company.handle} company={company} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Companies;