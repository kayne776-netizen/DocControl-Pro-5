import { useState } from "react"

function App() {
  const [page, setPage] = useState("home")
  const [documents, setDocuments] = useState([])
  const [projects, setProjects] = useState([])
  const [input, setInput] = useState("")

  const addDocument = () => {
    if (input.trim() === "") return
    setDocuments([...documents, input])
    setInput("")
  }

  const addProject = () => {
    if (input.trim() === "") return
    setProjects([...projects, input])
    setInput("")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>DocControl Pro</h1>

      {/* Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("home")}>Home</button>{" "}
        <button onClick={() => setPage("documents")}>Documents</button>{" "}
        <button onClick={() => setPage("projects")}>Projects</button>{" "}
        <button onClick={() => setPage("knowledge")}>Knowledge Base</button>
      </div>

      {/* HOME */}
      {page === "home" && (
        <div>
          <h2>Welcome</h2>
          <p>Select a section to begin.</p>
        </div>
      )}

      {/* DOCUMENTS */}
      {page === "documents" && (
        <div>
          <h2>Documents</h2>

          <input
            type="text"
            placeholder="Enter document name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addDocument}>Add Document</button>

          <ul>
            {documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PROJECTS */}
      {page === "projects" && (
        <div>
          <h2>Projects</h2>

          <input
            type="text"
            placeholder="Enter project name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addProject}>Add Project</button>

          <ul>
            {projects.map((proj, index) => (
              <li key={index}>{proj}</li>
            ))}
          </ul>
        </div>
      )}

      {/* KNOWLEDGE BASE */}
      {page === "knowledge" && (
        <div>
          <h2>Knowledge Base</h2>
          <p>
            This section will store procedures, lessons learned, and document
            control standards.
          </p>
        </div>
      )}
    </div>
  )
}

export default App
