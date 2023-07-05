import { NavLink } from "react-router-dom";
import { useState } from "react"
import styles from "./Navbar.module.css"
import ThemeSwitcher from "../Theme Switcher/ThemeSwitcher";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = function () {
        setIsMobileMenuOpen((prevState) => !prevState)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
                        <ul className={styles.menu}>
                            <NavLink to="/" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Home</NavLink>
                            <NavLink to="/About" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>About</NavLink>
                            <NavLink to="/Contact" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Contact</NavLink>
                            <NavLink to="/Write" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Write</NavLink>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.linkStyle : styles.inActive)}>Login</NavLink>
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
    )
}

export default Navbar
