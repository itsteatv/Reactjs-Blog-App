import styles from "./Register.module.css"
import useInput from "../hooks/useInput"
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { PiWarningCircleLight } from "react-icons/pi"
import { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Register() {
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

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
    } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        checkError: phoneError,
        valueChangeHandler: phoneChangeHandler,
        valueInputBlurHandler: phoneInputBlurHandler,
        validateAndSetValue: phoneValidateAndSetValue,
        resetValueHandler: resetPhoneHandler,
        formIsValid: phoneIsValid,
    } = useInput((value) => value.trim().length !== 0);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        checkError: passwordError,
        valueChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordInputBlurHandler,
        resetValueHandler: resetPasswordHandler,
        formIsValid: passwordIsValid,
    } = useInput((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value));

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
                    id="fullName"
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
                <PhoneInput
                    inputProps={{
                        className: `${styles["register-input"]} ${phoneError ? `${styles.invalid} ${styles.shake}` : ""}`,
                        id: "phone",
                    }}
                    buttonStyle={{
                        position: "absolute",
                        top: "-11px",
                        right: "10px",
                        bottom: "5px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "0"
                    }}
                    dropdownStyle={{
                        outline: "none",
                        boxShadow: "1px 2px 10px #00000059",
                        backgroundColor: "#fff",
                        maxHeight: "200px",
                        overflowY: scroll,
                        borderRadius: "0 0 3px 3px",
                        width: "auto",
                        position: "relative",
                        margin: "auto",
                    }}
                    country={'ir'}
                    enableClickOutside={true}
                    specialLabel=""
                    value={enteredPhone}
                    onChange={phoneValidateAndSetValue}
                    onBlur={phoneInputBlurHandler}
                    autoFormat={true}
                    copyNumbersOnly={true}
                    placeholder={phoneError ? "Please enter a valid phone number." : "Phone"}
                    countryCodeEditable={true}
                // buttonClass={`${styles["phone-input-button"]} ${phoneError ? `${styles.invalid} ${styles.shake}` : ""}`}
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
                {passwordError && (
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <Tooltip title="Your password must be have at least
                    8 characters long
                    1 uppercase & 1 lowercase character
                    1 number" placement="bottom-start" onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            PopperProps={{
                                disablePortal: true,
                            }}
                        >
                            <div className={styles["warn-icon-container"]}>
                                <PiWarningCircleLight onClick={handleTooltipOpen} className={styles["warn-icon"]} />
                            </div>
                        </Tooltip>
                    </ClickAwayListener>
                )}
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