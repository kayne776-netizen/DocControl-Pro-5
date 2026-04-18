import { useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("Documents");

  const [documents, setDocuments] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const handleUpload = (event, sectionSetter, currentSection) => {
    const files = Array.from(event.target.files);

    const newItems = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    sectionSetter([...currentSection, ...newItems]);
    event.target.value = "";
  };

  const handleDelete = (id, sectionSetter, currentSection) => {
    const itemToDelete = currentSection.find((item) => item.id === id);

    if (itemToDelete && itemToDelete.url) {
      URL.revokeObjectURL(itemToDelete.url);
    }

    const updatedItems = currentSection.filter((item) => item.id !== id);
    sectionSetter(updatedItems);
  };

  const renderSection = (title, items, setItems, inputId) => {
    return (
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h2>{title}</h2>

        <label
          htmlFor={inputId}
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "white",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          Upload {title}
        </label>

        <input
          id={inputId}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(event) => handleUpload(event, setItems, items)}
        />

        {items.length === 0 ? (
          <p style={{ marginTop: "15px" }}>No files uploaded yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#334155",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ flex: 1 }}>{item.name}</span>

                <div style={{ display: "flex", gap: "8px" }}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "#16a34a",
                      color: "white",
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                  >
                    Open
                  </a>

                  <button
                    onClick={() => handleDelete(item.id, setItems, items)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>DocControl Pro</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveSection("Documents")}
          style={buttonStyle(activeSection === "Documents")}
        >
          Documents
        </button>

        <button
          onClick={() => setActiveSection("Drawings")}
          style={buttonStyle(activeSection === "Drawings")}
        >
          Drawings
        </button>

        <button
          onClick={() => setActiveSection("Templates")}
          style={buttonStyle(activeSection === "Templates")}
        >
          Templates
        </button>

        <button
          onClick={() => setActiveSection("Procedures")}
          style={buttonStyle(activeSection === "Procedures")}
        >
          Procedures
        </button>
      </div>

      {activeSection === "Documents" &&
        renderSection("Documents", documents, setDocuments, "documents-upload")}

      {activeSection === "Drawings" &&
        renderSection("Drawings", drawings, setDrawings, "drawings-upload")}

      {activeSection === "Templates" &&
        renderSection("Templates", templates, setTemplates, "templates-upload")}

      {activeSection === "Procedures" &&
        renderSection("Procedures", procedures, setProcedures, "procedures-upload")}
    </div>
  );
}

function buttonStyle(active) {
  return {
    background: active ? "#2563eb" : "#334155",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };
}

export default App;
