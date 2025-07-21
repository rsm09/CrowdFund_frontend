import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SuccessStories from '../components/SuccessStories';
import StatsCounter from '../components/StatsCounter';
import '../style/homepage.css'

const HomePage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const baseurl=import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const fetchCampaigns = async () => {
            const response = await axios.get(`${baseurl}/api/campaigns`);
            setCampaigns(response.data);
        };
        fetchCampaigns();
    }, []);

    return (
        <div className="container">
            <h1>Explore Campaigns</h1>
            {campaigns.length === 0 ? (
                <p>No campaigns found.</p>
            ) : (
                <div className="campaign-list">
                    {campaigns.map(c => (
                        <div key={c._id} className="campaign-card">
                            <h3>{c.title}</h3>
                            <img src={c.imageUrl} alt={c.title} width="200px" />
                            <p>{c.description}</p>
                            <p>Goal: ₹{c.targetAmount}</p>
                            <Link to={`/campaign/${c._id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            )}
             <SuccessStories />
             <StatsCounter />
        </div>

    );
};

export default HomePage;
