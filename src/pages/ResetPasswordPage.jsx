import React, { useActionState, useEffect, useState } from 'react'
import { LoginUser, ResetPassword } from '../redux/actions/authActions';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { resetPasswordConstants } from '../constants/AuthConstants';
import Input from '../components/Input';
import SubmitBtn from '../components/SubmitBtn';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    // dispatch(removeError("login"));
    // Get errors, user data, and loading state from Redux store
    const { errors, } = useSelector((state) => state.auth);
    const [state, formSubmit, isPending] = useActionState(HandleResetPassword, {
        user: null,
        error: null,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); 
    // Decode the token safely 
    let decodedToken;

    // Redirect to the login page after successful password update
    useEffect(() => {
        if (passwordUpdated) {
            alert('Password updated successfully!');
            navigate('/login');
        }
    }, [passwordUpdated, navigate]);

    try {
        if (token) {
            decodedToken = jwtDecode(token);
        } else {
            throw new Error('Token is missing');
        }
    } catch (err) {
        console.error('Invalid or missing token:', err.message);
        return (
            <div className="error-container">
                <h2 className="text-center text-red-600 font-bold">Invalid or missing token. Please try again.</h2>
            </div>
        );
    }
   
    function HandleResetPassword(prevState, FormData) {
        let password = FormData.get("password");
        let confirmPassword = FormData.get("confirm_password");

        if (password !== confirmPassword) {

            let errorFeild = document.getElementById("errorMsg");
            errorFeild.innerHTML = "Password Not match";
            return;
        }
        
        let user = {
            password: password,
            token: token
        }
        dispatch(ResetPassword(user)); 
       setPasswordUpdated(true);  
       

    };

    return (
        <div className="register-container m-auto w-full flex flex-col justify-center h-full">
            <h2 className="text-center font-bold text-2xl mb-4">Reset account password </h2>
            <div
                className="text-black mb-2  text-center w-full"
                id="errorMsg"
            ></div>
            <h2 className="text-center text-xl font-bold mb-5">Enter new password for {decodedToken.email}</h2>

            <form className="flex flex-col w-full" action={formSubmit}>
                <div className="flex flex-col justify-center items-center  mb-3 w-full gap-x-2">
                    {resetPasswordConstants.map((item, index) => (
                        <Input key={`login-field-${item.inputName}-${index}`}
                            id={`login-field-${item.inputName}-${index}`}
                            labelText={item.labelText}
                            labelClass={item.labelClass}
                            inputType={item.inputType}
                            inputName={item.inputName}
                            inputPlaceholder={item.inputPlaceholder}
                            inputClass={item.inputClass}
                            isRequired={item.isRequired}
                        />
                    ))}
                    {errors.resetpassword.general && (<p className="text-sm error-message text-center">{errors.resetpassword.general}</p>)}

                </div>
                <div className="w-full flex justify-center">
                    <SubmitBtn
                        buttonType="submit"
                        buttonText={isPending ? "Loading..." : "Reset Password"}
                        buttonClass="capitalize text-white submit-btn rounded-md text-base p-2 w-96"
                        isDisabled={isPending ? true : false}
                    />
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordPage