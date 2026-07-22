import { useState } from 'react';
import { marked } from 'marked';
import { writeups } from '../data/writeups.js';

export default function Writeups() {
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <section id="writeups">
      <div className="section-title">writeups</div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {writeups.map((post) => {
          const isOpen = openSlug === post.slug;
          return (
            <div
              key={post.slug}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenSlug(isOpen ? null : post.slug)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: 'var(--accent)' }}>{post.title}</span>
                <span className="muted" style={{ fontSize: '0.8rem' }}>{post.date}</span>
              </div>
              <div className="muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {post.tags.join(', ')}
              </div>
              {isOpen && (
                <div
                  className="writeup-body"
                  style={{ marginTop: '0.75rem', borderTop: '1px dashed var(--border)', paddingTop: '0.75rem' }}
                  dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
