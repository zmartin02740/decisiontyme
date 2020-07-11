import React, { Component } from "react";

class ResumeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: null,
      errorMsg: ""
    };

    this.applicantId = props.match.params.applicantId;
    this.companyId = props.match.params.companyId;
  }

  handleChange = e =>
    this.setState({
      resume: e.target.files[0]
    });

  handleSubmit = () => {
    if (this.state.resume === null) {
      return this.setState({
        errorMsg: "Error: please upload resume before submitting"
      });
    }

    const options = {
      headers: {
        "Content-Type": "application/pdf"
      },
      method: "POST",
      body: this.state.resume
    };

    fetch(
      `/api/applicant/resume/${this.companyId}/${this.applicantId}`
    , options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    })
  };

  render() {
    return (
      <div>
        <input type="file" accept=".pdf" onChange={this.handleChange} />
        <button type="button" onClick={this.handleSubmit}>Upload</button>
        <p style={{ color: 'red' }}>{this.state.errorMsg}</p>
      </div>
    );
  }
}

export default ResumeUpload;
