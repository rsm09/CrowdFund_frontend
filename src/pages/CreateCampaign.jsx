import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const baseurl=import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${baseurl}/api/campaigns`, {
                title, description, targetAmount, deadline, imageUrl, category
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Campaign created!');
            navigate('/');
        } catch (err) {
            alert('Failed to create campaign');
            console.log(err)
        }
    };

    return (
        <div className="container">
            <h1>Create New Campaign</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
                <input value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="Target Amount" type="number" required />
                <input value={deadline} onChange={e => setDeadline(e.target.value)} type="date" required />
                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" required />
                <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category - ('Startup', 'Social', 'Medical', 'Food', 'Environment', 'Other')" required />
                <button type="submit">Create Campaign</button>
            </form>
        </div>
    );
};

export default CreateCampaign;
