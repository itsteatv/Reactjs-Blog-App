import { PiWarningCircleLight } from "react-icons/pi"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import styles from "./Register.module.css"
import useInput from "../hooks/useInput"
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { register } from "../store/registerSlice"
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

function Register() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

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

    // const {
    //     value: enteredPhone,
    //     isValid: enteredPhoneIsValid,
    //     checkError: phoneError,
    //     valueChangeHandler: phoneChangeHandler,
    //     valueInputBlurHandler: phoneInputBlurHandler,
    //     validateAndSetValue: phoneValidateAndSetValue,
    //     resetValueHandler: resetPhoneHandler,
    //     formIsValid: phoneIsValid,
    // } = useInput((value) => /((0?9)|(\+?989))((14)|(13)|(12)|(19)|(18)|(17)|(15)|(16)|(11)|(10)|(90)|(91)|(92)|(93)|(94)|(95)|(96)|(32)|(30)|(33)|(35)|(36)|(37)|(38)|(39)|(00)|(01)|(02)|(03)|(04)|(05)|(41)|(20)|(21)|(22)|(23)|(31)|(34)|(9910)|(9911)|(9913)|(9914)|(9999)|(999)|(990)|(9810)|(9811)|(9812)|(9813)|(9814)|(9815)|(9816)|(9817)|(998))\W?\d{3}\W?\d{4}/g.test(value.trim()));

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
        fullNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;

    const formSubmission = async function (event) {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        try {
            const response = await fetch("https://neisiali.ir/api/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Authorization: authHeader,
                },
                body: JSON.stringify({
                    name: enteredFullName,
                    email: enteredEmail,
                    password: enteredPassword,
                    password_confirmation: enteredConfirmPassword,
                })
            });

            const responseData = await response.json()
            const token = responseData.data.token;
            // const authHeader = `bearer ${token}`;

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);

            Cookies.set("token", token, { expires: expirationDate });

            dispatch(register());
            setRegisterSuccess(true)

            console.log(responseData);
            console.log(responseData.data.token);
            console.log(token);

            if (!response.ok) {
                throw new Error("Failed to create account.");
            }
        } catch (error) {
            setError(error.message);
        }

        resetFullNameHandler();
        resetEmailHandler();
        // resetPhoneHandler();
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
                {/* <PhoneInput
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
                        borderRadius: "0",
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
                /> */}
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
                    type={showPassword ? "text" : "password"}
                    className={`${styles["register-input"]} ${confirmPasswordError ? `${styles.invalid} ${styles.shake}` : ""
                        }`}
                    placeholder={confirmPasswordError ? "Passwords do not match." : "Confirm Password"}
                    id="confirmPassword"
                    value={enteredConfirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordInputBlurHandler}
                />
                <span
                    className={styles["password-visibility-button"]}
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <AiFillEyeInvisible className={styles["visibility-icon"]} /> : <AiFillEye className={styles["visibility-icon"]} />}
                </span>

                {error && <p>{error}</p>}
                {registerSuccess && <p>Account Created Successfully</p>}
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