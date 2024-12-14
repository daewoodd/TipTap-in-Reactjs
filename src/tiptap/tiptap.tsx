import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Extension } from "@tiptap/core";

const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});

const TextEditor = () => {
  const [importContent, setImportContent] = useState("");

  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit, Image, FontSize],
    content: "<p>Hello! Start editing...</p>",
  });

  if (!editor) {
    return null; // Avoid rendering if the editor is not yet initialized
  }

  // Export content as HTML
  const exportHTML = () => {
    const html = editor.getHTML();
    console.log("Exported HTML:\n" + html);
  };

  // Export content as JSON
  const exportJSON = () => {
    const json = editor.getJSON();
    console.log("Exported JSON:\n" + JSON.stringify(json, null, 2));
  };

  // Import content from JSON string
  const handleImport = () => {
    try {
      const json = JSON.parse(importContent);
      editor.commands.setContent(json);
      alert("Content imported successfully!");
    } catch (error) {
        console.log(error)
      alert("Invalid JSON format!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>TipTap Text Editor</h2>

      {/* Toolbar Buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} style={{ marginRight: "5px" }}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} style={{ marginRight: "5px" }}>Italic</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} style={{ marginRight: "5px" }}>Horizontal Line</button>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <EditorContent editor={editor} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={exportHTML} style={{ marginRight: "10px" }}>Export HTML</button>
        <button onClick={exportJSON} style={{ marginRight: "10px" }}>Export JSON</button>

        <textarea
          placeholder="Paste JSON content here to import"
          value={importContent}
          onChange={(e) => setImportContent(e.target.value)}
          rows={5}
          style={{ width: "100%", marginTop: "10px" }}
        ></textarea>

        <button onClick={handleImport} style={{ marginTop: "10px" }}>Import JSON</button>
      </div>
    </div>
  );
};

export default TextEditor;
