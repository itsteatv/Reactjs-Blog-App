import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import styles from "./Post.module.css";
import { format } from "date-fns";

const POSTS_PER_PAGE = 2;

function SinglePost() {
    const [isLoading, setLoading] = useState(true);

    const [allPosts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
            console.log(responseData);
            console.log(responseData.data[0].categories[0].name);

            if (!response.ok) {
                throw new Error("Failed to get posts.");
            }

            setAllPosts(responseData.data);
        }
        catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }

    const currentPosts = allPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    return (
        <>
            <div className={styles["single-post"]}>
                {currentPosts.map((post) => (
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
            <div className={styles.pagination}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    );
}

export default SinglePost;
