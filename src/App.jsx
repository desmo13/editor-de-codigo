import { useState } from 'react'
import './App.css'
import './codeEditor.css'

function App() {
  const [code, setCode] = useState('')
  const [preview, setPreview] = useState('')

  const handleChange = (e) => {
    setCode(e.target.value)
  }

  const handlePreview = () => {
      const styledCode = `
  <html>
    <head>
      <style>
        html, body {
          background-color: rgba(55, 58, 66, 0.6);
          color: white;
          font-family: monospace;
          margin: 0;
          padding: 1rem;
        }
        a { color: #7c5cff; }
      </style>
    </head>
    <body>${code}</body>
  </html>`;
    setPreview(styledCode)
  }
const handleOpenFile = async() => {
    if (!('showOpenFilePicker' in window)) {
    alert('Tu navegador no soporta File System Access API');
    return;
  }
  const [fileHandle] = await window.showOpenFilePicker({
      multiple: false,
      types: [
        {
          description: 'HTML/CSS/JS',
          accept: {
            'text/html': ['.html', '.htm'],
            'text/css': ['.css'],
            'text/javascript': ['.js'],
            'text/plain': ['.txt'],
          },
        },
      ],
    });

    const file = await fileHandle.getFile();
    const fileText = await file.text();
    setCode(fileText);
  
};
  return (
    <>
      <div className="topbar">
        <div className="brand">⚡ Mini HTML Preview</div>
        <button className="btn" onClick={handleOpenFile}>Abrir</button>
        <button className="btn" onClick={handlePreview}>Preview</button>
      </div>

      <div id="separator">
        <textarea
          name="codeEditor"
          id="codeEditor"
          spellCheck={false}
          placeholder="Escribe aquí tu HTML, CSS o JS..."
          onChange={handleChange}
          value={code}
        />
        <iframe
          id="previewFrame"
          srcDoc={preview}
          title="preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </>
  )
}

export default App
