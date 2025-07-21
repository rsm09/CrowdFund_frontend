import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCampaign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState({
        title: '',
        description: '',
        targetAmount: '',
        deadline: '',
        imageUrl: '',
        category: ''
    });
    const baseurl=import.meta.env.VITE_BASE_URL
   useEffect(() => {
    const fetchCampaign = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${baseurl}/api/campaigns/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCampaign(res.data);
        } catch (err) {
            console.error('Failed to fetch campaign:', err);
        }
    };
    fetchCampaign();
}, [id]);

    const handleChange = (e) => {
        setCampaign({ ...campaign, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.put(`${baseurl}/api/campaigns/${id}`, campaign, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Campaign updated!');
        navigate('/');
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        await axios.delete(`${baseurl}/api/campaigns/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Campaign deleted!');
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Edit Campaign</h1>
            <form onSubmit={handleUpdate}>
                <input name="title" value={campaign.title} onChange={handleChange} placeholder="Title" required />
                <textarea name="description" value={campaign.description} onChange={handleChange} placeholder="Description" required />
                <input name="targetAmount" value={campaign.targetAmount} onChange={handleChange} placeholder="Target Amount" type="number" required />
                <input name="deadline" value={campaign.deadline} onChange={handleChange} type="date" required />
                <input name="imageUrl" value={campaign.imageUrl} onChange={handleChange} placeholder="Image URL" required />
                <input name="category" value={campaign.category} onChange={handleChange} placeholder="Category" required />

                <button type="submit">Update Campaign</button>
            </form>

            <button onClick={handleDelete} style={{backgroundColor: 'red', marginTop: '10px'}}>Delete Campaign</button>
        </div>
    );
};

export default EditCampaign;
