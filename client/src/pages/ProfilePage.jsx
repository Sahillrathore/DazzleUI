import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getUserElements } from "../utils/apiCall";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const { user } = useAuth();
    const [elements, setElements] = useState([]);
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const data = await getUserElements(user._id);
                setElements(data);
            } catch (err) {
                console.error("Failed to fetch user elements", err);
            }
        };

        if (user?._id) {
            fetchElements();
        }
    }, [user]);

    return (
        <div className="min-h-screen p-6 bg-[#111] text-white">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
                <img
                    src={user?.avatar || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-28 h-28 rounded-lg object-cover"
                />
                <div>
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-gray-400">@{user?.username || user?.name?.split(" ").join("_").toLowerCase()}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6">
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`px-4 py-2 rounded font-semibold ${activeTab === "posts" ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                    Posts
                </button>
                <button
                    onClick={() => setActiveTab("variations")}
                    className="px-4 py-2 rounded font-semibold hover:bg-white/5 text-gray-400"
                >
                    Variations
                </button>
                <button
                    onClick={() => setActiveTab("review")}
                    className="px-4 py-2 rounded font-semibold hover:bg-white/5 text-gray-400"
                >
                    Review
                </button>
                <button
                    onClick={() => setActiveTab("rejected")}
                    className="px-4 py-2 rounded font-semibold hover:bg-white/5 text-gray-400"
                >
                    Rejected
                </button>
                <button
                    onClick={() => setActiveTab("drafts")}
                    className="px-4 py-2 rounded font-semibold hover:bg-white/5 text-gray-400"
                >
                    Drafts
                </button>
            </div>

            {/* Content */}
            {activeTab === "posts" && (
                <>
                    {elements?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center mt-20">
                            <div className="text-6xl mb-6 opacity-30">🖼️</div>
                            <h2 className="text-2xl font-bold mb-2">No Public Posts Yet</h2>
                            <p className="text-gray-400 mb-6">Looks like you haven't made any posts yet. Don't worry, just click the 'Create' button and let the universe know you're out there.</p>
                            <Link
                                to="/create"
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-md text-white font-semibold"
                            >
                                + Create
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {elements.map((el) => (
                                <Card key={el._id} element={el} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Other tabs content can be added later */}
        </div>
    );
};

export default ProfilePage;
