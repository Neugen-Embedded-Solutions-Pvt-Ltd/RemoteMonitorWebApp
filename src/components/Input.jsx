import React from "react";
import PropTypes from "prop-types";

const Input = ({
    id,
    labelText,
    labelClass,
    spanClassName="",
    inputType,
    inputName,
    inputPlaceholder,
    inputClass,
    isRequired=false,

}) => {
    return (
        <div className="input-wrapper flex flex-col mb-2 w-full gap-y-1" key={id}>
            <label className={labelClass}>{labelText}<span className={`required-field ${spanClassName}`}></span> </label>
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
