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
    setPreview(code)
  }

  return (
    <>
      <div className="topbar">
        <div className="brand">⚡ Mini HTML Preview</div>
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
