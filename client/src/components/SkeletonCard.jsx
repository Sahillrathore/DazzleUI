// SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => {
    return (
        <div className="flex gap-4 overflow-hidden mb-3 justify-center items-center w-full">
            {
                [1, 2, 3, 4, ].map((i) => (
                    <div className="min-w-80 h-56 min-h-48 rounded-xl bg-[#1a1a1a] relative overflow-hidden">
                        {/* shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                ))
            }
        </div>
    );
};

export default SkeletonCard;
