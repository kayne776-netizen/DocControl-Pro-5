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

  const totalFiles =
    documents.length + drawings.length + templates.length + procedures.length;

  const getSectionData = () => {
    if (activeSection === "Documents") {
      return {
        title: "Documents",
        description: "Manage general project documents and quick-access files.",
        items: documents,
        setItems: setDocuments,
        inputId: "documents-upload",
      };
    }
    if (activeSection === "Drawings") {
      return {
        title: "Drawings",
        description: "Store and access technical drawings, sketches, and markups.",
        items: drawings,
        setItems: setDrawings,
        inputId: "drawings-upload",
      };
    }
    if (activeSection === "Templates") {
      return {
        title: "Templates",
        description: "Keep reusable forms, checklists, and standard templates.",
        items: templates,
        setItems: setTemplates,
        inputId: "templates-upload",
      };
    }
    return {
      title: "Procedures",
      description: "Organize work instructions, SOPs, and operating procedures.",
      items: procedures,
      setItems: setProcedures,
      inputId: "procedures-upload",
    };
  };

  const currentSection = getSectionData();

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div>
          <p style={styles.brandTag}>PROJECT KNOWLEDGE + DOCUMENT CONTROL</p>
          <h1 style={styles.title}>DocControl Pro</h1>
          <p style={styles.subtitle}>
            A centralized workspace for documents, drawings, templates, and procedures.
          </p>
        </div>
        <div style={styles.headerBadge}>Live Workspace</div>
      </header>

      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Files</p>
          <h2 style={styles.statNumber}>{totalFiles}</h2>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Documents</p>
          <h2 style={styles.statNumber}>{documents.length}</h2>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Drawings</p>
          <h2 style={styles.statNumber}>{drawings.length}</h2>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Templates + Procedures</p>
          <h2 style={styles.statNumber}>{templates.length + procedures.length}</h2>
        </div>
      </section>

      <section style={styles.navCard}>
        <div style={styles.navRow}>
          <button
            onClick={() => setActiveSection("Documents")}
            style={navButtonStyle(activeSection === "Documents")}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveSection("Drawings")}
            style={navButtonStyle(activeSection === "Drawings")}
          >
            Drawings
          </button>
          <button
            onClick={() => setActiveSection("Templates")}
            style={navButtonStyle(activeSection === "Templates")}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveSection("Procedures")}
            style={navButtonStyle(activeSection === "Procedures")}
          >
            Procedures
          </button>
        </div>
      </section>

      <section style={styles.mainCard}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>{currentSection.title}</h2>
            <p style={styles.sectionText}>{currentSection.description}</p>
          </div>

          <label htmlFor={currentSection.inputId} style={styles.uploadButton}>
            Upload {currentSection.title}
          </label>

          <input
            id={currentSection.inputId}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(event) =>
              handleUpload(event, currentSection.setItems, currentSection.items)
            }
          />
        </div>

        <div style={styles.filePanel}>
          {currentSection.items.length === 0 ? (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyTitle}>No files uploaded yet</h3>
              <p style={styles.emptyText}>
                Upload files to start building your {currentSection.title.toLowerCase()} library.
              </p>
            </div>
          ) : (
            <div style={styles.fileList}>
              {currentSection.items.map((item) => (
                <div key={item.id} style={styles.fileRow}>
                  <div>
                    <p style={styles.fileName}>{item.name}</p>
                    <p style={styles.fileMeta}>{currentSection.title} File</p>
                  </div>

                  <div style={styles.fileActions}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.openButton}
                    >
                      Open
                    </a>
                    <button
                      onClick={() =>
                        handleDelete(
                          item.id,
                          currentSection.setItems,
                          currentSection.items
                        )
                      }
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function navButtonStyle(active) {
  return {
    background: active ? "#2563eb" : "#e2e8f0",
    color: active ? "#ffffff" : "#0f172a",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: active ? "0 8px 20px rgba(37, 99, 235, 0.25)" : "none",
  };
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    padding: "32px 20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    maxWidth: "1100px",
    margin: "0 auto 24px auto",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    borderRadius: "18px",
    padding: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)",
  },
  brandTag: {
    margin: "0 0 8px 0",
    fontSize: "12px",
    letterSpacing: "1px",
    opacity: 0.8,
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "34px",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    maxWidth: "650px",
    lineHeight: 1.6,
    color: "#cbd5e1",
  },
  headerBadge: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "10px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  },
  statsGrid: {
    maxWidth: "1100px",
    margin: "0 auto 24px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  statCard: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  statLabel: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
  },
  statNumber: {
    margin: 0,
    fontSize: "28px",
    color: "#0f172a",
  },
  navCard: {
    maxWidth: "1100px",
    margin: "0 auto 24px auto",
    background: "white",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  navRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  mainCard: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: "white",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  sectionTitle: {
    margin: "0 0 8px 0",
    fontSize: "28px",
  },
  sectionText: {
    margin: 0,
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.5,
  },
  uploadButton: {
    display: "inline-block",
    background: "#2563eb",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)",
  },
  filePanel: {
    marginTop: "10px",
  },
  emptyState: {
    background: "#f8fafc",
    border: "1px dashed #cbd5e1",
    borderRadius: "16px",
    padding: "40px 20px",
    textAlign: "center",
  },
  emptyTitle: {
    margin: "0 0 10px 0",
    fontSize: "20px",
  },
  emptyText: {
    margin: 0,
    color: "#64748b",
  },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  fileRow: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  fileName: {
    margin: "0 0 6px 0",
    fontWeight: "600",
    fontSize: "15px",
  },
  fileMeta: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },
  fileActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  openButton: {
    background: "#16a34a",
    color: "white",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "600",
  },
  deleteButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default App;
