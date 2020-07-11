import React from "react";
import "./Test.css";

import Question from "../../../common/Question";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      secondsElapsed: props.secondsElapsed
    };

    this.incrementer = null;
  }

  componentDidMount() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
        }),
      1000
    );
  }

  handleChange = e =>
    this.setState({
      answers: {
        ...this.state.answers,
        [e.target.name]: e.target.value
      }
    });

  handleSubmit = () => {
    clearInterval(this.incrementer);

    const answerData = this.props.test.map(
      q =>
        this.state.answers[q.id]
          ? q.type === "MULTIPLE_CHOICE"
            ? {
                ...q,
                correct: q.options.find(
                  x => x.answer === this.state.answers[q.id]
                ).correct,
                answer: this.state.answers[q.id]
              }
            : {
                ...q,
                answer: this.state.answers[q.id]
              }
          : {
              ...q,
              answer: null
            }
    );

    const options = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        answerData,
        applicantId: this.props.applicant.id,
        secondsElapsed: this.state.secondsElapsed
      })
    };

    fetch(`/api/applicant/test-results/${this.props.id}`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!data.success) {
          return this.props.propagateError();
        }

        this.props.redirectToFinished();
      })
      .catch(err => console.error(err));
  };

  formattedSeconds = sec =>
    Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

  render() {
    const test = this.props.test.map((x, i) => (
      <div key={x.id}>
        <Question question={x} index={i} handleChange={this.handleChange} />
      </div>
    ));

    return (
      <div className="testform">
        <h1 style={{ color: "purple", paddingBottom: "30px" }}>
          BEGIN TESTING NOW
        </h1>
        <h1 className="timer">
          {this.formattedSeconds(this.state.secondsElapsed)}
        </h1>
        {test}
        <div className="testformbtnarea">
          <a
            onClick={this.handleSubmit}
            className="testformbtn"
            style={{ color: "white" }}
          >
            SUBMIT
          </a>
        </div>
      </div>
    );
  }
}

export default Test;
