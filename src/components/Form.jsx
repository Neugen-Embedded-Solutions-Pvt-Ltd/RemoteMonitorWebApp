import React from 'react'
import PropTypes from 'prop-types'

const Form = ({ actionName, classNames, children }) => {
    return (
        <form action={actionName} className={classNames}>
        {children}</form>
    )
}

Form.propTypes = {
    actionName: PropTypes.func,
    className: PropTypes.string
}

export default Form;


// Accept a Submission Handler as a Prop