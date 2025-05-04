import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { BiExport } from "react-icons/bi";
import { FaRegCopy, FaRegHeart, FaHeart } from "react-icons/fa";
import { CgMaximize } from "react-icons/cg";
import { useAuth } from "../context/authContext";
import { addFavorite, getFavorites, removeFavorite } from "../utils/apiCall"; // import removeFavorite
import { useNavigate } from "react-router-dom";

const Card = ({ element }) => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState("html");
    const [bgColor, setBgColor] = useState(element?.bgcolor || '#e8e8e8');
    const [favorites, setFavorites] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false); // Initially false

    const modalRef = useRef(null);

    const hasCSS = element.framework === "css" && element.css;

    const iframeSrcDoc = `
    <html>
      <head>
        ${element.framework === "tailwindcss"
            ? '<script src="https://cdn.tailwindcss.com"></script>'
            : `<style>${element.css || ""}</style>`
        }
        <style>
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            background-color: ${bgColor};
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>${element.html}</body>
    </html>
  `;

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert("Copied to clipboard!");
    };

    const fetchFavorites = async () => {
        if (!user) return;
        try {
            const favs = await getFavorites(user?._id);
            const favIds = favs.map(el => el?._id.toString());
            setFavorites(favIds);
        } catch (err) {
            console.error("Failed to fetch favorites", err);
        }
    };

    const toggleFavorite = async (e) => {

        if (!user) {
            navigate('/signup')
            return;
        }

        e.stopPropagation();
        try {
            if (!isFavorited) {
                await addFavorite(user?._id, element?._id);
                setFavorites(prev => [...prev, element?._id]);
                setIsFavorited(true);
            } else {
                await removeFavorite(user?._id, element?._id);
                setFavorites(prev => prev.filter(favId => favId.toString() !== element?._id.toString()));
                setIsFavorited(false);
            }
        } catch (err) {
            console.error("Failed to toggle favorite", err);
            alert("Something went wrong");
        }
    };

    const handleMaximize = () => {
        if (modalRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                modalRef.current.requestFullscreen().catch((err) => {
                    console.error("Fullscreen error:", err);
                });
            }
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    // Watch favorites and set isFavorited whenever favorites change
    useEffect(() => {
        if (favorites.length > 0) {
            setIsFavorited(favorites.includes(element._id));
        }
    }, [favorites, element._id]);

    return (
        <>
            {/* === Card Preview === */}
            <div
                className="bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => setOpen(true)}
            >
                <div className="h-52 bg-black">
                    <iframe
                        srcDoc={iframeSrcDoc}
                        title="Preview"
                        className="w-full h-full"
                        sandbox="allow-scripts"
                    />
                </div>
                <div className="text-sm text-gray-400 px-4 py-3">
                    <p className="font-medium">{element.title}</p>
                    <div className="flex items-center justify-between text-xs mt-1">
                        <span>{element.createdBy}</span>
                        <span>{element.views || 0} views</span>
                    </div>
                </div>
            </div>

            {/* === Modal === */}
            {open && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto">
                    <div className="bg-[#1a1a1a] text-white rounded-xl w-full max-w-6xl shadow-2xl overflow-hidden"
                    >
                        {/* === Top Bar === */}
                        <div className="flex items-center justify-between px-5 py-4 bg-black border-b border-gray-800">
                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-gray-400 hover:text-white"
                                >
                                    ← Go back
                                </button>
                                <span className="text-sm text-gray-400">|</span>
                                <span className="text-sm text-white font-medium">{element.title}</span>

                                <span className="text-xs text-gray-500 ml-4">
                                    👁 {element.views || 0}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">

                                <span className=" text-gray-500 ml-2 text-lg">
                                    by <span className="text-indigo-400">{element.createdBy}</span>
                                </span>

                                <span className="text-gray-300 text-sm">{bgColor}</span>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-6 h-6 cursor-pointer border border-white rounded"
                                />
                            </div>
                        </div>

                        {/* === Content === */}
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* === Preview === */}
                            <div className="h-[500px] bg-[#111] border-r border-gray-800"
                                ref={modalRef}
                            >
                                <iframe
                                    title="Preview"
                                    className="w-full h-full"
                                    srcDoc={iframeSrcDoc}
                                    sandbox="allow-scripts"
                                />
                            </div>

                            {/* === Code Editor === */}
                            <div className="bg-[#1e1e1e] flex flex-col">
                                {/* Tabs */}
                                <div className="flex border-b border-[#333] text-sm font-medium">
                                    <button
                                        onClick={() => setTab("html")}
                                        className={`px-4 py-2 flex items-center gap-2 ${tab === "html"
                                            ? "bg-[#1e1e1e] text-white border-b-2 border-white"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        <img
                                            src="https://img.icons8.com/color/200/html-5.png"
                                            alt="html"
                                            className="w-4"
                                        />
                                        HTML
                                    </button>
                                    {hasCSS && (
                                        <button
                                            onClick={() => setTab("css")}
                                            className={`px-4 py-2 flex items-center gap-2 ${tab === "css"
                                                ? "bg-[#1e1e1e] text-white border-b-2 border-white"
                                                : "text-gray-400 hover:text-white"
                                                }`}
                                        >
                                            <img
                                                src="https://img.icons8.com/fluent/512/css3.png"
                                                alt="css"
                                                className="w-4"
                                            />
                                            CSS
                                        </button>
                                    )}
                                </div>

                                {/* Monaco Editor */}
                                <div className="flex-1 bg-[#0d0d0d] p-2">
                                    <div className="relative h-full border border-[#333] rounded-lg">
                                        <Editor
                                            height="100%"
                                            language={tab === "html" ? "html" : "css"}
                                            theme="vs-dark"
                                            value={tab === "html" ? element.html : element.css}
                                            options={{
                                                fontSize: 14,
                                                minimap: { enabled: false },
                                                wordWrap: "on",
                                                readOnly: true
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                copyToClipboard(tab === "html" ? element.html : element.css)
                                            }
                                            className="absolute top-2 right-3 text-gray-400 hover:text-white"
                                            title="Copy code"
                                        >
                                            <FaRegCopy size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* === Bottom Action Bar === */}
                        <div className="px-5 py-4 bg-black border-t border-gray-800 flex justify-between">
                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <button
                                    className="flex items-center gap-2 hover:text-white"
                                    onClick={toggleFavorite}
                                >
                                    {isFavorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                    {isFavorited ? "Favorited" : "Save to favorites"}
                                </button>
                                <button className="flex items-center gap-2 hover:text-white">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
                                        className="w-4 h-4"
                                        alt="Figma"
                                    />
                                    Copy to Figma
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white">
                                <button className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] rounded-md hover:bg-[#333]">
                                    <BiExport /> Export
                                </button>
                                <button
                                    onClick={handleMaximize}
                                    className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] rounded-md hover:bg-[#333]"
                                >
                                    <CgMaximize /> Maximize
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;