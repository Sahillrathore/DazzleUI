import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import { useAuth } from '../context/authContext';
import LoadingSpinner from '../components/Loading';

const ParticularElements = () => {
    const { type } = useParams(); // 👈 grabs 'button', 'checkbox' etc from URL
    const [elements, setElements] = useState([]);
    const [search, setSearch] = useState("");
    const {loading, setLoading} = useAuth();

    useEffect(() => {
        const fetchElements = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:5000/api/elements';
                console.log(type);

                if (type) {
                    url += `?type=${type}`; // 👈 pass type in query
                }
                const res = await axios.get(url);
                setElements(res.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false)
        };

        fetchElements();
    }, [type]);

    const filtered = elements.filter((el) =>
        el.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            {
                loading && <LoadingSpinner />
            }
            <div className="flex items-center justify-between mt-1 mb-6">
                <h1 className="text-3xl mt-0 font-bold text-gray-200 capitalize mb-0">{type ? `${type} Elements` : "All Elements"}</h1>

                <input
                    type="text"
                    placeholder="Search tags, users, posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700 w-full max-w-72 text-sm text-white placeholder-gray-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((el) => (
                    <Card element={el} key={el._id} />
                ))}
            </div>
        </div>
    );
};

export default ParticularElements;
