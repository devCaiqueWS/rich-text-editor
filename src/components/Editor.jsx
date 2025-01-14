import React, { useRef, useState } from "react";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Editor = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");

  React.useEffect(() => {
    // Inicializando o Quill Editor
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ align: [] }],
          [{ size: [] }],
          [{ color: [] }],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    });

    // Escutando as mudanças no conteúdo do editor
    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML); // Armazenando o conteúdo em HTML
    });
  }, []);

  // Função para salvar o conteúdo
  const saveContent = async () => {
    try {
      const response = await axios.post("http://localhost:5000/save", {
        content: editorContent,
      });
      alert("Conteúdo salvo com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao salvar o conteúdo:", error);
      alert("Erro ao salvar o conteúdo.");
    }
  };

  return (
    <div className="editor-container">
      <div ref={editorRef} style={{ height: "400px" }}></div>
      <button
        onClick={saveContent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white"
      >
        Salvar Conteúdo
      </button>
    </div>
  );
};

export default Editor;
