import React from "react";
import Editor from "./components/Editor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl text-center mt-8">Editor de Texto</h1>
      <Editor /> {/* Renderizando o componente do editor */}
    </div>
  );
}

export default App;
