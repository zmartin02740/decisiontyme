import React from "react";
import TextFieldGroup from "../../../../common/Form/TextFieldGroup";
import "./PersonalInformation.css";

const personalInformation = props => {
  return (
    <div className="personalinfo">
      <div className="subheader">
        <label>Personal Information</label>
        <br />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="firstName"
          invalidField={
            props.invalidFields.find(x => x === "firstName") ? true : false
          }
          placeholder="First Name"
          type="text"
          onChange={props.handleChange}
          info="* Please fill out your first name"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="lastName"
          placeholder="Last Name"
          invalidField={
            props.invalidFields.find(x => x === "lastName") ? true : false
          }
          type="text"
          onChange={props.handleChange}
          info="* Please fill out your last name"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="address"
          placeholder="Address"
          invalidField={
            props.invalidFields.find(x => x === "address") ? true : false
          }
          type="text"
          onChange={props.handleChange}
          info="* Please fill out the address of your current residence (ex. 121 Commonwealth Ave)"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="city"
          invalidField={
            props.invalidFields.find(x => x === "city") ? true : false
          }
          placeholder="City"
          type="text"
          onChange={props.handleChange}
          info="* Please fill out the city of which your residence is located"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="state"
          placeholder="State"
          invalidField={
            props.invalidFields.find(x => x === "state") ? true : false
          }
          type="text"
          onChange={props.handleChange}
          info="* Please fill out the state in which your current residence is located"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="zipCode"
          placeholder="ZIP Code"
          invalidField={
            props.invalidFields.find(x => x === "zipCode") ? true : false
          }
          type="text"
          onChange={props.handleChange}
          info="* Please fill out your current residences ZIP Code"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="phone"
          placeholder="Phone"
          invalidField={
            props.invalidFields.find(x => x === "phone") ? true : false
          }
          type="text"
          onChange={props.handleChange}
          info="* Please fill out the best phone number to reach you at"
        />
      </div>
      <div className="personalinput">
        <TextFieldGroup
          name="email"
          placeholder="Email"
          invalidField={
            props.invalidFields.find(x => x === "email") ? true : false
          }
          type="text"
          onChange={props.handleChange}
          info="* Please fill out your primary email"
        />
      </div>
      <br />
    </div>
  );
};

export default personalInformation;
