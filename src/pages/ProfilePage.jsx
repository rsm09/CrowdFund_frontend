import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/profilepage.css'

const ProfilePage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [donations, setDonations] = useState([]);
    const baseurl=import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${baseurl}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCampaigns(res.data.campaigns || []);
                setDonations(res.data.donations || []);
            } catch (err) {
                console.error('Failed to load profile data', err);
            }
        };
        fetchData();
    }, []);

    return (
      <div className="container">
        <h1>Profile</h1>

        <h2>Your Campaigns</h2>
<div className="profile-section">
    {campaigns.length === 0 ? (
        <p>No campaigns created yet.</p>
    ) : (
        campaigns.map((c) => (
            <div key={c._id}>
                <h3>{c.title}</h3>
                <p>Goal: ₹{c.targetAmount}</p>
                <p><a href={`/edit-campaign/${c._id}`}>Edit Campaign</a></p>
            </div>
        ))
    )}
</div>

<h2>Your Donations</h2>
<div className="profile-section">
    {donations.length === 0 ? (
        <p>No donations yet.</p>
    ) : (
        donations.map((d) => (
            <div key={d._id}>
                <p>Amount: ₹{d.amount}</p>
                <p>Campaign: <a href={`/campaign/${d.campaign?._id}`}>{d.campaign?.title}</a></p>
            </div>
        ))
    )}
</div>

      </div>
    );
};

export default ProfilePage;
