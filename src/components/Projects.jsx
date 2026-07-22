const PROJECTS = [
  {
    name: 'Secure URL Shortener',
    desc: 'URL shortener with ML-based threat detection and configurable access policies.',
    stack: 'Express, SQLite, React/Vite',
  },
  {
    name: 'SpendSmart',
    desc: 'Full-stack personal finance tracker.',
    stack: 'Express, SQLite, React/Vite',
  },
  {
    name: 'MindBridge',
    desc: 'AI mental health companion with a Claude-powered backend.',
    stack: 'React, Vite, Tailwind, Node/Express, Supabase',
  },
  {
    name: 'Vaultify',
    desc: 'Desktop password manager with AES-256-GCM encrypted vault storage.',
    stack: 'JavaFX 21, Maven',
  },
  {
    name: 'ZeroPhisher',
    desc: 'Android app that scans QR codes and URLs to flag phishing attempts.',
    stack: 'Kotlin, Jetpack Compose',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-title">projects</div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '1rem',
            }}
          >
            <div style={{ color: 'var(--accent)', fontWeight: 700 }}>{p.name}</div>
            <div style={{ margin: '0.35rem 0' }}>{p.desc}</div>
            <div className="muted" style={{ fontSize: '0.8rem' }}>{p.stack}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
