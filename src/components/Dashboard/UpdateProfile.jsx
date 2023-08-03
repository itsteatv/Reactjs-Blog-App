import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, updateUserProfile, updateUserData } from '../store/userSlice';
import { toast } from 'react-toastify';
import ResultPage from "../UI/ResultPage"
import styles from './UpdateProfile.module.css';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import FullscreenModal from '../UI/FullscreenModal';

function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: userData, loading, error } = useSelector((state) => state.user);

    const [image, setImage] = useState(null);
    const [isFormEdited, setIsFormEdited] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        bio: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setIsFormEdited(true);
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
                bio: userData.bio,
            });
        }
    }, [userData]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        const previewUrl = URL.createObjectURL(selectedImage);

        setImagePreviewUrl(previewUrl);
        setImage(selectedImage);
        setIsImageSelected(true);
        toggleModal();
    };

    const toggleModal = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await dispatch(updateUserData(formData));

            navigate("/dashboard");

            setTimeout(() => {
                navigate("/setting");
            }, 6000);

        } catch (error) {
            console.error(error);
        }
    };

    // Update Image
    const handleImageSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('image', image);

        try {
            await dispatch(updateUserProfile(formDataToSend));

            setTimeout(() => {
                window.location.reload();
            }, 0.1);

            toast.success('User Profile Updated Successfully', {
                autoClose: 100,
            });

            setImage(null);

        } catch (error) {
            toast.error('Error: ' + error.message);
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
                <>
                    <section aria-label="update profile" className={styles['update-profile']}>
                        <img
                            className={styles['user-profile']}
                            src={userData.image}
                            alt="userprofile"
                        />
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

                            <input
                                type="text"
                                id="bio"
                                name="bio"
                                className={styles['form-input']}
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Your bio"
                            />

                            <button disabled={!isFormEdited} className={`${styles['update-profile-button']}`} type="submit">
                                <span className={styles['save-button']}>Save</span>
                            </button>
                        </form>
                        {/* Image Upload */}
                        <form className={styles['update-image-form']} onSubmit={handleImageSubmit}>
                            <label className={styles["form-label"]}>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className={styles['form-input']}
                                    onChange={handleImageChange}
                                />
                            </label>
                            <button disabled={!isImageSelected} type="submit" className={`${styles['update-profile-btn']} ${styles['upload-image']}`}>
                                <span className={styles['update-profile-span']}>upload image</span>
                            </button>
                        </form>
                        {image && (
                            <FullscreenModal open={showModal} onClose={toggleModal}>
                                <img src={imagePreviewUrl} alt="Selected" />
                            </FullscreenModal>
                        )}
                    </section>
                </>
            ) : (
                <ResultPage userData={userData} />
            )}
        </>
    );
}

export default UpdateProfile;
