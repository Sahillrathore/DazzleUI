import React from "react";
import {
    FaRegSquare,
    FaToggleOn,
    // FaRegSquarePlus,
    FaSpinner,
    FaKeyboard,
    FaDotCircle,
    FaWpforms,
    FaBook,
} from "react-icons/fa";

const categories = [
    { name: "All", icon: <FaBook /> },
    // { name: "Buttons", icon: <FaRegSquarePlus /> },
    { name: "Checkboxes", icon: <FaRegSquare /> },
    { name: "Toggle switches", icon: <FaToggleOn /> },
    // { name: "Cards", icon: <FaRegSquarePlus /> },
    { name: "Loaders", icon: <FaSpinner /> },
    { name: "Inputs", icon: <FaKeyboard /> },
    { name: "Radio buttons", icon: <FaDotCircle /> },
    { name: "Forms", icon: <FaWpforms /> },
];

const Sidebar = () => {
    return (
        <div className="w-64 text-white h-screen p-4 space-y-2 sticky top-0">
            {categories.map((cat) => (
                <div
                    key={cat.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#222] cursor-pointer transition"
                >
                    {cat.icon}
                    <span>{cat.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
