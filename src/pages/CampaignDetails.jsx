import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import DonateSection from '../components/DonateSection';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/campaigndetails.css'

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const { user } = useContext(AuthContext);
    const baseurl=import.meta.env.VITE_BASE_URL
const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaign = async () => {
            const res = await axios.get(`${baseurl}/api/campaigns/${id}`);
            setCampaign(res.data);
        };
        fetchCampaign();
    }, [id]);

    if (!campaign) return <p>Loading campaign details...</p>;

    return (
        <div className="container">
            <h1>{campaign.title}</h1>
            <img src={campaign.imageUrl} alt={campaign.title} width="300px" />
            <p>{campaign.description}</p>
            <p>Category: {campaign.category}</p>
            <p>Goal Amount: ₹{campaign.targetAmount}</p>
            <p>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
             <DonateSection campaignId={campaign._id} />
             <CommentSection campaignId={campaign._id} />
             {user && user.id === campaign.creator && (
    <button onClick={() => navigate(`/edit-campaign/${campaign._id}`)}>Edit Campaign</button>
)}

        </div>
    );
};

export default CampaignDetails;
