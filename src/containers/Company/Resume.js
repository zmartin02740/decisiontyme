import React, { Component } from "react";
import { Document } from "react-pdf/dist/entry.webpack";

import Spinner from "../../common/Spinner/Spinner";

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      resume: null
    };

    this.token = localStorage.getItem("token");
    this.applicantId = props.match.params.applicantId;
  }

  componentDidMount() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/pdf"
      }
    };

    fetch(`/api/company/resume/${this.applicantId}`, options)
      .then(res => res.arrayBuffer())
      .then(pdf => {
        console.log(pdf);
        this.setState({
          resume: pdf,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  }

  render() {
    if (this.state.isError) {
      return <p>Error loading resume</p>;
    }

    if (this.state.isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <Document
          file={{
            data: this.state.resume
          }}
        />
      </div>
    );
  }
}

export default Resume;
