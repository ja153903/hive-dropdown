import PropTypes from "prop-types";

import SingleSelectDropdown from "./SingleSelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";

function Dropdown({ multiSelect, ...rest }) {
  if (multiSelect) {
    return <MultiSelectDropdown {...rest} />;
  }

  return <SingleSelectDropdown {...rest} />;
}

Dropdown.propTypes = {
  id: PropTypes.string,
  fieldLabel: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  multiSelect: PropTypes.bool,
};

export default Dropdown;
