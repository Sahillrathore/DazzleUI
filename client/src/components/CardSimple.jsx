// CardPreview.jsx
import React, { useMemo, useState } from "react";

export default function CardSimple({ element }) {
  const [open, setOpen] = useState(false);

  const iframeSrcDoc = useMemo(() => {
    const useTw = element?.framework === "tailwindcss";
    const cssBlock = !useTw ? `<style>${element?.css || ""}</style>` : "";
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          ${useTw ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}
          ${cssBlock}
          <style>
            html, body {
              height: 100%;
              margin: 0;
              background: #141414; /* fixed black */
            }
            /* Center the element by default; your element can override via its own CSS/TW */
            .__center {
              min-height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          </style>
        </head>
        <body>
          <div class="__center">
            ${element?.html || ""}
          </div>
        </body>
      </html>
    `;
  }, [element]);

  return (
    <>
      {/* Card */}
      <div
        className="bg-[#141414] rounded-xl md:w-80 overflow-hidden cursor-pointer ring-1 ring-white/5 hover:ring-white/10 transition"
        onClick={() => setOpen(true)}
      >
        <div className="h-56 w-full">
          <iframe
            title="Preview"
            className="w-full h-full"
            srcDoc={iframeSrcDoc}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>

      {/* Modal (preview-only) */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 rounded-lg px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white"
          >
            Close
          </button>
          <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
            <iframe
              title="Preview Full"
              className="w-full h-full"
              srcDoc={iframeSrcDoc}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        </div>
      )}
    </>
  );
}
