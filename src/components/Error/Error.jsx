import styles from "./Error.module.css"

function ErrorPage() {
    return (
        <section className={styles["error-container"]}>
            <h1 className={styles["error-title"]}>Error 404: Page Not Found</h1>
            <p className={styles["error-desc"]}>The page you are looking for does not exist.</p>
        </section>
    );
}

export default ErrorPage;
