import React, { Component } from "react";
import hat from "hat";

import Spinner from "../../common/Spinner/Spinner";
import TextAreaFieldGroup from "../../common/Form/TextAreaFieldGroup";
import TextFieldGroup from "../../common/Form/TextFieldGroup";

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      errorMsg: "",
      title: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (["title", "description"].find(x => this.state[x].length === 0)) {
      return this.setState({
        errorMsg: "Please include a job title and description"
      });
    }

    const id = hat();
    const job = {
      id,
      ...this.state,
      test: []
    };

    const options = {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(job)
    };

    this.setState(
      {
        isLoading: true
      },
      () => {
        fetch("/api/job/create-job", options)
          .then(res => res.json())
          .then(data => {
            if (!data.success) {
              console.log(data);
              return this.setState({
                isError: true,
                isLoading: false
              });
            }

            console.log(data);
            this.setState(
              {
                isLoading: false
              },
              () => {
                this.props.createJobInState(job);
                this.props.toggleCreateJob();
              }
            );
          })
          .catch(err => {
            console.error(err);
            this.setState({
              isError: true,
              isLoading: false
            });
          });
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    if (this.state.isError) {
      return (
        <div>
          <p>Error creating Job</p>
        </div>
      );
    }

    let errorMsg = "";
    if (this.state.errorMsg.length > 0) {
      errorMsg = <p style={{ color: "red" }}>{this.state.errorMsg}</p>;
    }

    return (
      <div>
        <div>
          <TextFieldGroup
            type="text"
            name="title"
            onChange={this.handleChange}
            info="What is the title of the position?"
          />
        </div>
        <div>
          <TextAreaFieldGroup
            name="description"
            onChange={this.handleChange}
            info="What are the specifics of the job (ex. Description, Requirements, Benefits, etc)"
          />
        </div>
        {errorMsg}
        <button
          style={{ color: "purple" }}
          className="btn btn-light"
          onClick={this.handleSubmit}
        >
          <i className="fas fa-check text-success mr-1" />
          Save
        </button>
        <button
          style={{ color: "purple" }}
          className="btn btn-light"
          type="button"
          onClick={this.props.toggleCreateJob}
        >
          <i className="fas fa-ban text-success mr-1" />
          Cancel
        </button>
      </div>
    );
  }
}

export default CreateJob;
