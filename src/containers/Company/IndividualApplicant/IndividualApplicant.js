import React, { Component } from "react";
import dateFormat from "dateformat";

import "./IndividualApplicant.css";
import { Link } from "react-router-dom";
import ActionButtons from "../../../common/Buttons/ActionButtons";
import Spinner from "../../../common/Spinner/Spinner";

class IndividualApplicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      errorMsg: "",
      isEditing: false
    };

    this.token = localStorage.getItem("token");
  }

  editHandler = () => this.setState({ isEditing: true });

  onCancelClick = () => this.setState({ isEditing: false });

  onSaveClick = event => {
    event.preventDefault();

    let applicant = {
      id: this.props.applicant.id,
      firstName: this.refs.editFName.value,
      lastName: this.refs.editLName.value
    };

    if (
      this.refs.editFName.value === this.props.applicant.firstName &&
      this.refs.editLName.value === this.props.applicant.lastName
    ) {
      return this.setState({
        isEditing: false
      });
    }

    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(applicant)
    };

    this.setState(
      {
        isLoading: true
      },
      () => {
        fetch("/api/company/edit-applicant", options)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (!data.success) {
              return this.setState({
                isLoading: false,
                isError: true,
                errorMsg: data.msg
              });
            }

            this.props.editApplicant(applicant);
            this.setState({
              isEditing: false,
              isLoading: false
            });
          })
          .catch(err => {
            console.error(err);
            this.setState({
              isError: true,
              isLoading: false,
              errorMsg: err.message
            });
          });
      }
    );
  };

  onDelete = e => {
    e.preventDefault();

    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: this.props.applicant.email,
        id: this.props.applicant.id
      })
    };

    this.setState(
      {
        isLoading: true
      },
      () => {
        fetch("/api/company/remove-applicant", options)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (!data.success) {
              return this.setState({
                isLoading: false,
                isError: true,
                errorMsg: data.msg
              });
            }

            this.props.deleteApplicant(this.props.applicant);
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              isError: true,
              errorMsg: err.message
            });
            console.error(err);
          });
      }
    );
  };

  completionHandler = () => {
    if (this.props.applicant.completed) {
      return <p style={{ color: "green" }}>COMPLETE</p>;
    } else {
      return <p style={{ color: "red" }}>INCOMPLETE</p>;
    }
  };

  render() {
    const { applicant } = this.props;

    if (this.state.isLoading) {
      return <Spinner />;
    }

    if (this.state.isError) {
      return <p>{this.state.errorMsg}</p>;
    }

    return (
      <div className="Applicant">
        <div className="padding" style={{ color: "green" }}>
          <strong>{this.completionHandler()}</strong>
        </div>
        <div className="name">
          {this.state.isEditing ? (
            <div>
              <input
                type="text"
                defaultValue={this.props.applicant.lastName}
                ref="editLName"
              />
              <br />
            </div>
          ) : (
            this.props.applicant.lastName
          )}
          ,
          {this.state.isEditing ? (
            <input
              type="text"
              defaultValue={this.props.applicant.firstName}
              ref="editFName"
            />
          ) : (
            <div style={{ paddingBottom: "12px" }}>
              {" "}
              {this.props.applicant.firstName}
            </div>
          )}
        </div>
        <div className="align">
          <div className="email">
            <p>{this.props.applicant.jobTitle}</p>
          </div>
          <div className="padding" />
          <div className="padding">
            <div>
              <strong>
                <Link
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline"
                  }}
                  to={`/company/applicant/${this.props.applicant.id}`}
                >
                  <div style={{ paddingBottom: "25px" }}>VIEW</div>
                </Link>
              </strong>
            </div>
          </div>
          <div className="padding">
            <ActionButtons
              isEditing={this.state.isEditing}
              onSaveClick={this.onSaveClick}
              onCancel={this.onCancelClick}
              editHandler={this.editHandler}
              deleteHandler={this.onDelete}
            />
          </div>
          <div
            style={{
              paddingTop: "15px"
            }}
          >
            <p style={{ fontSize: "10px" }}>
              Created:{" "}
              <strong>
                {dateFormat(applicant.timestamp, "mmmm dS, yyyy")}
              </strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default IndividualApplicant;
