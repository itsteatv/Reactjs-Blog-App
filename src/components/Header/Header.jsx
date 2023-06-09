import styles from "./Header.module.css"
import headerImage from "../../assets/HeaderImage.png"
import UserImage from "../../assets/UserImage.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Header() {
    return (
        <section className={styles.Header}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles["badge-container"]}>
                        <span>Technology</span>
                    </div>
                    <div className={styles.title}>React useState Vs. Context API: When to Use Them</div>
                </div>
                <div className={styles["short-info"]}>
                    <div className={styles.author}>
                        <img className={styles.userImage} src={UserImage} alt=""></img>
                        <span className={styles.name}>Tracy Wilson</span>
                    </div>
                    <div className={styles.date}>August 20, 2022</div>
                </div>
            </div>
            <LazyLoadImage className={styles["header-image"]} src={headerImage} alt="" effect="blur" width="100%" />
        </section>
    )
}

export default Header
