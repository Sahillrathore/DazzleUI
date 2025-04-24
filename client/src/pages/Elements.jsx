import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { getAllElements } from "../utils/apiCall";

function Elements() {
    const [search, setSearch] = useState("");
    const [allElements, setAllElements] = useState([]);

    useEffect(() => {
        getAllElements()
            .then(setAllElements)
            .catch((err) => console.error("Failed to fetch elements", err));
    }, []);

    const filtered = allElements.filter((el) =>
        el.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen text-white">

            <div className="flex-1 py-6 px-4">
                <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                    <h1 className="text-3xl text-gray-200 font-bold">Browse all</h1>

                    <input
                        type="text"
                        placeholder="Search tags, users, posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700 w-full max-w-72 text-sm text-white placeholder-gray-500"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((el) => (
                        <Card key={el.id} element={el} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Elements;
