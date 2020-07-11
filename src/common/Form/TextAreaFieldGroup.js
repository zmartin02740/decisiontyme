import React from "react";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  defaultValue
}) => {
  return (
    <div className="form-group">
      <textarea
        className="form-control form-control-lg"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

export default TextAreaFieldGroup;
