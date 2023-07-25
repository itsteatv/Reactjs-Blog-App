import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserData } from '../store/userSlice';
import { Link } from "react-router-dom"
import styles from "./Dashboard.module.css"
import userProfile from "../../assets/UsersProfile/userProfile.png"

function Dashboard() {
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            dispatch(fetchUserData())
        } catch (error) {
            toast.error('An error occurred: ' + error.message)
        }
    }, [dispatch])

    return (
        <div>
            {userData ? (
                <>
                    <section className={styles["user-profile-container"]}>
                        <img className={styles["user-profile"]} src={userProfile} alt="user profile" />
                        <h1 className={styles["username"]}>Welcome, {userData.name}</h1>
                        <h6 className={`${styles["user-name"]} ${styles.user}`}>Username: {userData.username}</h6>
                        <p className={`${styles["user-email"]} ${styles.user}`}>Email: {userData.email}</p>
                        <p className={`${styles["user-id"]} ${styles.user}`}>ID: {userData.id}</p>
                        <p className={`${styles["user-created-at"]} ${styles.user}`}>Created At: {userData.created_at}</p>
                        <Link className={styles["update-profile"]} to="/setting">
                            <span className={styles["update-profile-span"]}>
                                update profile
                            </span>
                        </Link>
                    </section>
                </>
            ) : null}
        </div>
    );
}

export default Dashboard;
