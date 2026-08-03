'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Record } from '../../content/personnel';

/**
 * Personnel browser, not a card grid.
 *
 * A roster on the left, one open file on the right. Selecting a name swaps the
 * record — which is why the portraits are studio references on neutral
 * backdrops rather than scene stills: a dossier has an ID photograph, and
 * holding that convention makes the difference in art register deliberate
 * instead of accidental.
 */
export default function DossierRoster({ records }: { records: Record[] }) {
  const [activeId, setActiveId] = useState(records[0].id);
  const active = records.find((r) => r.id === activeId) ?? records[0];

  return (
    <div className="dossier">
      {/* Roster */}
      <nav aria-label="Personnel roster" className="dossier-roster">
        <p className="eyebrow dossier-roster-head">Roster</p>
        <ul>
          {records.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                className="dossier-roster-item"
                data-active={r.id === activeId || undefined}
                aria-current={r.id === activeId ? 'true' : undefined}
                onClick={() => setActiveId(r.id)}
              >
                <span className="dossier-roster-index tabnum">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="dossier-roster-name">{r.name}</span>
                  <span className="dossier-roster-role">{r.designation}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Open file — keyed so a change animates in rather than swapping silently */}
      <article className="dossier-file" key={active.id}>
        <div className="dossier-plate">
          {active.portrait ? (
            <Image
              src={active.portrait}
              alt={active.name}
              fill
              sizes="(max-width: 900px) 92vw, 34vw"
              className="object-cover"
              style={{ objectPosition: active.pos ?? '50% 20%' }}
            />
          ) : (
            <div className="dossier-noimage">
              <span className="eyebrow">No imagery on file</span>
            </div>
          )}
          <span className="dossier-stamp" data-clearance={active.clearance}>
            {active.clearance === 'open' ? 'Cleared' : active.clearance === 'restricted' ? 'Restricted' : 'Redacted'}
          </span>
        </div>

        <div className="dossier-body">
          <h3 className="dossier-name font-display">{active.name}</h3>
          <p className="eyebrow dossier-designation">{active.designation}</p>

          <dl className="dossier-meta">
            {active.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {active.bio.map((p, i) => (
            <p key={i} className="dossier-para">
              {p}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
