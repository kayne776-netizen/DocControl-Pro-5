function StatCard({ label, value, hint }) {
  return (
    <div className="card stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-hint">{hint}</div>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <section className="card panel">
      <div className="panel-header">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function App() {
  const recentDocs = [
    { number: 'P-101-DS-001', title: 'Pump Datasheet', rev: 'Rev 3', status: 'Pending Review' },
    { number: 'M-220-GA-014', title: 'General Arrangement', rev: 'Rev 1', status: 'Approved' },
    { number: 'E-450-SL-008', title: 'Single Line Diagram', rev: 'Rev 2', status: 'Returned With Comments' },
  ]

  const knowledgeItems = [
    'Transmittal numbering rules',
    'Vendor document review workflow',
    'Typical revision status meanings',
    'Lessons learned from previous project packages',
  ]

  const actions = [
    'Review vendor package for Project Falcon',
    'Follow up on overdue instrument datasheets',
    'Confirm latest approved P&ID revision',
    'Upload meeting notes and tag open actions',
  ]

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">DocControl Pro</p>
          <h1>Document control + project knowledge in one place</h1>
          <p className="hero-copy">
            A starter dashboard for tracking revisions, approvals, overdue items, and searchable project know-how.
          </p>
        </div>
        <div className="hero-actions">
          <button>Upload Documents</button>
          <button className="secondary">Search Knowledge Base</button>
        </div>
      </header>

      <main className="content-grid">
        <section className="stats-grid">
          <StatCard label="Open Documents" value="128" hint="12 need action today" />
          <StatCard label="Pending Approvals" value="24" hint="4 overdue" />
          <StatCard label="Recent Uploads" value="19" hint="Last 7 days" />
          <StatCard label="Knowledge Articles" value="42" hint="Procedures, tips, lessons learned" />
        </section>

        <div className="two-column">
          <Panel title="Recent Documents">
            <div className="table-like">
              <div className="table-head row">
                <span>Document No.</span>
                <span>Title</span>
                <span>Revision</span>
                <span>Status</span>
              </div>
              {recentDocs.map((doc) => (
                <div className="row" key={doc.number}>
                  <span>{doc.number}</span>
                  <span>{doc.title}</span>
                  <span>{doc.rev}</span>
                  <span>{doc.status}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Quick Actions">
            <ul className="simple-list">
              {actions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="two-column">
          <Panel title="Knowledge Base Shortcuts">
            <ul className="simple-list">
              {knowledgeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>

          <Panel title="How this starter is organized">
            <ul className="simple-list">
              <li>Proper Vite React structure with a <strong>src</strong> folder</li>
              <li><strong>main.jsx</strong> renders the app</li>
              <li><strong>App.jsx</strong> contains the dashboard UI</li>
              <li><strong>styles.css</strong> contains all styling</li>
              <li>Ready for GitHub upload and Vercel deployment</li>
            </ul>
          </Panel>
        </div>
      </main>
    </div>
  )
}
