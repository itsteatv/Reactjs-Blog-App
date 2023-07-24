import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearTokenCookie, logout } from "../store/authSlice";
import { logoutAndResetRegistration } from "../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { fetchUserData } from '../store/userSlice';
import { CiLogout } from "react-icons/ci"
import styles from "./Navbar.module.css";
import ThemeSwitcher from "../Theme Switcher/ThemeSwitcher";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isRegistered = useSelector((state) => state.register.isRegistered);
    const { data: userData, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMobileMenu = function () {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (isLoggedIn || isRegistered) {
            dispatch(fetchUserData()).catch((error) => {
                toast.error(error.message)
            });
        }
    }, [dispatch, isLoggedIn, isRegistered]);

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
                            {!isLoggedIn && !isRegistered && <NavLink to="/register" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Register</NavLink>}
                            {(isLoggedIn || isRegistered) && (
                                <>
                                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>{userData ? userData.name : "dashboard"}</NavLink>
                                    <button onClick={handleLogout} style={{ background: "transparent", border: "none" }}> <CiLogout className={styles["logout-icon"]} /> </button>
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
