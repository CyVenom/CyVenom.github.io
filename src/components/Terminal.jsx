import { useEffect, useRef, useState } from 'react';

const HELP = [
  'available commands:',
  '  whoami       - who is this guy',
  '  skills       - tech stack & tools',
  '  projects     - jump to projects section',
  '  contact      - jump to contact section',
  '  socials      - links to github / other profiles',
  '  clear        - clear the terminal',
  '  help         - show this list again',
];

function buildResponse(cmdRaw, username) {
  const cmd = cmdRaw.trim().toLowerCase();
  switch (cmd) {
    case '':
      return [];
    case 'help':
      return HELP;
    case 'whoami':
      return [
        `${username}`,
        'CS (Cybersecurity) student | bug hunter',
        'CTF | hacking | security research',
        '200+ public repos on github, mostly security tooling and full-stack builds.',
      ];
    case 'skills':
      return [
        'languages : Java, Python, C++, Bash, JavaScript',
        'frontend  : React, Vite, Tailwind',
        'backend   : Node/Express, SQLite/MySQL, Supabase, PHP',
        'security  : bug bounty recon, XSS/vuln detection tooling, CTFs',
      ];
    case 'projects':
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return ['scrolling to projects...'];
    case 'contact':
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return ['scrolling to contact...'];
    case 'socials':
    case 'social':
      return [`github   : https://github.com/${username}`];
    case 'clear':
      return null;
    case 'sudo':
    case 'sudo su':
      return ['nice try. permission denied.'];
    default:
      return [`command not found: ${cmd}`, `type 'help' for a list of commands`];
  }
}

export default function Terminal({ username }) {
  const [lines, setLines] = useState([
    { type: 'system', text: `welcome to ${username}'s terminal. type 'help' to get started.` },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  function focusInput() {
    inputRef.current?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = input;
    const output = buildResponse(cmd, username);

    if (output === null) {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'input', text: cmd },
        ...output.map((text) => ({ type: 'output', text })),
      ]);
    }

    if (cmd.trim() !== '') {
      setHistory((prev) => [...prev, cmd]);
    }
    setHistoryIdx(-1);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    }
  }

  return (
    <div
      onClick={focusInput}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 1.5rem 2rem',
        maxWidth: 900,
        margin: '0 auto',
        cursor: 'text',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <img
          className="avatar"
          src={`https://github.com/${username}.png`}
          alt={username}
        />
        <pre
          style={{
            color: 'var(--accent)',
            fontSize: 'clamp(0.5rem, 2vw, 0.9rem)',
            lineHeight: 1.1,
            margin: 0,
            overflowX: 'auto',
          }}
        >
{String.raw`  ______      __     __
 / ____/_  __/ /   /  |____  ____  ____  ____
/ / __/ / / / /   / /| / _ \/ __ \/ __ \/ __ \
/ /_/ / /_/ / /   / ___ /  __/ / / / /_/ / / / /
\____/\__, /_/   /_/  |_\___/_/ /_/\____/_/ /_/
     /____/`}
        </pre>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          cybersecurity student // bug hunter // {username}
        </p>
      </div>

      <div
        style={{
          border: '1px solid var(--border)',
          background: 'rgba(15, 21, 18, 0.6)',
          borderRadius: 6,
          padding: '1rem',
          fontSize: '0.9rem',
          maxHeight: '40vh',
          overflowY: 'auto',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: line.type === 'input' ? 0 : '0.15rem' }}>
            {line.type === 'input' && (
              <span>
                <span className="prompt">guest@cyvenom</span>:<span className="path">~</span>${' '}
                {line.text}
              </span>
            )}
            {line.type === 'output' && <span className="muted">{line.text}</span>}
            {line.type === 'system' && <span>{line.text}</span>}
          </div>
        ))}
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
          <span className="prompt">guest@cyvenom</span>:<span className="path">~</span>$&nbsp;
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--fg)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
