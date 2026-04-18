import { useMemo, useState } from "react";
import logo from "./assets/logo.png";

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
    },
    {
      id: 2,
      name: "Refinery Upgrade",
      status: "Pending",
    },
  ]);

  const handleUpload = (event, setItems, items, section) => {
    const files = Array.from(event.target.files);

    const newItems = files.map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      url: URL.createObjectURL(file),
      section,
    }));

    setItems([...items, ...newItems]);
    event.target.value = "";
  };

  const handleDelete = (id, setItems, items) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  const allFiles = useMemo(() => {
    return [...documents, ...drawings, ...templates, ...procedures].reverse();
  }, [documents, drawings, templates, procedures]);

  const recentFiles = allFiles.slice(0, 5);

  const getSection = () => {
    switch (activeSection) {
      case "Documents":
        return { items: documents, set: setDocuments };
      case "Drawings":
        return { items: drawings, set: setDrawings };
      case "Templates":
        return { items: templates, set: setTemplates };
      case "Procedures":
        return { items: procedures, set: setProcedures };
      default:
        return { items: documents, set: setDocuments };
    }
  };

  const section = getSection();

  const filtered = section.items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logoBox}>
            <img src={logo} alt="Logo" style={styles.logoImage} />
            <div>
              <h2 style={styles.logoTitle}>DocControl Pro</h2>
              <p style={styles.logoSub}>Project Hub</p>
            </div>
          </div>

          <div style={styles.sidebarMenu}>
            {["Documents", "Drawings", "Templates", "Procedures"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                style={sidebarButton(activeSection === item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <h1 style={styles.title}>{activeSection}</h1>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />

        <label htmlFor="upload" style={styles.upload}>
          Upload
        </label>
        <input
          id="upload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) =>
            handleUpload(e, section.set, section.items, activeSection)
          }
        />

        {/* FILE LIST */}
        <div>
          {filtered.map((item) => (
            <div key={item.id} style={styles.fileRow}>
              <span>{item.name}</span>
              <div>
                <a href={item.url} target="_blank" rel="noreferrer">
                  Open
                </a>
                <button
                  onClick={() =>
                    handleDelete(item.id, section.set, section.items)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RECENT FILES */}
        <h2>Recent Files</h2>
        {recentFiles.map((file) => (
          <div key={file.id}>{file.name}</div>
        ))}

        {/* PROJECTS */}
        <h2>Projects</h2>
        {projects.map((p) => (
          <div key={p.id}>
            {p.name} - {p.status}
          </div>
        ))}
      </main>
    </div>
  );
}

/* STYLES */
const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#0b1120",
    color: "white",
  },
  sidebar: {
    width: "250px",
    background: "#111827",
    padding: "20px",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  logoImage: {
    width: "60px",
    height: "60px",
    background: "white",
    padding: "5px",
    borderRadius: "10px",
  },
  logoTitle: { margin: 0 },
  logoSub: { margin: 0, fontSize: "12px", color: "#aaa" },
  sidebarMenu: { display: "flex", flexDirection: "column", gap: "10px" },
  main: { flex: 1, padding: "20px" },
  title: { marginBottom: "10px" },
  search: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  upload: {
    background: "#2563eb",
    padding: "10px",
    display: "inline-block",
    marginBottom: "10px",
    cursor: "pointer",
  },
  fileRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
};

function sidebarButton(active) {
  return {
    background: active ? "#2563eb" : "#1f2937",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  };
}

export default App;
