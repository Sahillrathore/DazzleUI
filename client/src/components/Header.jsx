import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleCreate = () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        navigate(isLoggedIn ? "/create" : "/signup");
    };

    return (
        <header className="bg-transparent text-white  px-6 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
                <Link to='/' className="text-xl font-bold text-white">
                    <span className="text-purple-400">Dora</span>UI
                </Link>

                <div
                    className="relative group"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                >
                    <button className="px-3 py-1 rounded hover:bg-white/10 transition font-medium">Elements ▾</button>

                    {isMegaMenuOpen && (
                        <div className="absolute top-[35px] left-0 z-50 bg-zinc-900 p-4 rounded-xl shadow-lg w-[750px] grid grid-cols-3 gap-2 border-4 border-white/10 ">
                            <div className="flex flex-col gap-0 h-full justify-between">
                                <MenuItem name="All" count="" icon="📖" redirect='/elements' />
                                <MenuItem name="Checkboxes" count="285" icon="☑️" />
                                <MenuItem name="Cards" count="1193" icon="📇" />
                                <MenuItem name="Inputs" count="341" icon="📝" />
                                <MenuItem name="Forms" count="237" icon="📋" />
                                <MenuItem name="Tooltips" count="118" icon="❓" />
                            </div>
                            <div className="flex flex-col gap-0 justify-between">
                                <MenuItem name="Buttons" count="2225" icon="🎛️" />
                                <MenuItem name="Toggle switches" count="380" icon="🔁" />
                                <MenuItem name="Loaders" count="1006" icon="⏳" />
                                <MenuItem name="Radio buttons" count="161" icon="🔘" />
                                <MenuItem name="Patterns" count="189" icon="🌀" />
                                <MenuItem name="My favorites" count="" icon="📌" />
                            </div>
                            <div className="bg-gradient-to-br max-h-fit from-purple-500 to-blue-600 rounded-xl text-center px-4 py-6 flex flex-col justify-between">
                                <img src="https://uiverse.io/assets/astronaut-LQ_BQU63.png" alt="Astronaut" className="h-32 mx-auto mb-4" />
                                <h3 className="font-bold text-2xl">We're on <br /> Social Media!</h3>
                                <p className="text-sm text-white/80 mb-4">
                                    Follow us to find out about new challenges, updates and posts.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <SocialIcon name="discord" />
                                    <SocialIcon name="x" />
                                    <SocialIcon name="instagram" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <a className="px-3 py-1 rounded hover:bg-white/10 transition font-medium">Challenges <span className="text-green-500">•</span></a>
                <a className="px-3 py-1 rounded hover:bg-white/10 transition font-medium">Spotlight</a>
                <a className="px-3 py-1 rounded hover:bg-white/10 transition font-medium">Blog</a>
            </div>

            <div className="flex gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1.5 rounded text-white font-semibold"
                onClick={handleCreate}
                >+ Create</button>
                <button className="bg-white/10 px-4 py-1.5 rounded text-white font-semibold flex items-center gap-2">
                    🚀 Join the Community
                </button>
            </div>
        </header>
    );
}

function MenuItem({ name, count, icon, redirect }) {
    return (
        <Link to={redirect} className="flex justify-between items-center px-4 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer">
            <div className="flex gap-2 items-center">
                <span>{icon}</span>
                <span className="text-sm text-gray-300 font-medium">{name}</span>
            </div>
            {count && <span className="text-xs text-white/60">{count}</span>}
        </Link>
    );
}

function SocialIcon({ name }) {
    const icons = {
        discord: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
        x: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
        instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
    };

    return (
        <img
            src={icons[name]}
            alt={name}
            className="h-6 w-6 bg-black p-1 rounded-md shadow-md"
        />
    );
}
