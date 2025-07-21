import './Successstories.css'
const SuccessStories = () => {
    const stories = [
        {
            title: "Tree Plantation Drive",
            description: "Successfully planted 5000 trees across the city with the support of 1200 donors.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoVZ62crjaxhQxDxu2TDXrMKWY5BW3C6UUw&s"
        },
        {
            title: "Medical Aid Fundraiser",
            description: "Helped 300 families get urgent medical help with ₹10 lakh raised.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoVZ62crjaxhQxDxu2TDXrMKWY5BW3C6UUw&s"
        },
        {
            title: "Startup Launch Support",
            description: "Funded 10 emerging startups to kickstart their innovations.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoVZ62crjaxhQxDxu2TDXrMKWY5BW3C6UUw&s"
        },
        {
            title: "Community Kitchen Initiative",
            description: "Provided daily meals to over 2000 underprivileged individuals during the pandemic.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoVZ62crjaxhQxDxu2TDXrMKWY5BW3C6UUw&s"
        }
    ];

    return (
        <section>
            <h2>Success Stories</h2>
            <div className="stories">
                {stories.map((story, idx) => (
                    <div key={idx} className="story-card">
                        <img src={story.image} alt={story.title} />
                        <h3>{story.title}</h3>
                        <p>{story.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SuccessStories;
