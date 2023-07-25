import styles from './UpdateProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/userSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateProfile() {

    const dispatch = useDispatch();
    const { data: userData } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            dispatch(fetchUserData())
        } catch (error) {
            toast.error('An error occurred: ' + error.message)
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {userData ?
                <section aria-label="update profile" className={styles['update-profile']}>
                    <h1 className={styles["edit-profile-title"]}>Edit Profile</h1>
                    <form className={styles["update-form"]} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={userData.name}
                            className={styles["form-input"]}
                            placeholder="Your Name"
                        />

                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={userData.username}
                            className={styles["form-input"]}
                            placeholder="Your Username"
                        />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={userData.email}
                            className={styles["form-input"]}
                            placeholder="Your Email"
                        />

                        <button className={styles["update-profile-button"]} type="submit">
                            <span className={styles["save-button"]}>
                                Save
                            </span>
                        </button>
                    </form>
                </section>
                :
                <p>Yo</p>
            }
        </>
    );
}

export default UpdateProfile;
