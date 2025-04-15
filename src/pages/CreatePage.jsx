import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CreatePage = () => {
    const [postTitle, setPostTitle] = useState('');
    const [styleType, setStyleType] = useState('normal'); // 'normal' or 'tailwind'

    const [html, setHtml] = useState("<h1 class='text-3xl font-bold'>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: cyan; }");

    // Inject Tailwind CDN if needed
    const combinedCode = `
      <html>
        <head>
          ${styleType === 'tailwind'
            ? `<script src="https://cdn.tailwindcss.com"></script>`
            : `<style>${css}</style>`
        }
        </head>
        <body>${html}</body>
      </html>
    `;

    const handleSave = () => {
        if (!postTitle) {
            console.log('Enter Title');
            return;
        }
        

        const savedElements = JSON.parse(localStorage.getItem("elements") || "[]");

        const newElement = {
            id: crypto.randomUUID(),
            html,
            css: styleType === 'tailwind' ? '' : css,
            styleType,
            title: postTitle,
            createdBy: "sahillRathore",
            createdAt: new Date().toISOString(),
        };

        savedElements.push(newElement);
        localStorage.setItem("elements", JSON.stringify(savedElements));

        alert("UI Element saved!");
    };

    return (
        <div className="flex max-h-screen bg-[#1e1e1e] text-white overflow-hidden">
            {/* Editor Side */}
            <div className="w-1/2 flex flex-col p-4 gap-4 overflow-auto">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm">Select Style:</label>
                    <select
                        value={styleType}
                        onChange={(e) => setStyleType(e.target.value)}
                        className="text-black px-2 py-1 rounded"
                    >
                        <option value="normal">Normal CSS</option>
                        <option value="tailwind">Tailwind CSS</option>
                    </select>
                </div>

                <div className="flex-1">
                    <p className="text-sm font-bold mb-2">HTML</p>
                    <Editor
                        height="40vh"
                        defaultLanguage="html"
                        value={html}
                        theme="vs-dark"
                        onChange={(value) => setHtml(value)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            wordWrap: "on",
                        }}
                    />
                </div>

                {/* Show CSS editor only when 'normal' is selected */}
                {styleType === 'normal' && (
                    <div className="flex-1">
                        <p className="text-sm font-bold mb-2">CSS</p>
                        <Editor
                            height="40vh"
                            defaultLanguage="css"
                            value={css}
                            theme="vs-dark"
                            onChange={(value) => setCss(value)}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                wordWrap: "on",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Preview Side */}
            <div className="w-1/2 bg-[#111]">
                <iframe
                    title="Preview"
                    className="w-full h-full"
                    sandbox="allow-scripts"
                    srcDoc={combinedCode}
                />
            </div>

            {/* Save UI */}
            <div className="absolute bottom-5 bg-grade right-5 mt-4 flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Enter post title"
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="h-full py-2 pl-2 text-gray-700"
                />
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleSave}
                >
                    Save UI
                </button>
            </div>
        </div>
    );
};

export default CreatePage;
