import React, { useState } from "react";

const Card = ({ element }) => {
    const isUserGenerated = element.html;
    const [open, setOpen] = useState(false);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert("Copied!");
    };

    return (
        <>
            <div
                className="bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition"
                onClick={() => setOpen(true)}
            >
                {/* Preview */}
                <div className="h-52 bg-black mb-2">
                    {isUserGenerated ? (
                        <iframe
                            srcDoc={`
                                <html>
                                <head>
                                    ${element.styleType === "tailwind"
                                    ? `<script src="https://cdn.tailwindcss.com"></script>`
                                    : `<style>
                                        html, body {
                                            margin: 0;
                                            padding: 0;
                                            background: transparent;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            height: 100%;
                                        }
                                        ${element.css}
                                        </style>`
                                }
                                    <style>
                                    html, body {
                                        margin: 0;
                                        padding: 0;
                                        background: transparent;
                                        height: 100%;
                                        width: 100%;
                                    }
                                    </style>
                                </head>
                                <body>
                                    ${element.styleType === "tailwind"
                                    ? `<div class="w-full h-full flex items-center justify-center">${element.html}</div>`
                                    : `${element.html}`
                                }
                                </body>
                                </html>
                            `}
                            title="Preview"
                            className="w-full h-full"
                            sandbox="allow-scripts"
                        />



                    ) : (
                        <div className="w-full h-full flex justify-center items-center text-gray-700 text-sm">
                            {element.name}
                        </div>
                    )}
                </div>

                <div className="text-sm text-gray-400 px-4 pb-2 flex flex-col justify-between cursor-pointer">
                    <p className="font-medium">{element.title}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">{element.createdBy}</span>
                        <span className="text-xs text-gray-600 ">{element.views} views</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-[#1e1e1e] text-white rounded-xl max-w-4xl w-full p-6 relative shadow-xl">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-4 text-xl text-gray-400 hover:text-white"
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4">{element.name}</h2>

                        {/* Preview */}
                        <div className="bg-black rounded-md overflow-hidden h-48 mb-4">
                            <iframe
                                srcDoc={`
                                        <html>
                                        <head>
                                            ${element.styleType === "tailwind"
                                        ? `<script src="https://cdn.tailwindcss.com"></script>`
                                        : `<style>
                                                html, body {
                                                    margin: 0;
                                                    padding: 0;
                                                    background: transparent;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    height: 100%;
                                                }
                                                ${element.css}
                                                </style>`
                                    }
                                            <style>
                                            html, body {
                                                margin: 0;
                                                padding: 0;
                                                background: transparent;
                                                height: 100%;
                                                width: 100%;
                                            }
                                            </style>
                                        </head>
                                        <body>
                                            ${element.styleType === "tailwind"
                                        ? `<div class="w-full h-full flex items-center justify-center">${element.html}</div>`
                                        : `${element.html}`
                                    }
                                        </body>
                                        </html>
                                    `}
                                title="Preview"
                                className="w-full h-full"
                                sandbox="allow-scripts"
                            />


                        </div>

                        {/* HTML code */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">HTML</span>
                                <button
                                    onClick={() => copyToClipboard(element.html)}
                                    className="text-xs text-blue-400 hover:underline"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="bg-[#2a2a2a] p-3 rounded text-sm overflow-auto">
                                {element.html}
                            </pre>
                        </div>

                        {/* CSS code */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">CSS</span>
                                <button
                                    onClick={() => copyToClipboard(element.css)}
                                    className="text-xs text-blue-400 hover:underline"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="bg-[#2a2a2a] p-3 rounded text-sm overflow-auto">
                                {element.css}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
