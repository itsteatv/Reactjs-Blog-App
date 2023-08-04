import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import styles from "./Post.module.css";
import { format } from "date-fns";

function SinglePost() {
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    console.log(posts);

    useEffect(() => {
        fetchPostData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const fetchPostData = async function () {
        const authHeader = `Bearer ${Cookies.get("token")}`;

        try {
            const response = await fetch("https://neisiali.ir/api/posts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
            });

            const responseData = await response.json();
            console.log(responseData.data);
            console.log(responseData.data[0].categories[0].name);

            if (!response.ok) {
                throw new Error("Failed to get posts.");
            }

            setPosts(responseData.data);
        }
        catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }

    return (
        <div className={styles["single-post"]}>
            {posts.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id} className={styles.link}>
                    <div className={styles.container}>
                        {isLoading ? (
                            <Skeleton
                                className={styles.image}
                                variant="rounded"
                                width="100%"
                            />
                        ) : (
                            <img className={styles.image} src={post.image} alt="" />
                        )}
                        <div className={styles.desc}>
                            <div className={styles["badge-container"]}>
                                {isLoading ? (
                                    <Skeleton
                                        className={styles.badge}
                                        variant="text"
                                    />
                                ) : (
                                    post.categories.map((category) => (
                                        <span key={category.slug} className={styles.badge}>
                                            {category.name}
                                        </span>
                                    ))
                                )}
                            </div>
                            {isLoading ? (
                                <Skeleton
                                    className={styles.title}
                                    variant="text"
                                />
                            ) : (
                                <p className={styles.title}>{post.name}</p>
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
                                <img className={styles["author-image"]} src={post.user.image} alt="user profile" />
                            )}
                            {isLoading ? (
                                <Skeleton
                                    className={styles.username}
                                    variant="text"
                                    width="80%"
                                />
                            ) : (
                                <p className={styles.username}>{post.user.name}</p>
                            )}
                            {isLoading ? (
                                <Skeleton
                                    className={styles.date}
                                    variant="text"
                                    width="50%"
                                />
                            ) : (
                                <p className={styles.date}>
                                    {format(new Date(post.created_at), "MMMM d, yyyy")}
                                </p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SinglePost;
