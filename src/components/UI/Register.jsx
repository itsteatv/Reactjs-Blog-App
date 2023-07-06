import styles from "./Register.module.css"
import useInput from "../hooks/useInput"
import { Link } from "react-router-dom";

function Register() {
    const {
        value: enteredFullName,
        isValid: enteredFullNameIsValid,
        checkError: fullNameError,
        valueChangeHandler: fullNameChangeHandler,
        valueInputBlurHandler: fullNameInputBlurHandler,
        resetValueHandler: resetFullNameHandler,
        formIsValid: fullNameIsValid,
    } = useInput((value) => value.trim().length !== 0);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        checkError: emailError,
        valueChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        resetValueHandler: resetEmailHandler,
        formIsValid: emailIsValid,
    } = useInput((value) => value.trim().length !== 0);

    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        checkError: phoneError,
        valueChangeHandler: phoneChangeHandler,
        valueInputBlurHandler: phoneInputBlurHandler,
        resetValueHandler: resetPhoneHandler,
        formIsValid: phoneIsValid,
    } = useInput((value) => /^\d{10}$/.test(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        checkError: passwordError,
        valueChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordInputBlurHandler,
        resetValueHandler: resetPasswordHandler,
        formIsValid: passwordIsValid,
    } = useInput((value) => value.trim().length !== 0);

    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmPasswordIsValid,
        checkError: confirmPasswordError,
        valueChangeHandler: confirmPasswordChangeHandler,
        valueInputBlurHandler: confirmPasswordInputBlurHandler,
        resetValueHandler: resetConfirmPasswordHandler,
        formIsValid: confirmPasswordIsValid,
    } = useInput((value) => value === enteredPassword);

    const formIsValid =
        fullNameIsValid && emailIsValid && phoneIsValid && passwordIsValid && confirmPasswordIsValid;

    const formSubmission = function (event) {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        resetFullNameHandler();
        resetEmailHandler();
        resetPhoneHandler();
        resetPasswordHandler();
        resetConfirmPasswordHandler();
    };

    return (
        <section aria-label="Register" className={styles.register}>
            <form onSubmit={formSubmission} className={styles["form-container"]}>
                <h1 className={styles["form-title"]}>Register</h1>
                <input
                    type="text"
                    className={`${styles["register-input"]} ${fullNameError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={fullNameError ? "Please enter a valid name." : "Full Name"}
                    id="fullname"
                    value={enteredFullName}
                    onChange={fullNameChangeHandler}
                    onBlur={fullNameInputBlurHandler}
                />
                <input
                    type="text"
                    className={`${styles["register-input"]} ${emailError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={emailError ? "Please enter a valid email." : "Email"}
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailInputBlurHandler}
                />
                <input
                    type="text"
                    className={`${styles["register-input"]} ${phoneError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={phoneError ? "Please enter a valid phone number." : "Phone"}
                    id="phone"
                    value={enteredPhone}
                    onChange={phoneChangeHandler}
                    onBlur={phoneInputBlurHandler}
                />
                <input
                    type="password"
                    className={`${styles["register-input"]} ${passwordError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={passwordError ? "Please enter a valid password." : "Password"}
                    id="password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={passwordInputBlurHandler}
                />
                <input
                    type="password"
                    className={`${styles["register-input"]} ${confirmPasswordError ? `${styles.invalid} ${styles.shake}` : ""
                        }`}
                    placeholder={confirmPasswordError ? "Passwords do not match." : "Confirm Password"}
                    id="confirmPassword"
                    value={enteredConfirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordInputBlurHandler}
                />
                <button type="submit" className={`${styles["register-btn"]} ${styles.btn}`} disabled={!formIsValid}>
                    <span className={styles["registerText"]}>Register</span>
                </button>
                <button type="submit" className={`${styles["haveAccount-btn"]} ${styles.btn} ${styles.btn2}`} disabled={!formIsValid}>
                    <Link to="/login" className={styles["registerText"]}>have account ? sign in</Link>
                </button>
            </form>
        </section>
    );
}

export default Register;