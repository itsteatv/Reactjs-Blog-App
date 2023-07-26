import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/userSlice';
import { toast } from 'react-toastify';
import ResultPage from "../UI/ResultPage"
import styles from './UpdateProfile.module.css';
import Skeleton from '@mui/material/Skeleton';

function UpdateProfile() {
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector((state) => state.user);


    useEffect(() => {
        try {
            dispatch(fetchUserData());
        } catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {loading ? (
                <section aria-label="update profile" className={styles['update-profile']}>
                    <Skeleton variant="text" width={200} height={40} />
                    <form className={styles['update-form']} onSubmit={handleSubmit}>
                        <Skeleton variant="text" width={200} height={40} />
                        <Skeleton variant="text" width={200} height={40} />
                        <Skeleton variant="text" width={200} height={40} />
                        <Skeleton variant="rectangular" width={200} height={40} />
                    </form>
                </section>
            ) : userData ? (
                <section aria-label="update profile" className={styles['update-profile']}>
                    <h1 className={styles['edit-profile-title']}>Edit Profile</h1>
                    <form className={styles['update-form']} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={userData ? userData.name : ""}
                            className={styles['form-input']}
                            placeholder="Your Name"
                        />

                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={userData ? userData.username : ""}
                            className={styles['form-input']}
                            placeholder="Your Username"
                        />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={userData ? userData.email : ""}
                            className={styles['form-input']}
                            placeholder="Your Email"
                        />

                        <button className={styles['update-profile-button']} type="submit">
                            <span className={styles['save-button']}>Save</span>
                        </button>
                    </form>
                </section>
            ) : (
                <ResultPage userData={userData} />
            )}
        </>
    );
}

export default UpdateProfile;
