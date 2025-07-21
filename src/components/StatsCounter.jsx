import './Statcounter.css'
const StatsCounter = () => {
    const stats = [
        { label: "Total Campaigns", value: "150+" },
        { label: "Donors Joined", value: "10,000+" },
        { label: "Successful Campaigns", value: "120+" },
    ];

    return (
        <section>
            <h2>Platform Achievements</h2>
            <div className="stats">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsCounter;
