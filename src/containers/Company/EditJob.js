import React, { Component } from "react";

import Spinner from "../../common/Spinner/Spinner";
import TextAreaFieldGroup from "../../common/Form/TextAreaFieldGroup";
import TextFieldGroup from "../../common/Form/TextFieldGroup";

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      title: props.job.title,
      description: props.job.description
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

    const job = {
      ...this.state,
      id: this.props.id
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
        fetch("/api/job/edit-job", options)
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
                this.props.editJobInState(job);
                this.props.toggleEditJob();
              }
            );
          })
          .catch(err => {
            console.error(err);
            this.setState({
              isLoading: false,
              isError: true
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
          <p>Error editing Job</p>
        </div>
      );
    }

    return (
      <div>
        <div>
          <label htmlFor="title">Edit Job Information:</label>
          <TextFieldGroup
            type="text"
            name="title"
            defaultValue={this.props.job.title}
            onChange={this.handleChange}
            info="Edit the current job title"
          />
        </div>
        <div>
          <TextAreaFieldGroup
            name="description"
            onChange={this.handleChange}
            defaultValue={this.props.job.description}
            info="Edit the current job description"
          />
        </div>
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
          onClick={this.props.toggleEditJob}
        >
          <i className="fas fa-ban text-success mr-1" />
          Cancel
        </button>
      </div>
    );
  }
}

export default EditJob;
