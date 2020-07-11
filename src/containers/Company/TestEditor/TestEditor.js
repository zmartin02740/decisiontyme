import React, { Component } from "react";

import QuestionList from "./QuestionList/QuestionList";
import CreateQuestion from "./CreateQuestion";
import Spinner from "../../../common/Spinner/Spinner";

class TestEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      createQuestionMounted: false
    };

    this.toggleCreateQuestion = this.toggleCreateQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleCreateQuestion() {
    this.setState(prevState => ({
      createQuestionMounted: !prevState.createQuestionMounted
    }));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    if (this.state.isError) {
      return <p>There was an error.</p>;
    }

    let questionList = "";
    if (this.props.job.test.length > 0) {
      questionList = (
        <QuestionList
          test={this.props.job.test}
          jobId={this.props.job.id}
          deleteQuestionInState={this.props.deleteQuestionInState}
          createQuestionInState={this.props.createQuestionInState}
          editQuestionInState={this.props.editQuestionInState}
          token={this.props.token}
        />
      );
    } else {
      questionList = (
        <h3 style={{ paddingTop: "10px" }}>
          There are no questions for this job position yet. Create some
          questions!
        </h3>
      );
    }

    let createQuestionBtn = "";
    let createQuestion = "";
    if (!this.state.createQuestionMounted) {
      createQuestionBtn = (
        <button
          style={{ color: "purple" }}
          className="btn btn-light"
          type="button"
          onClick={this.toggleCreateQuestion}
        >
          <i className="fas fa-plus text-success mr-1" />
          Add New Question
        </button>
      );
    } else {
      createQuestion = (
        <CreateQuestion
          test={this.props.job.test}
          jobId={this.props.job.id}
          createQuestionInState={this.props.createQuestionInState}
          toggleCreateQuestion={this.toggleCreateQuestion}
          token={this.props.token}
        />
      );
    }

    return (
      <div>
        {createQuestionBtn}
        {createQuestion}
        {questionList}
      </div>
    );
  }
}

export default TestEditor;
