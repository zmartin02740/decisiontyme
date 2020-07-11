import React, { Component } from "react";

import Test from "./Test/Test";
import TestIntro from "./TestIntro/TestIntro";
import Spinner from "../../common/Spinner/Spinner";

class Applicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isCompleted: false,
      isAuth: false,
      isError: false,
      applicant: {},
      secondsElapsed: 0,
      test: {},
      buttonClicked: false
    };

    this.companyName = props.match.params.companyName;
    this.jobTitle = props.match.params.jobTitle;
    this.id = props.match.params.id;
  }

  componentDidMount() {
    if (!this.id) {
      this.props.history.push("/");
      return;
    }

    fetch(`/api/applicant/auth/${this.id}`)
      .then(res => {
        return res.status === 403 ? Promise.reject("Auth denied") : res.json();
      })
      .then(data => {
        console.log(data);
        if (!data.success) {
          return this.setState({
            isError: true
          });
        }

        if (data.completed) {
          this.setState({
            isLoading: false,
            isAuth: true,
            isCompleted: true
          });
        } else if (data.testTimestamp) {
          const parsedDate = Date.parse(data.testTimestamp);
          this.setState(
            {
              isLoading: false,
              secondsElapsed: Math.floor((new Date() - parsedDate) / 1000),
              isAuth: true,
              applicant: data,
              test: data.test
            },
            this.changePageHandler
          );
        } else {
          this.setState({
            isLoading: false,
            isAuth: true,
            applicant: data,
            test: data.test
          });
        }
      })
      .catch(err => console.error(err));
  }

  startTest = () => {
    if (!this.id) {
      this.props.history.push("/");
      return;
    }

    fetch(`/api/applicant/test-timestamp/${this.id}`)
      .then(
        res => (res.status === 403 ? Promise.reject("Auth denied") : res.json())
      )
      .then(data => {
        this.changePageHandler();
      })
      .catch(err => console.error(err));
  };

  redirectToFinished = () => {
    this.props.history.push("/test-finished");
  };

  propagateError = () => this.setState({ isError: true });

  changePageHandler = () =>
    this.setState({ buttonClicked: !this.state.buttonClicked });

  handleChange = e => {
    this.setState({
      answers: {
        ...this.state.answers,
        [e.target.id]: e.target.value
      }
    });
  };

  formattedSeconds = sec => {
    return Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);
  };

  render() {
    if (this.state.isError) {
      return <p>There was an error.</p>;
    }

    if (this.state.isLoading) {
      return <Spinner />;
    }

    if (!this.state.isAuth) {
      return <p>Invalid token</p>;
    }

    if (this.state.isCompleted) {
      return <p>You have already completed the test!</p>;
    }

    let pageChoice = !this.state.buttonClicked ? (
      <TestIntro
        applicant={this.state.applicant}
        startTest={this.startTest}
        companyName={this.companyName}
        jobTitle={this.jobTitle}
      />
    ) : (
      <Test
        id={this.id}
        test={this.state.test}
        secondsElapsed={this.state.secondsElapsed}
        applicant={this.state.applicant}
        propagateError={this.propagateError}
        handleChange={this.handleChange}
        redirectToFinished={this.redirectToFinished}
        companyName={this.companyName}
        jobTitle={this.jobTitle}
      />
    );

    return <div>{pageChoice}</div>;
  }
}

export default Applicant;
