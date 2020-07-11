import React, { Component } from "react";
import ResultsHeader from "../ResultsHeader";
import Spinner from "../../../../common/Spinner/Spinner";
import CompanyNav from "../../CompanyNav/CompanyNav";
import "./SubmittedApplication.css";

class SubmittedApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      data: {}
    };
    this.ApplicantId = this.props.match.params.ApplicantId;
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        isLoading: false,
        isError: true
      });
      return;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch(`/api/applicant/applicant/${this.ApplicantId}`, options)
      .then(
        res => (res.status === 403 ? Promise.reject("Auth denied") : res.json())
      )
      .then(data => {
        console.log("DATA FROM SUBMITTED APPLICATION", data);
        this.setState({
          data,
          isLoading: false
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    let isOver18 = Object.hasOwnProperty(this.state.data, "over18")
      ? this.state.data.over18
        ? "Yes"
        : "No"
      : "Unknown";

    let isLegal = Object.hasOwnProperty(this.state.data, "isLegal")
      ? this.state.data.isLegal
        ? "Yes"
        : "No"
      : "Unknown";

    let education = Object.hasOwnProperty(this.state.data, "education")
      ? this.state.data.education.length > 0
        ? this.state.data.education.map(edu => {
            return (
              <div key={edu.key} style={{ borderTop: "solid gray 2px" }}>
                <p>
                  <strong>School:</strong> {edu.school}
                </p>
                <p>
                  <strong>Study:</strong> {edu.study}
                </p>
                <p>
                  <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                  <strong>Start Date:</strong> {edu.startTime}
                </p>
                <p>
                  <strong>End Date:</strong> {edu.endTime}
                </p>
              </div>
            );
          })
        : "None"
      : "Unknown";

    let workExperience = Object.hasOwnProperty(
      this.state.data,
      "workExperience"
    )
      ? this.state.data.workExperience.length > 0
        ? this.state.data.workExperience.map(exp => {
            return (
              <div key={exp.key} style={{ borderTop: "solid gray 2px" }}>
                <p>
                  <strong>Company Name:</strong> {exp.company}
                </p>
                <p>
                  <strong>Company Industry:</strong> {exp.industry}
                </p>
                <p>
                  <strong>Position Title:</strong> {exp.title}
                </p>
                <p>
                  <strong>Position Summary:</strong> {exp.summary}
                </p>
                <p>
                  <strong>Reason For Leaving:</strong> {exp.leaving}
                </p>
                <p>
                  <strong>Start Date:</strong> {exp.startTime}
                </p>
                <p>
                  <strong>End Date:</strong> {exp.endTime}
                </p>
              </div>
            );
          })
        : "None"
      : "Unknown";

    return (
      <div>
        <CompanyNav />
        <div className="resultsnav">
          <ResultsHeader ApplicantId={this.ApplicantId} />
        </div>
        <div className="resultsheaderapp">
          <h1>Submitted Application</h1>
          <div className="submittedapplication">
            <h3>Personal Information</h3>
            <p>
              <strong>First Name:</strong> {this.state.data.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {this.state.data.lastName}
            </p>
            <p>
              <strong>Address:</strong> {this.state.data.address || "Unknown"}
            </p>
            <p>
              <strong>City:</strong> {this.state.data.city || "Unknown"}
            </p>
            <p>
              <strong>State:</strong> {this.state.data.state || "Unknown"}
            </p>
            <p>
              <strong>ZIP Code:</strong> {this.state.data.zipCode || "Unknown"}
            </p>
            <p>
              <strong>Primary Contact:</strong>{" "}
              {this.state.data.phone || "Unknown"}
            </p>
            <p>
              <strong>Email:</strong> {this.state.data.email}
            </p>
          </div>
          <div className="submittedapplication">
            <h3>Education</h3>
            {education}
          </div>
          <div className="submittedapplication">
            <h3>Employment History</h3>
            {workExperience}
          </div>
          <div className="submittedapplication">
            <h3>Applicant Details</h3>
            <p>
              <strong>Cover Letter:</strong>{" "}
              {this.state.data.coverLetter || "None"}
            </p>
            <p>
              <strong>Salary Requirements:</strong>{" "}
              {this.state.data.salaryRequirements || "None"}
            </p>
            <p>
              <strong>Is The Candidate Over The Age of 18:</strong> {isOver18}
            </p>
            <p>
              <strong>
                Is The Candidate Legally Allowed to Work in This State:
              </strong>{" "}
              {isLegal}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmittedApplication;
