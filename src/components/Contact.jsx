export default function Contact({ username }) {
  return (
    <section id="contact">
      <div className="section-title">contact</div>
      <p>
        <span className="prompt">guest@cyvenom</span>:<span className="path">~</span>$ cat contact.txt
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
        <li>
          github &nbsp;: <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">github.com/{username}</a>
        </li>
      </ul>
    </section>
  );
}
