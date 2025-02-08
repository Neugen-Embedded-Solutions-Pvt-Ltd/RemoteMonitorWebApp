import React from 'react'
import PropTypes from 'prop-types'

const SubmitBtn = ({ buttonType, buttonText, buttonClass, isDisabled }) => {
    return (
        <button type={buttonType} className={buttonClass} disabled={isDisabled} >{buttonText}</button>
    );
};

SubmitBtn.propTypes = {
    buttonType: PropTypes.string,
    buttonText: PropTypes.string,
    buttonClass: PropTypes.string,
    isDisabled: PropTypes.bool
}

export default SubmitBtn;