import { useEffect, useState } from 'react';

export default function GithubStats({ username }) {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then((r) => r.json()),
    ])
      .then(([profile, repos]) => {
        if (cancelled) return;
        const owned = Array.isArray(repos) ? repos.filter((r) => !r.fork) : [];
        const totalStars = owned.reduce((sum, r) => sum + r.stargazers_count, 0);
        const langCounts = {};
        owned.forEach((r) => {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        });
        const topLangs = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);
        setStats({
          followers: profile.followers,
          publicRepos: profile.public_repos,
          totalStars,
          topLangs,
        });
        setStatus('done');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const maxLangCount = stats?.topLangs?.[0]?.[1] || 1;

  return (
    <section id="stats">
      <div className="section-title">github stats</div>
      {status === 'loading' && <p className="muted">crunching numbers...</p>}
      {status === 'error' && <p className="muted">couldn't reach the github api.</p>}
      {status === 'done' && stats && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div className="card" style={{ cursor: 'default', textAlign: 'center' }}>
              <div style={{ color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 700 }}>{stats.publicRepos}</div>
              <div className="muted" style={{ fontSize: '0.8rem' }}>public repos</div>
            </div>
            <div className="card" style={{ cursor: 'default', textAlign: 'center' }}>
              <div style={{ color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 700 }}>{stats.totalStars}</div>
              <div className="muted" style={{ fontSize: '0.8rem' }}>total stars</div>
            </div>
            <div className="card" style={{ cursor: 'default', textAlign: 'center' }}>
              <div style={{ color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 700 }}>{stats.followers}</div>
              <div className="muted" style={{ fontSize: '0.8rem' }}>followers</div>
            </div>
          </div>

          {stats.topLangs.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              {stats.topLangs.map(([lang, count]) => (
                <div key={lang} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                    <span>{lang}</span>
                    <span className="muted">{count} repos</span>
                  </div>
                  <div style={{ background: 'var(--border)', borderRadius: 4, height: 6 }}>
                    <div
                      style={{
                        width: `${(count / maxLangCount) * 100}%`,
                        background: 'var(--accent)',
                        height: '100%',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=00000000&color=39ff88&line=39ff88&point=c8ffe0`}
            alt={`${username}'s github contribution graph`}
            style={{ width: '100%', maxWidth: '100%', borderRadius: 6 }}
          />
        </>
      )}
    </section>
  );
}
