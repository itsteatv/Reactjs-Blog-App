import { useState } from "react";

function useInput(validateValue) {
    const [enteredValue, setEnteredValue] = useState("");
    const [inputIsTouched, setInputIsTouched] = useState(false);

    const enteredValueIsValid = validateValue(enteredValue);
    const checkError = !enteredValueIsValid && inputIsTouched;

    const valueChangeHandler = function (event) {
        setEnteredValue(event.target.value);
    };

    const valueInputBlurHandler = function () {
        setInputIsTouched(true);
    };

    const resetValueHandler = () => {
        setEnteredValue("");
        setInputIsTouched(false);
    };

    const formIsValid = enteredValueIsValid && inputIsTouched;

    return {
        value: enteredValue,
        isValid: enteredValueIsValid,
        checkError,
        valueChangeHandler,
        valueInputBlurHandler,
        resetValueHandler,
        formIsValid,
    };
}

export default useInput;
