import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserData } from '../store/userSlice';

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
            {loading ? (
                <p>Loading user data...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : userData ? (
                <>
                    <h2>Welcome, {userData.name}!</h2>
                    <h2>Username, {userData.username}!</h2>
                    <p>Email: {userData.email}</p>
                    <p>ID: {userData.id}</p>
                    <p>Created At: {userData.created_at}</p>
                </>
            ) : null}
        </div>
    );
}

export default Dashboard;
