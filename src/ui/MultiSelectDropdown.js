import * as React from "react";
import PropTypes from "prop-types";

import DropdownInput from "./DropdownInput";

import "../styles/dropdown.scss";

function MultiSelectDropdownOptions({ options, selected, onSelect }) {
  return (
    <div className="dropdown-options">
      {options.map(({ value, label }) => (
        <div
          key={value}
          className="dropdown-option"
          style={{ backgroundColor: selected?.[value] && "#add8e6" }}
          onClick={() => onSelect(value)}
        >
          <input
            type="checkbox"
            checked={selected?.[value]}
            onChange={() => onSelect(value)}
          />
          <label label={label}>{value}</label>
        </div>
      ))}
    </div>
  );
}

function generateDefaultSelectedState(choices) {
  let defaultSelected = {
    None: false,
    "Select All": false,
  };
  choices.forEach((choice) => {
    defaultSelected[choice] = false;
  });

  return defaultSelected;
}

function markCheckedExceptNone(selected) {
  let nextSelectedState = {};

  for (const key of Object.keys(selected)) {
    if (key === "None") {
      nextSelectedState[key] = false;
    } else {
      nextSelectedState[key] = true;
    }
  }

  return nextSelectedState;
}

const defaultMultiSelectOptions = [
  { value: "None", label: "None" },
  { value: "Select All", label: "Select All" },
];

function MultiSelectDropdown({ fieldLabel, choices, id }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(() =>
    generateDefaultSelectedState(choices)
  );

  const choicesAsOptions = choices?.map((choice) => ({
    value: choice,
    label: choice,
  }));

  const options = [...defaultMultiSelectOptions, ...choicesAsOptions];

  const onOptionSelect = (value) => {
    switch (value) {
      case "None": {
        setSelected(generateDefaultSelectedState(choices));
        break;
      }
      case "Select All": {
        setSelected(markCheckedExceptNone(selected));
        break;
      }
      default: {
        setSelected({
          ...selected,
          [value]: !selected[value],
        });
      }
    }
  };

  return (
    <div className="dropdown-wrapper">
      <div onClick={() => setIsOpen(!isOpen)}>
        <DropdownInput
          fieldLabel={fieldLabel}
          id={id}
          selected={selected}
          isOpen={isOpen}
        />
      </div>
      {isOpen && (
        <MultiSelectDropdownOptions
          options={options}
          onSelect={onOptionSelect}
          selected={selected}
        />
      )}
    </div>
  );
}

MultiSelectDropdown.propTypes = {
  id: PropTypes.string,
  fieldLabel: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
};

export default MultiSelectDropdown;
