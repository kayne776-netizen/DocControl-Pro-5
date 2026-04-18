import { useState } from "react"

function App() {
  const [documents, setDocuments] = useState([
    "Pump Datasheet 32-P-104",
    "Valve Spec Sheet 21-V-201",
    "P&ID Drawing A-101"
  ])

  // Add a new document
  const addDocument = () => {
    const newDoc = `New Document ${documents.length + 1}`
    setDocuments([...documents, newDoc])
  }

  // Delete a document
  const deleteDocument = (indexToDelete) => {
    const updatedDocs = documents.filter((_, index) => index !== indexToDelete)
    setDocuments(updatedDocs)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>DocControl Pro</h1>

      <button onClick={addDocument}>Add Document</button>

      <ul>
        {documents.map((doc, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {doc}

            <button
              onClick={() => deleteDocument(index)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
