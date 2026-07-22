import Terminal from './components/Terminal.jsx';
import GithubFeed from './components/GithubFeed.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

const GITHUB_USERNAME = 'CyVenom';

function App() {
  return (
    <div className="scanlines">
      <Terminal username={GITHUB_USERNAME} />
      <div className="container">
        <Projects />
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
