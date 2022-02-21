import * as React from "react";
import PropTypes from "prop-types";

import DropdownInput from "./DropdownInput";

import "../styles/dropdown.scss";

function SingleSelectDropdownOptions({ options, onOptionSelect, selected }) {
  return (
    <div className="dropdown-options">
      {" "}
      {options.map(({ value }) => (
        <div
          className="dropdown-option"
          key={value}
          onClick={() => onOptionSelect(value)}
          style={{ backgroundColor: selected === value && "#add8e6" }}
        >
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

function SingleSelectDropdown({ fieldLabel, choices, id }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("None");

  const choicesAsOptions =
    choices?.map((choice) => ({
      value: choice,
      label: choice,
    })) ?? [];

  const options = [{ value: "None" }, ...choicesAsOptions];

  const handleOptionSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <div onClick={() => setIsOpen(!isOpen)}>
        <DropdownInput
          fieldLabel={fieldLabel}
          selected={selected}
          id={id}
          isOpen={isOpen}
        />
      </div>
      {isOpen && (
        <SingleSelectDropdownOptions
          selected={selected}
          options={options}
          onOptionSelect={handleOptionSelect}
        />
      )}
    </div>
  );
}

SingleSelectDropdown.propTypes = {
  id: PropTypes.string,
  fieldLabel: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
};

export default SingleSelectDropdown;
