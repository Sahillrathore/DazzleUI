import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CreatePage = () => {

    const [postTitle, setPostTitle] = useState('');

    const [html, setHtml] = useState("<h1>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: cyan; }");

    const combinedCode = `
    <html>
      <head>
        <style>${css}</style>
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
            css,
            title: postTitle, // Let user enter later
            createdBy: "sahillRathore",
            createdAt: new Date().toISOString(),
        };

        savedElements.push(newElement);
        localStorage.setItem("elements", JSON.stringify(savedElements));

        alert("UI Element saved!");
    };


    return (
        <div className="flex max-h-screen bg-[#1e1e1e] text-white overflow-hidden">
            {/* Code Editor Side */}
            <div className="w-1/2 flex flex-col p-4 gap-4 overflow-auto">
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
            </div>

            {/* Live Preview Side */}
            <div className="w-1/2 bg-[#111]">
                <iframe
                    title="Preview"
                    className="w-full h-full"
                    sandbox="allow-scripts"
                    srcDoc={combinedCode}
                />
            </div>

            <div className="absolute bottom-5 right-5 mt-4 flex items-center gap-3">
                <input type="text" placeholder="Enter post title" onChange={(e)=>setPostTitle(e.target.value)}
                className="h-full py-2 pl-2 text-gray-700"
                 />
                <button
                    className=" bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleSave}
                >
                    Save UI
                </button>

            </div>

        </div>
    );
};

export default CreatePage;
