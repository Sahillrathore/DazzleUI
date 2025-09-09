import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import ElementType from "../components/ElementType";
import axios from "axios";
import SaveElementModal from "../components/SaveElementModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getAllElements } from "../utils/apiCall";

const defaultTemplates = {
    button: {
        css: {
            html: `<button class="button">Click Me</button>`,
            css: `.button { padding: 10px 20px; background-color: #4E46E5; color: white; border: none; border-radius: 4px; }`
        },
        tailwindcss: {
            html: `<button class="px-4 py-2 bg-indigo-600 text-white rounded">Click Me</button>`,
            css: ``
        }
    },
    checkbox: {
        css: {
            html: `<label class="checkbox"><input type="checkbox" /> Check me</label>`,
            css: `.checkbox { font-size: 16px; }`
        },
        tailwindcss: {
            html: `<label class="text-base"><input type="checkbox" class="mr-2" /> Check me</label>`,
            css: ``
        }
    },
    input: {
        css: {
            html: `<input type="<input_type>" class="<your-class>" placeholder="Enter something" />`,
            css: `.your-class { font-size: 16px; padding: 8px; }`
        },
        tailwindcss: {
            html: `<input type="<input_type>" class="text-base px-2 py-1 border border-gray-300 rounded" placeholder="Enter something" />`,
            css: ``
        }
    }

    // Add more element types...
};

const CreatePage = () => {

    const { user, setNotification } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const [bgColor, setBgColor] = useState("#e8e8e8");
    const [currentTab, setCurrentTab] = useState("html");
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [elementType, setElementType] = useState('');
    const navigate = useNavigate();
    const { setAllElements, } = useAuth();

    const [formData, setFormdata] = useState({
        id: crypto.randomUUID(),
        type: "button",
        framework: "css", // "css" | "tailwindcss"
        html: defaultTemplates.button.css.html,
        css: defaultTemplates.button.css.css,
        preview: "",
        createdAt: Date.now()
    });

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // 👈 necessary for Chrome to show the alert
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Update template when type or framework changes
    useEffect(() => {
        const currentTemplate = defaultTemplates[formData.type]?.[formData.framework];
        if (currentTemplate) {
            setFormdata(prev => ({
                ...prev,
                html: currentTemplate.html,
                css: currentTemplate.css
            }));
        }
    }, [formData.type, formData.framework]);

    const fetchElements = async () => {
        try {
            const elements = await getAllElements();
            setAllElements(elements);
        } catch (err) {
            console.error("Failed to fetch elements", err);
        }
    };

    const handleSave = async ({ title, tags }) => {

        if (!user) {
            setNotification({ msg: 'Please login first', type: 'error' })
            return;
        }
        if (!title) {
            console.log("No title entered");
            return;
        }

        const newElement = {
            title: title,
            html: formData.html,
            css: formData.framework === "tailwindcss" ? "" : formData.css,
            type: formData.type,
            framework: formData.framework,
            bgcolor: bgColor,
            tags: tags || [],
        };

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/elements", newElement, {
                withCredentials: true,
            });

            await fetchElements();

            if (res.status === 201) {
                alert("UI Element saved to server!");
                navigate('/elements')
                // console.log(res.data.element);
            }
        } catch (err) {
            console.error("Save failed:", err);
            alert("Failed to save element.");
        }
    };



    const combinedCode = `
    <html>
      <head>
        ${formData.framework === "tailwindcss"
            ? `<script src="https://cdn.tailwindcss.com"></script>`
            : `<style>${formData.css}</style>`
        }
        <style>
          body {
            background-color: ${bgColor};
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
        </style>
      </head>
      <body>${formData.html}</body>
    </html>
  `;

    return (
        <div className="min-h-screen p-6 bg-[#111] text-white">
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* === Left Preview Pane === */}
                <div
                    style={{ background: bgColor }}
                    className="relative min-h-[400px] flex items-start justify-center rounded-l-xl"
                >
                    <iframe
                        title="Preview"
                        className="w-full h-[calc(100vh-160px)]"
                        srcDoc={combinedCode}
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                        <span className=" font-medium text-slate-900 text-xl">{bgColor}</span>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-6 h-6 rounded-md border border-white bg-transparent cursor-pointer"
                        />
                    </div>
                </div>

                {/* === Right Editor Pane === */}
                <div className="flex flex-col bg-[#1e1e1e]">
                    <div className="flex justify-between items-center bg-[#292929] px-4 pt-2.5 text-sm font-medium">
                        {formData.framework === "css" ? (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentTab("html")}
                                    className={`px-2 py-1.5 w-40 text-left rounded-t-md flex items-center gap-1 ${currentTab === "html" ? "bg-[#1E1E1E]" : "bg-[#171717]"
                                        }`}
                                >
                                    <img
                                        src="https://img.icons8.com/color/200/html-5.png"
                                        alt="html icon"
                                        className="w-5"
                                    />{" "}
                                    HTML
                                </button>
                                <button
                                    onClick={() => setCurrentTab("css")}
                                    className={`px-2 py-1.5 w-40 text-left rounded-t-md bg-[#171717] flex items-center gap-1 ${currentTab === "css" ? "bg-[#1E1E1E]" : "bg-[#171717]"
                                        }`}
                                >
                                    <img
                                        src="https://img.icons8.com/fluent/512/css3.png"
                                        alt="css icon"
                                        className="w-5"
                                    />{" "}
                                    CSS
                                </button>
                            </div>
                        ) : (
                            <button className="px-2 py-1.5 w-60 text-left rounded-t-md bg-[#1E1E1E] flex items-center gap-2">
                                <img
                                    src="https://img.icons8.com/color/200/html-5.png"
                                    alt="html icon"
                                    className="w-5"
                                />
                                HTML +
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png"
                                    alt="tailwind"
                                    className="w-5"
                                />
                                Tailwind
                            </button>
                        )}
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={currentTab === "css" ? "css" : "html"}
                            theme="vs-dark"
                            value={currentTab === "css" ? formData.css : formData.html}
                            onChange={(value) =>
                                setFormdata((prev) => ({
                                    ...prev,
                                    [currentTab]: value ?? ""
                                }))
                            }
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                wordWrap: "on",
                                tabSize: 2
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-end gap-4">
                {/* <input
                    type="text"
                    placeholder="Enter post title"
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="py-2 px-3 rounded text-black"
                /> */}
                <button
                    onClick={() => setSaveModalOpen(true)}
                    className="bg-[#4E46E5] hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-lg"
                >
                    Save UI
                </button>

            </div>

            {isOpen && (
                <ElementType
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    formData={formData}
                    setFormdata={setFormdata}
                    elementType={elementType}
                    setElementType={setElementType}
                />
            )}

            <SaveElementModal
                isOpen={saveModalOpen}
                setIsOpen={setSaveModalOpen}
                onSave={handleSave}
                formData={formData}
                setFormdata={setFormdata}
            />

        </div>
    );
};

export default CreatePage;
