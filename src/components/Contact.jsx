export default function Contact({ username }) {
  return (
    <section id="contact" style={{ borderBottom: 'none' }}>
      <div className="section-title">contact</div>
      <div className="card" style={{ cursor: 'default' }}>
        <p style={{ margin: 0 }}>
          <span className="prompt">guest@cyvenom</span>:<span className="path">~</span>$ cat contact.txt
        </p>
        <p style={{ margin: '0.6rem 0 0' }}>
          github &nbsp;:{' '}
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
            github.com/{username}
          </a>
        </p>
        <p className="muted" style={{ margin: '0.6rem 0 0', fontSize: '0.85rem' }}>
          open to collabs, CTF teams, and interesting bugs. hit me up on github.
        </p>
      </div>
    </section>
  );
}
