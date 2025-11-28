// SkeletonCard.jsx
import React from "react";

const SkeletonCard = ( {count = [1,2,3,4]} ) => {
    return (
        <div className="flex flex-wrap gap-4 overflow-hidden mb-3 justify-start items-center w-full">
            {
                count?.map((i) => (
                    <div className="min-w-72 h-56 min-h-48 border border-zinc-700/40 rounded-xl bg-[#27272771] relative overflow-hidden">
                        {/* shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                ))
            }
        </div>
    );
};

export default SkeletonCard;
