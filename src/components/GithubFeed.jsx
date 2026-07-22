import { useEffect, useState } from 'react';

export default function GithubFeed({ username }) {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
      .then((res) => {
        if (!res.ok) throw new Error('request failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const original = Array.isArray(data) ? data.filter((repo) => !repo.fork) : [];
        setRepos(original.slice(0, 6));
        setStatus('done');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <section id="github">
      <div className="section-title">live github feed</div>
      {status === 'loading' && <p className="muted">fetching repos...</p>}
      {status === 'error' && (
        <p className="muted">couldn't reach the github api. check back later.</p>
      )}
      {status === 'done' && repos.length === 0 && (
        <p className="muted">no public repos found.</p>
      )}
      {status === 'done' && repos.length > 0 && (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: 'var(--accent)' }}>{repo.name}</span>
                <span className="muted" style={{ fontSize: '0.8rem' }}>
                  {repo.language || '-'} · ★ {repo.stargazers_count}
                </span>
              </div>
              {repo.description && (
                <div className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  {repo.description}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
