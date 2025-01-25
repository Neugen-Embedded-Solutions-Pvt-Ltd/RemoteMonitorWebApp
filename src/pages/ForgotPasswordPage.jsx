import React, { useActionState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../redux/actions/authActions";
import { forgotPasswordConstants } from "../constants/AuthConstants";
import Input from "../components/Input";
import SubmitBtn from "../components/SubmitBtn";
import { useNavigate } from "react-router";
import { IoMdInformationCircle } from "react-icons/io";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const { isEmailSent, isLoading, errors, set } = useSelector((state) => state.auth);
   
    const [data, formSubmit, isPending] = useActionState(forgotPassword, {
        user: "",
        error: "",
    });

    function forgotPassword(prevState, formData) {
        let email = formData.get("email");
        dispatch(ForgotPassword({ email: email }, navigate));
    }
    return (
        <div className="register-container m-auto w-full flex flex-col justify-center mt-24">
            <h2 className="text-center font-bold mb-3">Forgot your password?</h2>
            <form className="flex flex-col w-full" action={formSubmit}>
             
                {isEmailSent ? <div className="poup-bg-color flex gap-x-2 p-2 rounded-md items-center">
                    <div className="text-white text-2xl"><IoMdInformationCircle /></div>
                    <div className="text-white text-base">
                        Check your email for instructions on how to reset your password
                    </div>
                </div> : <div className="flex flex-col justify-center items-center mb-3 w-full h-full gap-x-2">
                    {forgotPasswordConstants.map((item, index) => (
                        <Input
                            key={`password-field-${item.inputName}-${index}`}
                            id={`password-field-${item.inputName}-${index}`}
                            labelClass={item.labelClass}
                            labelText={item.labelText}
                            inputType={item.inputType}
                            inputName={item.inputName}
                            inputPlaceholder={item.inputPlaceholder}
                            inputClass={item.inputClass}
                            isRequired={item.isRequired}
                        />
                    ))}
                        {/* {errors.forgotpassword.general && (
                        <p className="text-sm error-message text-center">
                            {errors.forgotpassword.general}
                        </p>
                    )} */}
                    <div className="w-full flex justify-center mt-5">
                        <SubmitBtn
                            buttonType="submit"
                            buttonText={isLoading ? "Loading..." : "Send Password Reset Link"}
                            buttonClass="capitalize text-white submit-btn rounded-md text-base py-3 w-full"
                            isDisabled={isLoading ? true : false}
                        />
                    </div>
                </div>
                }


            </form>
        </div>
    );
};

export default ForgotPasswordPage;
