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
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Write</li>
                            <li>Logout</li>
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
