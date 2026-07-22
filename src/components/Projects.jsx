const PROJECTS = [
  {
    name: 'ai-defending-ai',
    desc: 'An AI firewall that detects and blocks prompt injection & jailbreak attacks in real time, with a live dashboard.',
    stack: 'Python',
    url: 'https://github.com/CyVenom/ai-defending-ai',
  },
  {
    name: 'CyVen_OctoC2',
    desc: 'GitHub-native command-and-control framework for authorized security research, with encrypted multi-channel transport.',
    stack: 'Python',
    url: 'https://github.com/CyVenom/CyVen_OctoC2',
  },
  {
    name: 'Reflective_XSS',
    desc: 'Advanced reflected XSS detection framework built for web application security testing.',
    stack: 'Python',
    url: 'https://github.com/CyVenom/Reflective_XSS',
  },
  {
    name: 'CyVen_LivingOfTheLand',
    desc: 'A comprehensive privilege escalation enumeration tool for Linux/Unix security assessments.',
    stack: 'Shell',
    url: 'https://github.com/CyVenom/CyVen_LivingOfTheLand',
  },
  {
    name: 'Waybackurl',
    desc: 'Reconnaissance automation tool for bug bounty hunters and penetration testers.',
    stack: 'Python',
    url: 'https://github.com/CyVenom/Waybackurl',
  },
  {
    name: 'E_Learning_Platform',
    desc: 'Full-stack e-learning platform.',
    stack: 'PHP',
    url: 'https://github.com/CyVenom/E_Learning_Platform',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-title">projects</div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="card"
          >
            <div style={{ color: 'var(--accent)', fontWeight: 700 }}>{p.name}</div>
            <div style={{ margin: '0.35rem 0' }}>{p.desc}</div>
            <div className="muted" style={{ fontSize: '0.8rem' }}>{p.stack}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
