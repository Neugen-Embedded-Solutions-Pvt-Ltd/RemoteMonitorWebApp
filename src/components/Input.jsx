import React from "react";
import PropTypes from "prop-types";

const Input = ({
    id,
    labelText,
    labelClass,
    inputType,
    inputName,
    inputPlaceholder,
    inputClass,
    isRequired=false,
    props
}) => {
    console.log(`Input ID: ${id}, isRequired: ${isRequired}`); // Debugging log
    return (
        <div className="input-wrapper flex flex-col w-inputBox mb-2" key={id}>
            <label htmlFor={labelClass}>{labelText}<span className="required-field"></span> </label>
            <input
                name={inputName}
                type={inputType}
                placeholder={inputPlaceholder}
                required={isRequired}
                className={inputClass}
                
            />
        </div>
    );
};

Input.propTypes = { 
    labelText: PropTypes.string,
    labelClass: PropTypes.string,
    inputType: PropTypes.string,
    inputName: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputClass: PropTypes.string,
    isRequired: PropTypes.bool,

};

Input.defaultProps = {
    isRequired: false,
};

export default Input;
