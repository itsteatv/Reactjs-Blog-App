import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserData } from '../store/userSlice';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Skeleton from '@mui/material/Skeleton';
import ResultPage from '../UI/ResultPage';

function Dashboard() {
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            dispatch(fetchUserData());
        } catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <div className={styles['user-profile-container']}>
                    <Skeleton variant="circular" width={160} height={160} />
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="text" width={100} height={30} />
                    <Skeleton variant="text" width={150} height={30} />
                    <Skeleton variant="text" width={120} height={30} />
                    <Skeleton variant="text" width={130} height={30} />
                    <Skeleton variant="rectangular" width={200} height={40} />
                </div>
            ) : userData ? (
                <>
                    <section className={styles['user-profile-container']}>
                        <img
                            className={styles['user-profile']}
                            src={userData.image}
                            alt="userprofile"
                        />
                        <h1 className={styles['username']}>Welcome, {userData.name}</h1>
                        <h6 className={`${styles['user-name']} ${styles.user}`}>Username: {userData.username}</h6>
                        <p className={`${styles['user-email']} ${styles.user}`}>Email: {userData.email}</p>
                        <p className={`${styles['user-created-at']} ${styles.user}`}>Created At: {userData.created_at}</p>
                        <Link className={styles['update-profile']} to="/setting">
                            <span className={styles['update-profile-span']}>update profile</span>
                        </Link>
                    </section>
                </>
            ) : <ResultPage />}
        </div>
    );
}

export default Dashboard;
