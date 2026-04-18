import logo from "./assets/logo.png";
import { useMemo, useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("Documents");
  const [searchTerm, setSearchTerm] = useState("");

  const [documents, setDocuments] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const [projects] = useState([
    {
      id: 1,
      name: "Westlake Expansion",
      status: "Active",
      discipline: "Mechanical / Document Control",
    },
    {
      id: 2,
      name: "Refinery Upgrade Package",
      status: "Pending Review",
      discipline: "Engineering / Drawings",
    },
    {
      id: 3,
      name: "Operations Procedure Library",
      status: "In Progress",
      discipline: "Operations / Procedures",
    },
  ]);

  const handleUpload = (event, sectionSetter, currentSection, sectionName) => {
    const files = Array.from(event.target.files);

    const newItems = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
      section: sectionName,
      uploadedAt: new Date().toLocaleString(),
    }));

    sectionSetter([...currentSection, ...newItems]);
    event.target.value = "";
  };

  const handleDelete = (id, sectionSetter, currentSection) => {
    const itemToDelete = currentSection.find((item) => item.id === id);

    if (itemToDelete?.url) {
      URL.revokeObjectURL(itemToDelete.url);
    }

    const updatedItems = currentSection.filter((item) => item.id !== id);
    sectionSetter(updatedItems);
  };

  const allFiles = useMemo(() => {
    return [...documents, ...drawings, ...templates, ...procedures].sort(
      (a, b) => b.id - a.id
    );
  }, [documents, drawings, templates, procedures]);

  const recentFiles = allFiles.slice(0, 5);

  const getSectionData = () => {
    if (activeSection === "Documents") {
      return {
        title: "Documents",
        description: "Store project files, vendor data, transmittals, and general records.",
        items: documents,
        setItems: setDocuments,
        inputId: "documents-upload",
      };
    }

    if (activeSection === "Drawings") {
      return {
        title: "Drawings",
        description: "Manage technical drawings, sketches, redlines, and markups.",
        items: drawings,
        setItems: setDrawings,
        inputId: "drawings-upload",
      };
    }

    if (activeSection === "Templates") {
      return {
        title: "Templates",
        description: "Keep reusable forms, checklists, and controlled standard templates.",
        items: templates,
        setItems: setTemplates,
        inputId: "templates-upload",
      };
    }

    return {
      title: "Procedures",
      description: "Organize SOPs, instructions, work practices, and operating procedures.",
      items: procedures,
      setItems: setProcedures,
      inputId: "procedures-upload",
    };
  };

  const currentSection = getSectionData();

  const filteredItems = currentSection.items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFiles =
    documents.length + drawings.length + templates.length + procedures.length;

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div>
         <div style={styles.logoBox}>
  <div style={styles.logoCircle}>DCP</div>
  <div>
    <h2 style={styles.logoTitle}>DocControl Pro</h2>
    <p style={styles.logoSub}>Project Intelligence Hub</p>
  </div>
