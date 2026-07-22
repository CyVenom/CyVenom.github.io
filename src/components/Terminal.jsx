import { useEffect, useRef, useState } from 'react';

const HELP = [
  'available commands:',
  '  whoami       - who is this guy',
  '  skills       - tech stack & tools',
  '  neofetch     - system info, hacker style',
  '  projects     - jump to projects section',
  '  writeups     - jump to writeups section',
  '  stats        - jump to github stats section',
  '  contact      - jump to contact section',
  '  socials      - links to github / other profiles',
  '  resume       - link to resume',
  '  ctf          - CTF / bug bounty status',
  '  ls           - list sections on this page',
  '  date         - current date/time',
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
    case 'neofetch':
      return [
        `${username}@github`,
        '-----------------',
        'OS       : Kali Linux, CachyOS, Ubuntu (Arch on the way)',
        'Shell    : bash / zsh',
        'Editor   : whatever ships bugs faster',
        'Uptime   : since 2021 (created_at on github)',
        'Langs    : Java, Python, C++, Bash, JavaScript',
        'Theme    : green-on-black, obviously',
      ];
    case 'projects':
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return ['scrolling to projects...'];
    case 'writeups':
      document.getElementById('writeups')?.scrollIntoView({ behavior: 'smooth' });
      return ['scrolling to writeups...'];
    case 'stats':
      document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
      return ['scrolling to github stats...'];
    case 'contact':
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return ['scrolling to contact...'];
    case 'socials':
    case 'social':
      return [`github   : https://github.com/${username}`];
    case 'resume':
      return ['resume: coming soon.'];
    case 'ctf':
      return ['currently grinding CTFs and bug bounty recon.', "writeups land in the 'writeups' section as they're published."];
    case 'ls':
      return ['projects/', 'writeups/', 'stats/', 'contact/'];
    case 'date':
      return [new Date().toString()];
    case 'clear':
      return null;
    case 'sudo rm -rf /':
      return ["nice try. this isn't your machine."];
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
        <pre
          style={{
            color: 'var(--accent)',
            fontSize: 'clamp(0.35rem, 1.5vw, 0.7rem)',
            lineHeight: 1.15,
            margin: 0,
            overflowX: 'auto',
            textShadow: '0 0 12px rgba(57, 255, 136, 0.35)',
          }}
        >
{String.raw` _________        ___.
\_   ___ \___.__.\_ |__   ______________  __ ____   ____   ____   _____
/    \  \<   |  | | __ \_/ __ \_  __ \  \/ // __ \ /    \ /  _ \ /     \
\     \___\___  | | \_\ \  ___/|  | \/\   /\  ___/|   |  (  <_> )  Y Y  \
 \______  / ____| |___  /\___  >__|    \_/  \___  >___|  /\____/|__|_|  /
        \/\/          \/     \/                 \/     \/             \/ `}
        </pre>
        <p style={{ marginTop: '0.6rem', fontSize: '1.1rem' }}>Welcome to My Site</p>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          cybersecurity student // bug hunter // {username}
        </p>
      </div>

      <div
        style={{
          border: '1px solid var(--border)',
          background: 'var(--card-bg)',
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
