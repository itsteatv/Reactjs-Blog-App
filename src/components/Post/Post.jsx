import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Skeleton } from "@mui/material";
import { Waveform } from '@uiball/loaders'
import Cookies from "js-cookie";
import styles from "./Post.module.css";
import Pagination from "../UI/Pagination";

function SinglePost() {
    const [isLoading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [postPerPage, setPostPerPage] = useState(10);

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
            const response = await fetch(`https://neisiali.ir/api/posts?page=${currentPage}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
            });

            const responseData = await response.json();
            console.log(responseData);

            if (!response.ok) {
                throw new Error("Failed to get posts.");
            }

            setAllPosts(responseData.data);
            setCurrentPage(responseData.meta.current_page);
        }
        catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
    console.log(indexOfLastPost, indexOfFirstPost, currentPosts);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {isLoading ?
                <div className={styles.loading}>
                    <Waveform
                        size={40}
                        lineWeight={3.5}
                        speed={1}
                        color="black"
                    />
                </div>
                :
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
                    <Pagination
                        postsPerPage={postPerPage}
                        totalPosts={allPosts.length}
                        paginate={paginate}
                    />
                </>
            }
        </>
    );
}

export default SinglePost;