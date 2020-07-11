import React from "react";

const ApplicantProfileHeader = props => {
  // let style = {
  //   border: "solid purple 3px",
  //   padding: "5px",
  //   margin: "5px",
  //   textDecoration: "none",
  //   cursor: "pointer",
  //   color: "purple"
  // };
  return (
    <div className="btn-group mb-4" role="group">
      <a
        className="btn btn-light"
        style={{ color: "purple" }}
        onClick={() => props.changePage("application")}
      >
        <i className="fas fa-user-circle text-success mr-1" />
        Application
      </a>
      <a
        className="btn btn-light"
        style={{ color: "purple" }}
        onClick={() => props.changePage("results")}
      >
        <i className="fas fa-stopwatch text-success mr-1" />
        Test Results
      </a>
    </div>
  );
};

export default ApplicantProfileHeader;
