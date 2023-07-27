import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"
import { ToastContainer, toast } from "react-toastify";
import styles from "./Login.module.css"
import useInput from "../hooks/useInput"
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const dispatch = useDispatch();

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        checkError: emailError,
        valueChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        resetValueHandler: resetEmailHandler,
        formIsValid: emailIsValid,
    } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        checkError: passwordError,
        valueChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordInputBlurHandler,
        resetValueHandler: resetPasswordHandler,
        formIsValid: passwordIsValid,
    } = useInput((value) => value.trim().length !== 0);

    const formIsValid = emailIsValid && passwordIsValid;

    const formSubmission = async function (event) {
        event.preventDefault();

        const authHeader = `Bearer ${Cookies.get("token")}`;

        try {
            const response = await fetch("https://neisiali.ir/api/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                }),
            });

            const responseData = await response.json()

            if (response.status === 422 || !responseData.data || !responseData.data.token) {
                throw new Error("Invalid email or password.");
            }

            const token = responseData.data.token;

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);

            Cookies.set("token", token, { expires: expirationDate });

            console.log(responseData);
            console.log(token);

            dispatch(login())
            toast.success("Login was successful!");

            if (!response.ok) {
                throw new Error("Failed to log in.");
            }
        }

        catch (error) {
            toast.error('An error occurred: ' + error.message);
        }

        if (!formIsValid) {
            return;
        }

        resetEmailHandler();
        resetPasswordHandler();
    };

    return (
        <section aria-label="Login" className={styles.login}>
            <form onSubmit={formSubmission} className={styles["form-container"]}>
                <h1 className={styles["form-title"]}>Login</h1>
                <input
                    type="text"
                    className={`${styles["form-input"]} ${emailError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={emailError ? "Please enter a valid email." : "Email"}
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailInputBlurHandler}
                />
                <input
                    type="password"
                    className={`${styles["form-input"]} ${passwordError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={passwordError ? "Please enter a valid password." : "Password"}
                    id="password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={passwordInputBlurHandler}
                />
                <button type="submit" className={styles["btn-primary"]} disabled={!formIsValid}>
                    <span className={styles["loginText"]}>Login</span>
                </button>
            </form>
        </section>
    )
}

export default Login;