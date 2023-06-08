import styles from "./ThemeSwitcher.module.css";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import sunny from "../../assets/sunny.png";

function ThemeSwitcher() {
    const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useLocalStorage(
        "userForm-theme",
        defaultTheme ? "dark" : "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("color-scheme", theme);
    }, [theme]);

    const handlerThemeSwitch = function () {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <>
            <div className={styles["btn-container"]}>
                <div className={styles.btns}>
                    <button
                        className={`${styles.button} ${theme === "dark" ? styles.darkButton : styles.lightButton}`}
                        aria-label={`Change theme to ${theme === "light" ? "dark" : "light"
                            } mode`}
                        role="toggle"
                        onClick={handlerThemeSwitch}
                    >
                        {theme === "dark" ? (
                            <div className={styles["sunny-container"]}>
                                <img className={styles["sunny-image"]} src={sunny} alt="dark sunny" />
                            </div>
                        ) : (
                            <div className={styles["light-sunny-container"]}>
                                <img className={styles["light-sunny-image"]} src={sunny} alt="light sunny" />
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ThemeSwitcher;
