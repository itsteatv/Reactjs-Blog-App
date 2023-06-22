import styles from "./Post.module.css";
import data from "../../assets/data/data";
import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function SinglePost() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles["single-post"]}>
            {data.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id} className={styles.link}>
                    <div className={styles.container}>
                        {isLoading ? (
                            <Skeleton
                                className={styles.image}
                                variant="rounded"
                                width="100%"
                            />
                        ) : (
                            <img className={styles.image} src={post.cover} alt="" />
                        )}
                        <div className={styles.desc}>
                            <div className={styles["badge-container"]}>
                                <span className={styles.badge}>{post.category}</span>
                            </div>
                            {isLoading ? (
                                <Skeleton
                                    className={styles.title}
                                    variant="text"
                                />
                            ) : (
                                <p className={styles.title}>{post.title}</p>
                            )}
                        </div>
                        <div className={styles.user}>
                            {isLoading ? (
                                <Skeleton
                                    className={styles.userImage}
                                    variant="circular"
                                    animation="wave"
                                    width={70}
                                    height={40}
                                />
                            ) : (
                                <img src={post.userImage} alt="user profile" />
                            )}
                            {isLoading ? (
                                <Skeleton
                                    className={styles.username}
                                    variant="text"
                                    width="80%"
                                />
                            ) : (
                                <p className={styles.username}>{post.username}</p>
                            )}
                            {isLoading ? (
                                <Skeleton
                                    className={styles.date}
                                    variant="text"
                                    width="50%"
                                />
                            ) : (
                                <p className={styles.date}>{post.date}</p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SinglePost;
