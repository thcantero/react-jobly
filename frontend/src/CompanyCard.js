import React from 'react';
import { Link } from 'react-router-dom';  
function CompanyCard({ company }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h5 className="card-title">
              <Link to={`/companies/${company.handle}`}>  
                {company.name}
              </Link>
            </h5>
            <p className="card-text">{company.description}</p>
          </div>
          {company.logoUrl && (
            <img 
              src={company.logoUrl} 
              alt={`${company.name} logo`} 
              className="ms-3" 
              style={{ 
                maxHeight: '50px', 
                maxWidth: '100px',
                objectFit: 'contain' 
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;  