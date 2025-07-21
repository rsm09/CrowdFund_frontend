import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const baseurl = import.meta.env.VITE_BASE_URL;

    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem('token');

            const usersRes = await axios.get(`${baseurl}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const campaignsRes = await axios.get(`${baseurl}/api/admin/campaigns`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(usersRes.data);
            setCampaigns(campaignsRes.data);
        } catch (err) {
            console.error('Failed to fetch admin data', err);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${baseurl}/api/admin/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('User deleted');
            fetchAdminData();  // refresh data
        } catch (err) {
            console.error('Failed to delete user', err);
        }
    };

    const handleDeleteCampaign = async (campaignId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${baseurl}/api/admin/campaign/${campaignId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Campaign deleted');
            fetchAdminData();  // refresh data
        } catch (err) {
            console.error('Failed to delete campaign', err);
        }
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>

            <h2>All Users</h2>
            {users.map(user => (
                <div key={user._id} style={{border: '1px solid gray', marginBottom: '10px', padding: '5px'}}>
                    <p>{user.name} - {user.email}</p>
                    <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
                </div>
            ))}

            <h2>All Campaigns</h2>
            {campaigns.map(c => (
                <div key={c._id} style={{border: '1px solid gray', marginBottom: '10px', padding: '5px'}}>
                    <h3>{c.title}</h3>
                    <p>Creator: {c.creator?.name} ({c.creator?.email})</p>
                    <button onClick={() => handleDeleteCampaign(c._id)}>Delete Campaign</button>
                </div>
            ))}
        </div>
    );
};

export default AdminPanel;
