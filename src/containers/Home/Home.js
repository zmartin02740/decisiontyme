import React, { Component } from "react";
import { Link } from "react-router-dom";
import landingtest from "../../img/landingtest.png";
import landinglink from "../../img/landinglink.png";
import landinggroup from "../../img/landinggroup.png";
import Modal from "../../common/Modal/Modal";

import "./Home.css";
import TextFieldGroup from "../../common/Form/TextFieldGroup";
import Spinner from "../../common/Spinner/Spinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCompany: false,
      name: "",
      email: "",
      companyName: "",
      phone: "",
      positions: "",
      website: "",
      isError: false,
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleCompanyModal = () => {
    this.setState(prevState => ({ newCompany: !prevState.newCompany }));
  };

  onSubmit = e => {
    e.preventDefault();

    const newCompanyForm = {
      name: this.state.name,
      companyName: this.state.companyName,
      email: this.state.email,
      phone: this.state.phone,
      website: this.state.website,
      positions: this.state.positions
    };

    const options = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(newCompanyForm)
    };
    this.setState(
      {
        isLoading: true
      },
      () => {
        fetch("/api/company/new-company-form", options)
          .then(res => res.json())
          .then(data => {
            if (!data.success) {
              console.log("problem", data);
              return this.setState({
                isError: true,
                isLoading: false
              });
            }
            console.log("problem1", data);
            this.setState(
              {
                isLoading: false
              },
              () => {
                this.toggleCompanyModal();
              }
            );
          })
          .catch(err => {
            console.log("something went wrong");
          });
      }
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let newCompanySubmission;
    if (this.state.newCompany) {
      newCompanySubmission = (
        <Modal
          show={this.state.newCompany}
          modalClosed={this.toggleCompanyModal}
        >
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={this.onChange}
              info="Please write out your first and last name"
            />
            <TextFieldGroup
              type="text"
              name="companyName"
              placeholder="Company Name"
              onChange={this.onChange}
              info="What is the name of your business"
            />
            <TextFieldGroup
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.onChange}
              info="What is the best email to contact you"
            />
            <TextFieldGroup
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={this.onChange}
              info="What is the best phone number to contact you"
            />
            <TextFieldGroup
              type="text"
              name="website"
              placeholder="Website"
              onChange={this.onChange}
              info="Please tell us your website address (ex: www.example.com)"
            />
            <TextFieldGroup
              type="text"
              name="positions"
              placeholder="List of Positions"
              onChange={this.onChange}
              info="What positions are you looking to fill at your company"
            />
            <input type="submit" value="submit" />
          </form>
        </Modal>
      );
    }
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
          <p>Error with submission</p>
        </div>
      );
    }
    return (
      <div>
        <div>
          <h5 className="complogo">
            <strong>DecisionTyme</strong>
          </h5>
          {newCompanySubmission}
          <Link to="/company">
            <strong className="complogin">Company Portal Login</strong>
          </Link>
        </div>
        <div className="home">
          <center>
            <h1 className="landingheader">
              <strong>DecisionTyme</strong>
            </h1>
            <h3>
              <strong>
                The power of hiring smarter and more qualified applicants.
              </strong>
            </h3>
          </center>
        </div>
        <center style={{ paddingTop: "10px" }}>
          <h3
            style={{ margin: "0px 80px", padding: "20px 0px", color: "purple" }}
          >
            <strong>
              Want to make sure that you always have a pipeline of qualified
              applicants to hire when needed?
            </strong>
          </h3>
          <button
            onClick={this.toggleCompanyModal}
            style={{
              padding: "20px 40px",
              backgroundColor: "purple",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            CLICK HERE TO GET STARTED{" "}
            <span style={{ textDecoration: "underline" }}>FREE</span>
          </button>
        </center>
        <div className="row" style={{ margin: "30px" }}>
          <div
            className="col-md-4"
            style={{ backgroundColor: "lightgray", padding: "20px" }}
          >
            <center className="landingpageblurbs">
              <strong>
                Generate Custom Pre-Screening Tests For Any Position
              </strong>
            </center>
            <center>
              <img src={landingtest} alt="test" />
            </center>
          </div>
          <div
            className="col-md-4"
            style={{ backgroundColor: "lightgray", padding: "20px" }}
          >
            <center className="landingpageblurbs">
              <strong>
                Easily Link The All-In-One Aplication Process to Your Website
              </strong>
            </center>
            <center>
              <img src={landinglink} alt="link" />
            </center>
          </div>
          <div
            className="col-md-4"
            style={{ backgroundColor: "lightgray", padding: "20px" }}
          >
            <center className="landingpageblurbs">
              <strong>
                Sit Back And Relax While Qualified Applicants Begin Applying
              </strong>
            </center>
            <center>
              <img src={landinggroup} alt="group" />
            </center>
          </div>
        </div>
        <center>
          <h3>What is the the purpose of DecisionTyme you may ask?</h3>
        </center>
        <div style={{ margin: "0px 60px" }}>
          <strong>
            DecisionTyme is a software with the main focus of helping small to
            medium sized business find and organize better quality applicants.
            Our system makes it easy to store all of your applicants information
            in one convenient location. We know you as a business owner already
            have a lot on your hands so we want to help remove some of that
            stress. We want to make it so easy we are giving the use of the
            software away for free to help you compete with the large
            corporations that pay hundreds of thousands of dollars a year to get
            the same quality applicants.
          </strong>
        </div>
      </div>
    );
  }
}

export default Home;