</div>
          <div style={styles.sidebarMenu}>
            <button
              onClick={() => setActiveSection("Documents")}
              style={sidebarButtonStyle(activeSection === "Documents")}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveSection("Drawings")}
              style={sidebarButtonStyle(activeSection === "Drawings")}
            >
              Drawings
            </button>
            <button
              onClick={() => setActiveSection("Templates")}
              style={sidebarButtonStyle(activeSection === "Templates")}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveSection("Procedures")}
              style={sidebarButtonStyle(activeSection === "Procedures")}
            >
              Procedures
            </button>
          </div>
        </div>

        <div style={styles.sidebarFooter}>
          <p style={styles.footerLabel}>Workspace Status</p>
          <div style={styles.liveBadge}>Live</div>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topHeader}>
          <div>
            <p style={styles.headerEyebrow}>DOCUMENT CONTROL DASHBOARD</p>
            <h1 style={styles.mainTitle}>Welcome to DocControl Pro</h1>
            <p style={styles.mainSubtitle}>
              Manage files, organize procedures, track drawings, and keep quick project access in one place.
            </p>
          </div>
        </header>

        <section style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Total Files</p>
            <h2 style={styles.summaryNumber}>{totalFiles}</h2>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Documents</p>
            <h2 style={styles.summaryNumber}>{documents.length}</h2>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Drawings</p>
            <h2 style={styles.summaryNumber}>{drawings.length}</h2>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Templates + Procedures</p>
            <h2 style={styles.summaryNumber}>
              {templates.length + procedures.length}
            </h2>
          </div>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.leftColumn}>
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <div>
                  <h2 style={styles.panelTitle}>{currentSection.title}</h2>
                  <p style={styles.panelDescription}>{currentSection.description}</p>
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
                    handleUpload(
                      event,
                      currentSection.setItems,
                      currentSection.items,
                      currentSection.title
                    )
                  }
                />
              </div>

              <div style={styles.searchRow}>
                <input
                  type="text"
                  placeholder={`Search ${currentSection.title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              {filteredItems.length === 0 ? (
                <div style={styles.emptyState}>
                  <h3 style={styles.emptyTitle}>No files found</h3>
                  <p style={styles.emptyText}>
                    Upload files or change your search to see results here.
                  </p>
                </div>
              ) : (
                <div style={styles.fileList}>
                  {filteredItems.map((item) => (
                    <div key={item.id} style={styles.fileRow}>
                      <div style={{ flex: 1 }}>
                        <p style={styles.fileName}>{item.name}</p>
                        <p style={styles.fileMeta}>
                          {item.section} • Uploaded {item.uploadedAt}
                        </p>
                      </div>

                      <div style={styles.fileButtons}>
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
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Recent Files</h2>
              <p style={styles.panelDescription}>
                Your most recently uploaded items across all sections.
              </p>

              {recentFiles.length === 0 ? (
                <p style={styles.sideEmptyText}>No recent files yet.</p>
              ) : (
                <div style={styles.recentList}>
                  {recentFiles.map((file) => (
                    <div key={file.id} style={styles.recentRow}>
                      <div>
                        <p style={styles.recentName}>{file.name}</p>
                        <p style={styles.recentMeta}>{file.section}</p>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.smallOpenButton}
                      >
                        Open
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Projects</h2>
              <p style={styles.panelDescription}>
                Quick-view cards for current projects and work areas.
              </p>

              <div style={styles.projectList}>
                {projects.map((project) => (
                  <div key={project.id} style={styles.projectCard}>
                    <p style={styles.projectName}>{project.name}</p>
                    <p style={styles.projectDiscipline}>{project.discipline}</p>
                    <span style={styles.projectStatus}>{project.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Workspace Notes</h2>
              <p style={styles.panelDescription}>
                This version supports upload, open, delete, search, and dashboard layout.
              </p>
              <ul style={styles.notesList}>
                <li>Files open in a new tab from the current session.</li>
                <li>Uploaded items are not permanently saved yet.</li>
                <li>Next upgrade can add real storage and project metadata.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function sidebarButtonStyle(active) {
  return {
    width: "100%",
    textAlign: "left",
    background: active ? "#2563eb" : "transparent",
    color: "#ffffff",
    border: active ? "1px solid #3b82f6" : "1px solid transparent",
    padding: "12px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    marginBottom: "8px",
  };
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#0b1120",
    color: "#e5e7eb",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "260px",
    background: "#111827",
    borderRight: "1px solid #1f2937",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoBox: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "28px",
  },
  logoCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#fff",
  },
  logoTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#fff",
  },
  logoSub: {
    margin: "4px 0 0 0",
    color: "#9ca3af",
    fontSize: "12px",
  },
  sidebarMenu: {
    marginTop: "12px",
  },
  sidebarFooter: {
    borderTop: "1px solid #1f2937",
    paddingTop: "16px",
  },
  footerLabel: {
    margin: "0 0 10px 0",
    color: "#9ca3af",
    fontSize: "12px",
  },
  liveBadge: {
    display: "inline-block",
    background: "#16a34a",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },
  main: {
    flex: 1,
    padding: "28px",
  },
  topHeader: {
    marginBottom: "24px",
  },
  headerEyebrow: {
    margin: "0 0 8px 0",
    color: "#60a5fa",
    fontSize: "12px",
    letterSpacing: "1px",
    fontWeight: "700",
  },
  mainTitle: {
    margin: "0 0 10px 0",
    fontSize: "34px",
    color: "#fff",
  },
  mainSubtitle: {
    margin: 0,
    color: "#9ca3af",
    maxWidth: "760px",
    lineHeight: 1.6,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  summaryCard: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "16px",
    padding: "20px",
  },
  summaryLabel: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    color: "#9ca3af",
  },
  summaryNumber: {
    margin: 0,
    fontSize: "30px",
    color: "#fff",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  leftColumn: {
    minWidth: 0,
  },
  rightColumn: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  panel: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "18px",
    padding: "20px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  panelTitle: {
    margin: "0 0 8px 0",
    color: "#fff",
    fontSize: "24px",
  },
  panelDescription: {
    margin: 0,
    color: "#9ca3af",
    lineHeight: 1.5,
    fontSize: "14px",
  },
  uploadButton: {
    display: "inline-block",
    background: "#2563eb",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    textDecoration: "none",
  },
  searchRow: {
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    background: "#0b1120",
    color: "#fff",
    border: "1px solid #374151",
    borderRadius: "10px",
    padding: "12px 14px",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  emptyState: {
    border: "1px dashed #374151",
    background: "#0b1120",
    borderRadius: "16px",
    padding: "36px 20px",
    textAlign: "center",
  },
  emptyTitle: {
    margin: "0 0 8px 0",
    color: "#fff",
  },
  emptyText: {
    margin: 0,
    color: "#9ca3af",
  },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  fileRow: {
    background: "#0b1120",
    border: "1px solid #1f2937",
    borderRadius: "14px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  fileName: {
    margin: "0 0 6px 0",
    color: "#fff",
    fontWeight: "700",
    wordBreak: "break-word",
  },
  fileMeta: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "13px",
  },
  fileButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  openButton: {
    background: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "700",
  },
  deleteButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
  recentList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "16px",
  },
  recentRow: {
    background: "#0b1120",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  recentName: {
    margin: "0 0 4px 0",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
  },
  recentMeta: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "12px",
  },
  smallOpenButton: {
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },
  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "16px",
  },
  projectCard: {
    background: "#0b1120",
    border: "1px solid #1f2937",
    borderRadius: "14px",
    padding: "14px",
  },
  projectName: {
    margin: "0 0 6px 0",
    color: "#fff",
    fontWeight: "700",
  },
  projectDiscipline: {
    margin: "0 0 10px 0",
    color: "#9ca3af",
    fontSize: "13px",
  },
  projectStatus: {
    display: "inline-block",
    background: "#1d4ed8",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },
  notesList: {
    margin: "16px 0 0 18px",
    color: "#9ca3af",
    lineHeight: 1.7,
    padding: 0,
  },
  sideEmptyText: {
    color: "#9ca3af",
    marginTop: "16px",
  },
};

export default App;
