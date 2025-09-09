import React, { useState } from "react";
import { FiPlus, FiDownload, FiCompass, FiFigma } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Card from "./Card";
import CardSimple from "./CardSimple";
import SkeletonCard from "./SkeletonCard";

const ElementsCard = () => {

    const { loading, allElements } = useAuth();

    if (loading) {
        return (
            <div>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        )
    }

    return (
        <div className="px-0 py-4 pb-0 shadow-2xl !shadow-white/20">
            <div className="overflow-x-hidden px-0 overflow-y-hidden">
                <div className="flex gap-2 -ml-12">
                    {allElements.map((element, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 rounded-xl flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                        >
                            {/* Element preview */}

                            <CardSimple element={element} key={index} />

                        </div>
                    ))}
                </div>
            </div>
            <div className="overflow-x-hidden px-0 py-2">
                <div className="flex gap-2 -ml-28">
                    {allElements?.slice(6,).map((element, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 rounded-xl flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                        >
                            {/* Element preview */}

                            <CardSimple element={element} key={index} />

                        </div>
                    ))}
                </div>
            </div>

            <div className="overflow-x-hidden px-0 py-2">
                <div className="flex gap-2 -ml-10">
                    {allElements?.slice(10,).map((element, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 rounded-xl flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                        >
                            {/* Element preview */}

                            <CardSimple element={element} key={index} />

                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center w-full py-5">
                <Link to='/elements' className="animated-button">
                    <span>Explore All</span>
                    <span></span>
                </Link>
            </div>

        </div>
    );
};

export default ElementsCard;
