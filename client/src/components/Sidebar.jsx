import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "All", icon: <FaBook />, link: "/elements" },
  { name: "Buttons", icon: <FaRegSquarePlus />, link: "/elements/button" },
  { name: "Checkboxes", icon: <FaRegSquare />, link: "/elements/checkbox" },
  { name: "Toggle switches", icon: <FaToggleOn />, link: "/elements/toggle" },
  { name: "Loaders", icon: <FaSpinner />, link: "/elements/loader" },
  { name: "Inputs", icon: <FaKeyboard />, link: "/elements/input" },
  { name: "Radio buttons", icon: <FaDotCircle />, link: "/elements/radio" },
  { name: "Forms", icon: <FaWpforms />, link: "/elements/forms" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  // collapse when screen is smaller than md (~768px)
  const [collapsed, setCollapsed] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize(); // set once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`h-screen p-4 space-y-3 sticky top-0
      ${collapsed ? "w-20" : "w-64"}
      bg- text-white transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="mb-4 p-2 text-start rounded-lg bg-[#22222270] hover:bg-[#333] w-full text-sm"
      >
        {collapsed ? "➔" : "⇦"}
      </button>

      {categories.map((cat) => (
        <div
          key={cat.name}
          onClick={() => navigate(cat.link)}
          className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#222] cursor-pointer transition relative"
        >
          <div className="relative">
            {cat.icon}

            {/* Tooltip only when collapsed */}
            {collapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {cat.name}
              </div>
            )}
          </div>
          {!collapsed && <span className="text-sm">{cat.name}</span>}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
