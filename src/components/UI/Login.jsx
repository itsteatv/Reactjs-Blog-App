import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"
import useInput from "../hooks/useInput"

function Login() {
    const navigate = useNavigate();

    const {
        value: enteredUsername,
        isValid: enteredUsernameIsValid,
        checkError: usernameError,
        valueChangeHandler: usernameChangeHandler,
        valueInputBlurHandler: usernameInputBlurHandler,
        resetValueHandler: resetUsernameHandler,
        formIsValid: usernameIsValid,
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

    const formIsValid = usernameIsValid && passwordIsValid;

    const formSubmission = function (event) {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        resetUsernameHandler();
        resetPasswordHandler();

        navigate('/home');
    };

    return (
        <section aria-label="Login" className={styles.login}>
            <form onSubmit={formSubmission} className={styles["form-container"]}>
                <h1 className={styles["form-title"]}>Login</h1>
                <input
                    type="text"
                    className={`${styles["form-input"]} ${usernameError ? `${styles.invalid} ${styles.shake}` : ""}`}
                    placeholder={usernameError ? "Please enter a valid name." : "Username"}
                    id="username"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                    onBlur={usernameInputBlurHandler}
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
