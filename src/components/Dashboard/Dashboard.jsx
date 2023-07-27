import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserData } from '../store/userSlice';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Skeleton from '@mui/material/Skeleton';
import ResultPage from '../UI/ResultPage';
import Cookies from 'js-cookie';

function Dashboard() {
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector((state) => state.user);
    const [image, setImage] = useState(null);

    useEffect(() => {
        try {
            dispatch(fetchUserData());
        } catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }, [dispatch]);

    const handleChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authHeader = `Bearer ${Cookies.get('token')}`;

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('image', image);

            const response = await fetch('https://neisiali.ir/api/user', {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                dispatch(fetchUserData());

                toast.success('User Profile Updated Successfully', {
                    autoClose: 2000,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 3000);

                setImage(null);
            } else {
                const data = await response.json();
                const errors = data?.errors || {};
                if (errors.email && errors.email.length > 0) {
                    toast.error(errors.email[0]);
                } else if (errors.username && errors.username.length > 0) {
                    toast.error(errors.username[0]);
                } else {
                    throw new Error('Validation Error');
                }
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

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
                        <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                            <img
                                className={styles['user-profile']}
                                src={userData.image}
                                alt="userprofile"
                            />
                            <label className={styles["form-label"]}>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className={styles['form-input']}
                                    onChange={handleChange}
                                />
                                choose image
                            </label>
                            <h1 className={styles['username']}>Welcome, {userData.name}</h1>
                            <h6 className={`${styles['user-name']} ${styles.user}`}>Username: {userData.username}</h6>
                            <p className={`${styles['user-email']} ${styles.user}`}>Email: {userData.email}</p>
                            <p className={`${styles['user-created-at']} ${styles.user}`}>Created At: {userData.created_at}</p>
                            <button className={`${styles['update-profile']} ${styles["update-image"]}`}>
                                <span className={styles['update-profile-span']}>update image</span>
                            </button>
                        </form>
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
