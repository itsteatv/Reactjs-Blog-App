import styles from "./SinglePost.module.css";
import data from "../../assets/data/data";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function SinglePost() {
    return (
        <div className={styles["single-post"]}>
            {data.map((post) => (
                <div className={styles.container} key={post.id}>
                    <LazyLoadImage className={styles.image} src={post.cover} effect="blur" width="100%" />
                    <div className={styles.desc}>
                        <div className={styles["badge-container"]}>
                            <span className={styles.badge}>{post.category}</span>
                        </div>
                        <p className={styles.title}>{post.title}</p>
                    </div>
                    <div className={styles.user}>
                        <img src={post.userImage} alt="user profile" />
                        <p className={styles.username}>{post.username}</p>
                        <p className={styles.date}>{post.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SinglePost;
