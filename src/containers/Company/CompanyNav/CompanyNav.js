import React from "react";
import { Link } from "react-router-dom";
import "./CompanyNav.css";

const CompanyNav = () => {
  return (
    <div className="topcompanynav">
      <div>
        {/* <div className="border1">
          <Link to="/company/messaging">Questions?</Link>
        </div> */}
        <div>
          <Link to="/company">Applicants</Link>
        </div>
        <div>
          <Link to="/company/jobs">Editor</Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyNav;
