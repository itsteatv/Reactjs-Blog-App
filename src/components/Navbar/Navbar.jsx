import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearTokenCookie, logout } from "../store/authSlice";
import { logoutAndResetRegistration } from "../store/authSlice";
import { ToastContainer } from "react-toastify";
import styles from "./Navbar.module.css";
import ThemeSwitcher from "../Theme Switcher/ThemeSwitcher";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isRegistered = useSelector((state) => state.register.isRegistered)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMobileMenu = function () {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        dispatch(logoutAndResetRegistration());
        clearTokenCookie();
        navigate('/');
    };

    return (
        <>
            <ToastContainer limit={1} />
            <header className={styles.header}>
                <div className={styles.container}>
                    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
                        <ul className={styles.menu}>
                            <NavLink to="/" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Home</NavLink>
                            <NavLink to="/About" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>About</NavLink>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Register</NavLink>
                            {(isLoggedIn || isRegistered) && (
                                <>
                                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>dashboard</NavLink>
                                    <button className={styles.linkStyle} onClick={handleLogout}>Logout</button>
                                </>
                            )}
                        </ul>
                    </nav>
                    <div className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.open : ""
                        }`} onClick={toggleMobileMenu}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                </div>
                {!isMobileMenuOpen ? <ThemeSwitcher /> : ""}
            </header>
        </>
    );
}

export default Navbar;
