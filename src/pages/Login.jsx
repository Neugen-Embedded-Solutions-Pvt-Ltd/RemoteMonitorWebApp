import React, { useActionState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginConstants } from "../constants/AuthConstants";
import Input from "../components/Input";
import SubmitBtn from "../components/SubmitBtn";
import { LoginUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { removeError } from "../redux/slices/AuthSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Get errors, user data, and loading state from Redux store
    const { errors } = useSelector((state) => state.auth);

    // const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
    const [state, formSubmit, isPending] = useActionState(HandleLogin, {
        user: null,
        error: null,
    });
    useEffect(() => {
        dispatch(removeError("login"));

    }, [dispatch]);
    function HandleLogin(prevState, FormData) {
        let username = FormData.get("username");
        let password = FormData.get("password");
        let user = {
            username: username,
            password: password,
        };
        dispatch(LoginUser(user, navigate));

        console.log(errors);
        return {
            user: {
                username: username,
                password: password,
                message: "Sucess",
            },
            error: null,
        };
    }
    function redirect() {
        navigate("/forgot-password");
    }
    return (
        <div className="register-container m-auto w-full flex flex-col justify-center h-full px-3">
            <h2 className="text-center font-bold mb-3">Sign in to your device</h2>
            <form className="flex flex-col w-full" action={formSubmit}>
                <div className="flex flex-col justify-center items-center  mb-3 w-full gap-x-2">
                    {loginConstants.map((item, index) => (
                        <Input
                            key={`login-field-${item.inputName}-${index}`}
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
                    {errors.login.general && (
                        <p className="text-sm error-message text-center">
                            {errors.login.general}
                        </p>
                    )}
                </div>
                <div className="flex justify-end mb-4">
                    <button
                        className="border-0 btn-text-color"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <SubmitBtn
                        buttonType="submit"
                        buttonText={isPending ? "Loading..." : "Login"}
                        buttonClass="capitalize text-white submit-btn rounded-md text-xl font-bold p-2 w-96"
                        isDisabled={isPending ? true : false}
                    />
                </div>
            </form>
            <div className="flex justify-center btn-text-color mt-3">
                <div className="mr-2">No account? </div>{" "}
                <button
                    className="border-0 btn-text-color underline underline-offset-2"
                    onClick={() => navigate("/register")}
                >
                    Register{" "}
                </button>
            </div>
        </div>
    );
};

export default Login;
