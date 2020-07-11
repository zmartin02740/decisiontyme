import React from "react";

import "./FinalResults.css";

class FinalResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMultipleChoice: false,
      isEmailing: false,
      emailSuccess: false,
      emailError: false
    };

    this.token = localStorage.getItem("token");
  }

  formattedSeconds = sec => {
    return (
      Math.floor(sec / 60) +
      " minutes and " +
      ("0" + (sec % 60)).slice(-2) +
      " seconds"
    );
  };

  showMultipleChoiceHandler = () => {
    this.setState({ showMultipleChoice: !this.state.showMultipleChoice });
  };

  renderEmailBtn = () =>
		<div style={{
			paddingLeft: '50px',
      paddingTop: '20px'
		}}>
			<button type="button"
				disabled={this.state.isEmailing}
				onClick={this.sendEmailReminder}
        style={{
          cursor: 'pointer'
        }}
			>
				<i className="far fa-envelope">Send Email Reminder</i>
			</button>
		</div>;

    sendEmailReminder = () => {
  		this.setState({
  			isEmailing: true
  		}, () => {
  			const options = {
  				headers: {
  					"Authorization": `Bearer ${this.token}`,
  					"Content-Type": "application/json"
  				},
  				method: "POST",
  				body: JSON.stringify({
  					applicantId: this.props.applicant.id
  				})
  			};

  			fetch("/api/company/email-reminder", options)
  			.then(res => res.json())
  			.then(data => {
  				console.log(data);
  				if (!data.success) {
  					return this.setState({
  						emailError: true,
  						isEmailing: false
  					});
  				}

  				this.setState({
  					emailSuccess: true,
  					isEmailing: false
  				});
  			})
  			.catch(err => {
  				console.error(err);
  				this.setState({
  					emailError: true,
  					isEmailing: false
  				});
  			});
  		});
  	};

  render() {
    const { applicant } = this.props;

    const {
      emailSuccess,
      emailError
    } = this.state;

    let allMCResponses = [];
    let correctMCResponses = [];
    let ORQuestionsArray = [];
    let multipleChoiceQuestions = null;
    let style;

    if (applicant.answerData) {
      applicant.answerData.map(answer => {
        if (answer.type === "MULTIPLE_CHOICE") {
          allMCResponses.push(answer);

          if (answer.correct) {
            correctMCResponses.push(answer);
          }
          return correctMCResponses;
        }

        return allMCResponses;
      });
      applicant.answerData.map(answer => {
        if (answer.type === "OPEN_RESPONSE") {
          ORQuestionsArray.push(answer);
        }

        return ORQuestionsArray;
      });
    }

    let openResponseQuestions = ORQuestionsArray.map((question, index) => {
      return (
        <div key={question.body} className="ORquestionstyle">
          <strong>
            <em>
              {index + 1 + ". "}
              {question.body}
            </em>
          </strong>
          <p>{question.answer}</p>
        </div>
      );
    });

    if (this.state.showMultipleChoice) {
      multipleChoiceQuestions = allMCResponses.map((question, index) => {
        return (
          <div key={question.body} className="MCquestionStyle">
            <strong>
              <em>
                {index + 1 + ". "} {question.body}
              </em>
            </strong>
            {question.options.map(option => {
              if (question.answer === option.answer && option.correct) {
                style = {
                  color: "green"
                };
              } else if (question.answer === option.answer && !option.correct) {
                style = {
                  color: "red"
                };
              } else {
                style = {};
              }
              return (
                <div key={option.id} style={style}>
                  {option.answer}
                </div>
              );
            })}
          </div>
        );
      });
    }

    let multipleChoiceButton = this.state.showMultipleChoice ? (
      <div className="MCButtonStyle">
        <a onClick={this.showMultipleChoiceHandler}>
          Hide Multiple Choice Questions
        </a>
      </div>
    ) : (
      <div className="MCButtonStyle">
        <a onClick={this.showMultipleChoiceHandler}>
          Show Multiple Choice Questions
        </a>
      </div>
    );

    let MCScore = `(${correctMCResponses.length}/${
      allMCResponses.length
    }) of the multiple choice questions were answered correctly!`;

    return (
      <div>
        {applicant.completed ? (
          <div>
            <div className="resultsheader">
              <h3 style={{ color: "purple" }} className="namedisplay">
                <strong>
                  Test Results for {applicant.firstName} {applicant.lastName}
                </strong>
              </h3>
              <h4 style={{ color: "purple" }} className="timerdisplay">
                Total amount of time taken is{" "}
                <span style={{ color: "red", textDecoration: "underline" }}>
                  {this.formattedSeconds(applicant.secondsElapsed)}
                </span>
              </h4>
            </div>
            <div className="MCquestionlayout">
              <h4 className="questionheader">Multiple Choice</h4>
              {MCScore}
              <br />
              {multipleChoiceButton}
              {multipleChoiceQuestions}
            </div>
            <div className="questionStyle">
              <h4 className="questionheader">Open Response</h4>
              {openResponseQuestions}
            </div>
          </div>
        ) : (
          <div>
            <div className="resultsheader">
              <h3 style={{ color: "purple" }} className="namedisplay">
                <strong>
                  {applicant.firstName} {applicant.lastName} has not yet
                  completed the test
                </strong>
                {this.renderEmailBtn()}
        				{
        					emailSuccess ? (
        						<p style={{ color: 'green' }}>Email sent!</p>
        					) : (
        						emailError ? (
        							<p style={{ color: 'red' }}>Failure: could not send email</p>
        						) : ""
        					)
        				}
              </h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FinalResults;
