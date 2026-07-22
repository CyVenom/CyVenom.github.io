import { useEffect, useState } from 'react';
import Terminal from './components/Terminal.jsx';
import GithubFeed from './components/GithubFeed.jsx';
import GithubStats from './components/GithubStats.jsx';
import Projects from './components/Projects.jsx';
import Writeups from './components/Writeups.jsx';
import Contact from './components/Contact.jsx';

const GITHUB_USERNAME = 'CyVenom';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="scanlines">
      <nav className="navbar">
        <div className="navbar-inner">
          <span className="prompt">cyvenom</span>
          <span>
            <a href="#projects">projects</a>
            <a href="#writeups">writeups</a>
            <a href="#stats">stats</a>
            <a href="#contact">contact</a>
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              style={{
                marginLeft: '1.25rem',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                borderRadius: 4,
                padding: '0.2rem 0.5rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
              }}
            >
              {theme === 'dark' ? 'light' : 'dark'}
            </button>
          </span>
        </div>
      </nav>
      <Terminal username={GITHUB_USERNAME} />
      <div className="container">
        <Projects />
        <Writeups />
        <GithubStats username={GITHUB_USERNAME} />
        <GithubFeed username={GITHUB_USERNAME} />
        <Contact username={GITHUB_USERNAME} />
      </div>
      <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--muted)', fontSize: '0.85rem' }}>
        <span className="prompt">guest@cyvenom</span>:<span className="path">~</span>$ built with react + a lot of coffee
      </footer>
    </div>
  );
}

export default App;
