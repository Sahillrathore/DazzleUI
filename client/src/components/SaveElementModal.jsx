import React, { useState } from "react";

const SaveModal = ({ isOpen, setIsOpen, onSave, formData, setFormdata }) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = () => {
        if (!title) {
            alert("Please enter a title!");
            return;
        }
        onSave({ title, tags: tags.split(",").map(tag => tag.trim()) });
        setIsOpen(false);
    };

    const typeOptions = [
        "Button",
        "Checkbox",
        "Loader",
        "Input",
        "Radio Button",
        "Toggle Switch",
    ];

    return (
        <>
            {/* Background Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    } z-40`}
            ></div>

            {/* Modal */}
            <div
                className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    } z-50`}
            >
                <div className="bg-[#1e1e1e] p-6 rounded-lg w-96 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-white">Save UI Element</h2>

                    {/* Title Input */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-4 p-2 rounded bg-[#292929] text-white placeholder-gray-400"
                    />

                    {/* Tags Input */}
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full mb-4 p-2 rounded bg-[#292929] text-white placeholder-gray-400"
                    />

                    {/* Type Dropdown */}
                    <select
                        value={formData.type}
                        disabled
                        onChange={(e) => setFormdata((prev) => ({ ...prev, type: e.target.value }))}
                        className="w-full mb-4 p-2 rounded bg-[#292929] cursor-not-allowed text-gray-100 placeholder-gray-400"
                    >
                        <option value="" disabled>Select Element Type</option>
                        {typeOptions.map((type, index) => (
                            <option key={index} value={type.toLowerCase().replace(/\s/g, '')}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaveModal;
