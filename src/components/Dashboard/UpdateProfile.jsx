import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/userSlice';
import { toast } from 'react-toastify';
import ResultPage from "../UI/ResultPage"
import styles from './UpdateProfile.module.css';
import Skeleton from '@mui/material/Skeleton';
import Cookies from 'js-cookie';

function UpdateProfile() {
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        try {
            dispatch(fetchUserData());
        } catch (error) {
            toast.error('An error occurred: ' + error.message);
        }
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                username: userData.username,
                email: userData.email,
            });
        }
    }, [userData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authHeader = `Bearer ${Cookies.get("token")}`;

        try {
            const response = await fetch("https://neisiali.ir/api/user", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("User Updated Successfully");
            } else if (response.status === 422) {
                const errors = data?.errors || {};
                if (errors.email && errors.email.length > 0) {
                    toast.error(errors.email[0]);
                } else if (errors.username && errors.username.length > 0) {
                    toast.error(errors.username[0]);
                } else {
                    throw new Error("Validation Error");
                }
            } else {
                throw new Error("Couldn't Send Data to API");
            }

        } catch (error) {
            toast.error("Error: " + error.message)
        }
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
                            value={formData.name}
                            onChange={handleChange}
                            className={styles['form-input']}
                            placeholder="Your Name"
                        />

                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles['form-input']}
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Your Username"
                        />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles['form-input']}
                            value={formData.email}
                            onChange={handleChange}
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
