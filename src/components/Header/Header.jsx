import styles from "./Header.module.css";
import headerImage from "../../assets/HeaderImage.png";
import UserImage from "../../assets/UserImage.png";
import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

function Header() {
    const [isHeaderImageLoaded, setHeaderImageLoaded] = useState(false);
    const [isUserImageLoaded, setUserImageLoaded] = useState(false);

    useEffect(() => {
        const headerImageElement = new Image();
        headerImageElement.src = headerImage;
        headerImageElement.onload = () => {
            setHeaderImageLoaded(true);
        };

        const userImageElement = new Image();
        userImageElement.src = UserImage;
        userImageElement.onload = () => {
            setUserImageLoaded(true);
        };
    }, []);

    return (
        <section className={styles.Header}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles["badge-container"]}>
                        <span>Technology</span>
                    </div>
                    <div className={styles.title}>
                        React useState Vs. Context API: When to Use Them
                    </div>
                </div>
                <div className={styles["short-info"]}>
                    <div className={styles.author}>
                        {isUserImageLoaded ? (
                            <img
                                className={styles.userImage}
                                src={UserImage}
                                alt=""
                            />
                        ) : (
                            <Skeleton
                                className={styles.userImage}
                                variant="circular"
                                width={40}
                                height={40}
                            />
                        )}
                        <span className={styles.name}>Tracy Wilson</span>
                    </div>
                    <div className={styles.date}>August 20, 2022</div>
                </div>
            </div>
            {isHeaderImageLoaded ? (
                <img
                    className={styles["header-image"]}
                    src={headerImage}
                    alt=""
                />
            ) : (
                <Skeleton
                    className={styles["header-image"]}
                    variant="rectangular"
                    width="100%"
                    height={200}
                />
            )}
        </section>
    );
}

export default Header;
