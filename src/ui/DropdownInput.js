import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "../styles/dropdown.scss";

function SelectIcon({ isOpen }) {
  if (isOpen) {
    return <FontAwesomeIcon icon={faAngleUp} />;
  }

  return <FontAwesomeIcon icon={faAngleDown} />;
}

function DropdownInput({ selected, fieldLabel, id, isOpen }) {
  const getSelected = () => {
    if (typeof selected === "object") {
      return Object.entries(selected)
        .filter(
          ([key, value]) => value && !["None", "Select All"].includes(key)
        )
        .map(([key, _value]) => key)
        .join(", ");
    }

    return selected;
  };

  return (
    <div className="dropdown-input">
      <label htmlFor={id} className="dropdown-label">
        {fieldLabel}
      </label>
      <div className="dropdown-input-text">
        <p>{getSelected()}</p>
        <SelectIcon isOpen={isOpen} />
      </div>
    </div>
  );
}

DropdownInput.propTypes = {
  id: PropTypes.string,
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
    PropTypes.string,
  ]),
  fieldLabel: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default DropdownInput;
