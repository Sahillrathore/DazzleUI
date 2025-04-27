import React, { useState } from "react";
import {
    FaRegSquare,
    FaToggleOn,
    FaSpinner,
    FaKeyboard,
    FaDotCircle,
    FaWpforms,
    FaBook,
} from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const categories = [
    { name: "All", icon: <FaBook />, link: '/elements' },
    { name: "Buttons", icon: <FaRegSquarePlus />, link: '/elements/button' },
    { name: "Checkboxes", icon: <FaRegSquare />, link: '/elements/checkbox' },
    { name: "Toggle switches", icon: <FaToggleOn />, link: '/elements/toggle' },
    { name: "Loaders", icon: <FaSpinner />, link: '/elements/loader' },
    { name: "Inputs", icon: <FaKeyboard />, link: '/elements/input' },
    { name: "Radio buttons", icon: <FaDotCircle />, link: '/elements/radio' },
    { name: "Forms", icon: <FaWpforms />, link: '/elements/forms' },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`h-screen p-4 space-y-2 sticky top-0 ${collapsed ? 'w-20' : 'w-64'} text-white transition-all duration-300 `}>
            

            {categories.map((cat) => (
                <div
                    key={cat.name}
                    onClick={() => navigate(cat.link)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#222] cursor-pointer transition"
                >
                    {cat.icon}
                    {!collapsed && <span>{cat.name}</span>}
                </div>
            ))}

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="mb-6 p-2 rounded bg-[#22222270] hover:bg-[#333] w-full px-3 "
            >
                {collapsed ? "➔" : "⇦"}
            </button>
            
        </div>
    );
};

export default Sidebar;
