import { useState, useEffect } from 'react';
import axios from 'axios';
import './Commentsection.css'

const CommentSection = ({ campaignId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const token = localStorage.getItem('token');
    const baseurl=import.meta.env.VITE_BASE_URL

    useEffect(() => {
         if (campaignId) {
        fetchComments();
    }
    },[campaignId]);

    const fetchComments = async () => {
        const res = await axios.get(`${baseurl}/api/comments/${campaignId}`);
         setComments(res.data);
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Login to comment");
            return;
        }
        await axios.post(`${baseurl}/api/comments/${campaignId}`, { text }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setText('');
        fetchComments();
    };

    const handleDelete = async (commentId) => {
        if (!token) return;
        await axios.delete(`${baseurl}/api/comments/delete/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchComments();
    };

 return (
    <div className="comment-section">
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write your comment" required></textarea>
            <button type="submit">Post Comment</button>
        </form>

      <div className="comments-container">
    {comments.map(c => (
        <div key={c._id} className="comment-item">
            <p><strong>{c.user?.name}</strong>: {c.text}</p>
            {c.isOwner && <button onClick={() => handleDelete(c._id)}>Delete</button>}
        </div>
    ))}
    </div>

    </div>
);

};

export default CommentSection;
