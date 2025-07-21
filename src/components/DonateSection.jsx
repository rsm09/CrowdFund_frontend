import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './Donatesection.css'

const DonateSection = ({ campaignId }) => {
    const [amount, setAmount] = useState('');
    const [stats, setStats] = useState(null);
    const baseurl = import.meta.env.VITE_BASE_URL;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchStats();
    }, [campaignId]);

    const fetchStats = async () => {
        const res = await axios.get(`${baseurl}/api/donations/stats/${campaignId}`);
        setStats(res.data);
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleDonate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to donate.');
            return;
        }

        if (!(await loadRazorpayScript())) {
            alert('Razorpay SDK failed to load.');
            return;
        }

        try {
            // Step 1: Create Razorpay order from backend
            const { data: order } = await axios.post(`${baseurl}/api/payment/order`, {
                amount
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Step 2: Open Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'KindleFund',
                description: 'Donation Payment',
                order_id: order.id,
                handler: async function () {
                    // Step 3: Once payment is successful, create a donation entry
                    await axios.post(`${baseurl}/api/donations/${campaignId}`, {
                        amount
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    alert('Thank you for your donation!');
                    setAmount('');
                    fetchStats();
                },
                prefill: {
                    name: user?.name,
                    email: user?.email
                },
                theme: {
                    color: "#0a66c2"
                },
                method: {
                    netbanking: true,
                    card: true,
                    upi: true
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Donation payment error:', err);
            alert('Failed to initiate payment.');
        }
    };

    if (!stats) return <p>Loading donation stats...</p>;

return (
    <div className="donate-section">
        <h3>Donation Stats</h3>
        <div className="stats">
            <p>Total Donations: ₹{stats.totalAmount}</p>
            <p>Number of Donors: {stats.totalDonors}</p>
            <p>Average Donation: ₹{stats.averageDonation}</p>
        </div>

        <h3>Make a Donation</h3>
        <form onSubmit={handleDonate}>
            <input
                type="number"
                placeholder="Amount in ₹"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
            />
            <button type="submit">Donate</button>
        </form>
    </div>
);

};

export default DonateSection;
