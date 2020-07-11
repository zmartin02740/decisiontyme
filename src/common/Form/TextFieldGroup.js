import React from "react";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  defaultValue,
  invalidField
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-control form-control-lg"
        style={
          invalidField ?
            {
              border: '2px solid red'
            } : {}
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
