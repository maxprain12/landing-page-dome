// Direction B — "Reading Room"
// Editorial. Quiet. Large serif display, product screen in focus.
// Expects globals from shared.jsx.

function LandingB({ lang = 'en', mascot = false }) {
  const S = STRINGS[lang];
  const B = S.b;

  return (
    <div style={{
      width: '100%',
      fontFamily: 'Inter, -apple-system, sans-serif',
      background: TOKENS.paperLight,
      color: TOKENS.ink,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, backgroundImage: paperGrainURL,
        mixBlendMode: 'multiply', opacity: 0.45, pointerEvents: 'none', zIndex: 1,
      }}/>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <NavB S={S}/>
        <HeroB B={B} S={S} mascot={mascot}/>
        <MastheadB B={B}/>
        <ProblemIdeaB B={B}/>
        <ProductShotB lang={lang} mascot={mascot}/>
        <FeaturesB S={S}/>
        <FlowB S={S}/>
        <AgentsShotB lang={lang} mascot={mascot}/>
        <MarketplaceB S={S} mascot={mascot}/>
        <QuoteB lang={lang}/>
        <UsesB S={S}/>
        <StackB S={S}/>
        <FinalB S={S} mascot={mascot}/>
        <FooterB S={S}/>
      </div>
    </div>
  );
}

function NavB({ S }) {
  return (
    <nav style={{
      borderBottom: `1px solid ${TOKENS.rule}`,
      padding: '18px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: TOKENS.paperLight,
    }}>
      <DomeMark size={20}/>
      <div style={{ display: 'flex', gap: 32, fontSize: 13, color: TOKENS.ink2, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
        <span>{S.nav.features}</span>
        <span>{S.nav.how}</span>
        <span>{S.nav.agents}</span>
        <span>{S.nav.docs}</span>
        <span>{S.nav.github}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 11, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1.5, color: TOKENS.ink3 }}>v2.1.4</span>
        <button style={{
          background: 'transparent', color: TOKENS.ink,
          border: `1px solid ${TOKENS.ink}`, padding: '8px 16px', fontSize: 12,
          fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1.5, textTransform: 'uppercase',
          cursor: 'pointer',
        }}>↓ {S.download}</button>
      </div>
    </nav>
  );
}

function HeroB({ B, S, mascot }) {
  return (
    <section style={{ position: 'relative', padding: '80px 48px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* top rule with date and issue */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${TOKENS.ink}`, paddingBottom: 14, marginBottom: 40, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: TOKENS.ink2 }}>
        <span>Vol. II · Issue 1 · {B.eyebrow}</span>
        <span>A quiet tool for long thinking</span>
        <span>Free · Open Source</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'start' }}>
        <div>
          <h1 style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 128, lineHeight: 0.92, letterSpacing: -3,
            margin: 0, fontWeight: 400, textWrap: 'balance',
          }}>
            {B.h1.split(' ').map((w, i, arr) => {
              // italicise the last word
              if (i === arr.length - 1) return <span key={i} style={{ fontStyle: 'italic', color: TOKENS.sageDark }}>{w}</span>;
              return <span key={i}>{w} </span>;
            })}
          </h1>
        </div>

        <div style={{ paddingTop: 24, borderLeft: `1px solid ${TOKENS.rule}`, paddingLeft: 32 }}>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 22,
            lineHeight: 1.35, color: TOKENS.ink2, fontStyle: 'italic',
            borderLeft: `3px solid ${TOKENS.sage}`, paddingLeft: 18, marginBottom: 28,
          }}>{B.sub}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <button style={{
              background: TOKENS.ink, color: TOKENS.paper,
              padding: '14px 24px', fontSize: 13, fontWeight: 500,
              border: 'none', cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 1.5, textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <AppleIconB/> macOS · Apple Silicon
            </button>
            <button style={{
              background: 'transparent', color: TOKENS.ink,
              border: `1px solid ${TOKENS.ink}`,
              padding: '14px 22px', fontSize: 13, fontWeight: 500,
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
            }}>Windows</button>
          </div>
          <div style={{ fontSize: 12, color: TOKENS.ink3, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1 }}>
            {B.tinyNote}
          </div>

          {/* key specs */}
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { k: 'Local', v: 'SQLite. Your data.' },
              { k: 'Private', v: 'No cloud needed.' },
              { k: 'Open', v: 'MIT-compatible.' },
            ].map(x => (
              <div key={x.k}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 2, color: TOKENS.rust, textTransform: 'uppercase' }}>{x.k}</div>
                <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 20, marginTop: 4, letterSpacing: -0.3 }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AppleIconB() {
  return <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
    <path d="M10.3 8.5c0-1.8 1.5-2.7 1.6-2.7-.9-1.3-2.2-1.5-2.7-1.5-1.2-.1-2.2.7-2.8.7-.6 0-1.5-.7-2.4-.6C2.7 4.4 1.6 5.1 1 6.2c-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6c1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1 0 0-1.9-.7-1.9-2.9zM8.5 3c.5-.6.9-1.5.7-2.4-.8 0-1.7.5-2.3 1.1-.5.5-.9 1.4-.7 2.3.9.1 1.8-.5 2.3-1z"/>
  </svg>;
}

function MastheadB({ B }) {
  const items = ['Think in one place', 'Cite every answer', 'Run it all locally', 'Bring your own model', 'PDFs · Slides · Audio · Web', 'Free and open source'];
  const arr = [...items, ...items];
  return (
    <section style={{
      borderTop: `1px solid ${TOKENS.ink}`,
      borderBottom: `1px solid ${TOKENS.ink}`,
      overflow: 'hidden', padding: '14px 0',
      background: TOKENS.ink, color: TOKENS.paperLight,
    }}>
      <div style={{
        display: 'flex', gap: 48, whiteSpace: 'nowrap',
        animation: 'marqueeB 50s linear infinite',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
      }}>
        {arr.map((x, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <span style={{ color: TOKENS.sage }}>◆</span> {x}
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeB { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

function ProblemIdeaB({ B }) {
  return (
    <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div style={{ borderRight: `1px solid ${TOKENS.rule}`, paddingRight: 48 }}>
          <Eyebrow>— {B.sectionLabel1}</Eyebrow>
          <h2 style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 54, lineHeight: 1.02,
            letterSpacing: -1.2, margin: '20px 0 24px', fontWeight: 400,
          }}>{B.problemH}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: TOKENS.ink2, maxWidth: 460 }}>{B.problemP}</p>
          <ScatterDiagram/>
        </div>
        <div>
          <Eyebrow>— {B.sectionLabel2}</Eyebrow>
          <h2 style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 54, lineHeight: 1.02,
            letterSpacing: -1.2, margin: '20px 0 24px', fontWeight: 400,
          }}>{B.ideaH}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: TOKENS.ink2, maxWidth: 460 }}>{B.ideaP}</p>
          <DomeDiagram/>
        </div>
      </div>
    </section>
  );
}

function ScatterDiagram() {
  const items = [
    { t: 'pdf', x: 20, y: 30 }, { t: 'note', x: 70, y: 15 }, { t: 'audio', x: 75, y: 60 },
    { t: 'link', x: 30, y: 70 }, { t: 'slide', x: 50, y: 45 }, { t: 'doc', x: 85, y: 30 },
    { t: 'jpg', x: 15, y: 55 },
  ];
  return (
    <div style={{ marginTop: 40, position: 'relative', height: 220, border: `1px dashed ${TOKENS.rule}` }}>
      {items.map((it, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${it.x}%`, top: `${it.y}%`,
          padding: '4px 10px', background: TOKENS.paper, border: `1px solid ${TOKENS.ink}`,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
          transform: `rotate(${(i * 37) % 10 - 5}deg)`,
        }}>.{it.t}</div>
      ))}
    </div>
  );
}

function DomeDiagram() {
  return (
    <div style={{ marginTop: 40, position: 'relative', height: 220, background: TOKENS.paper, border: `1px solid ${TOKENS.ink}` }}>
      <svg viewBox="0 0 400 220" width="100%" height="100%">
        <path d="M40 200 Q40 60 200 60 Q360 60 360 200" fill="none" stroke={TOKENS.ink} strokeWidth="1.5"/>
        <line x1="40" y1="200" x2="360" y2="200" stroke={TOKENS.ink} strokeWidth="1.5"/>
        {/* connected dots inside */}
        {[[120, 150], [200, 120], [280, 150], [160, 170], [240, 170]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={TOKENS.sageDeep}/>
          </g>
        ))}
        <g stroke={TOKENS.sageDeep} strokeWidth="1" opacity="0.6">
          <line x1="120" y1="150" x2="200" y2="120"/>
          <line x1="200" y1="120" x2="280" y2="150"/>
          <line x1="120" y1="150" x2="160" y2="170"/>
          <line x1="280" y1="150" x2="240" y2="170"/>
          <line x1="160" y1="170" x2="240" y2="170"/>
          <line x1="200" y1="120" x2="160" y2="170"/>
          <line x1="200" y1="120" x2="240" y2="170"/>
        </g>
        <circle cx="200" cy="60" r="4" fill={TOKENS.rust}/>
      </svg>
    </div>
  );
}

function ProductShotB({ lang, mascot }) {
  const L = lang === 'es'
    ? { caption: 'Fig. 01 · El espacio de trabajo de Dome con Many razonando sobre la biblioteca.' }
    : { caption: 'Fig. 01 · The Dome workspace with Many reasoning over the library.' };
  return (
    <section style={{
      background: TOKENS.paper, padding: '80px 48px 100px',
      borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}`,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        {mascot && (
          <div style={{ position: 'absolute', top: -48, right: 60, zIndex: 3, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              fontFamily: '"Caveat", cursive', fontSize: 22, color: TOKENS.ink3, maxWidth: 170,
              lineHeight: 1.15, textAlign: 'right',
            }}>{lang === 'es' ? 'mira mi biblioteca →' : 'look at my library →'}</div>
            <Many size={96} mood="glasses"/>
          </div>
        )}
        <Screen src="assets/screen-home.png" title="Dome · workspace"/>
        <div style={{ marginTop: 18, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 1, color: TOKENS.ink3, textAlign: 'center' }}>{L.caption}</div>
      </div>
    </section>
  );
}

function Tag({ children }) {
  return <span style={{
    fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
    padding: '3px 10px', background: TOKENS.paper, border: `1px solid ${TOKENS.rule}`,
    color: TOKENS.ink2,
  }}>{children}</span>;
}

function FeaturesB({ S }) {
  return (
    <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1px solid ${TOKENS.ink}`, paddingBottom: 24, marginBottom: 56 }}>
        <div>
          <Eyebrow>— {S.featuresLabel}</Eyebrow>
          <h2 style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 72, lineHeight: 0.98,
            letterSpacing: -1.8, margin: '14px 0 0', fontWeight: 400, maxWidth: 860,
          }}>{S.featuresH}</h2>
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, color: TOKENS.ink3, textTransform: 'uppercase' }}>
          06 chapters ↓
        </div>
      </div>

      {S.features.map((f, i) => (
        <div key={f.k} style={{
          display: 'grid', gridTemplateColumns: '80px 1fr 1.2fr 300px',
          gap: 24, padding: '32px 0', borderBottom: `1px solid ${TOKENS.rule}`, alignItems: 'start',
        }}>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 54, fontStyle: 'italic', color: TOKENS.sageDeep, lineHeight: 0.9 }}>{f.k}</div>
          <h3 style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 32, lineHeight: 1.02,
            fontWeight: 400, margin: 0, letterSpacing: -0.5,
          }}>{f.t}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: TOKENS.ink2, margin: 0 }}>{f.p}</p>
          <FeatureGlyphB i={i}/>
        </div>
      ))}
    </section>
  );
}

function FeatureGlyphB({ i }) {
  const w = 260, h = 120;
  const stroke = TOKENS.ink;
  if (i === 0) return (
    <svg width={w} height={h} viewBox="0 0 260 120">
      <rect x="10" y="30" width="240" height="60" fill={TOKENS.paper} stroke={stroke}/>
      <line x1="24" y1="50" x2="240" y2="50" stroke={stroke} strokeWidth="1"/>
      <line x1="24" y1="62" x2="200" y2="62" stroke={stroke} strokeWidth="1"/>
      <line x1="24" y1="74" x2="160" y2="74" stroke={stroke} strokeWidth="1"/>
      <circle cx="225" cy="92" r="10" fill={TOKENS.sage} stroke={stroke}/>
    </svg>
  );
  if (i === 1) return (
    <svg width={w} height={h} viewBox="0 0 260 120">
      {[30, 50, 70, 90].map((y, j) => (
        <g key={y}>
          <rect x="20" y={y - 6} width="100" height="10" fill={j === 1 ? TOKENS.sage : 'none'} stroke={stroke}/>
          <path d={`M124 ${y} L140 ${y - 5} L140 ${y + 5} Z`} fill={stroke}/>
          <rect x="144" y={y - 6} width="100" height="10" fill={j === 2 ? TOKENS.rust : 'none'} stroke={stroke}/>
        </g>
      ))}
    </svg>
  );
  if (i === 2) return (
    <svg width={w} height={h} viewBox="0 0 260 120">
      <rect x="20" y="20" width="70" height="80" fill={TOKENS.paper} stroke={stroke}/>
      <rect x="100" y="20" width="70" height="80" fill={TOKENS.sage} stroke={stroke}/>
      <rect x="180" y="20" width="60" height="80" fill="none" stroke={stroke}/>
      <text x="55" y="70" textAnchor="middle" fontFamily="Instrument Serif" fontSize="24" fontStyle="italic" fill={stroke}>map</text>
      <text x="135" y="70" textAnchor="middle" fontFamily="Instrument Serif" fontSize="24" fontStyle="italic" fill={stroke}>quiz</text>
      <text x="210" y="70" textAnchor="middle" fontFamily="Instrument Serif" fontSize="24" fontStyle="italic" fill={stroke}>deck</text>
    </svg>
  );
  if (i === 3) return (
    <svg width={w} height={h} viewBox="0 0 260 120">
      {[[30, 30], [110, 20], [190, 30], [70, 80], [150, 80], [220, 80]].map(([x, y], j) => (
        <g key={j}><rect x={x} y={y} width="40" height="24" fill={j % 2 === 0 ? TOKENS.paper : TOKENS.sage} stroke={stroke}/></g>
      ))}
      <g stroke={stroke} strokeWidth="1">
        <line x1="70" y1="42" x2="110" y2="32"/>
        <line x1="150" y1="32" x2="190" y2="42"/>
        <line x1="50" y1="54" x2="90" y2="80"/>
        <line x1="130" y1="44" x2="150" y2="80"/>
        <line x1="210" y1="54" x2="220" y2="80"/>
      </g>
    </svg>
  );
  if (i === 4) return (
    <svg width={w} height={h} viewBox="0 0 260 120">
      <rect x="20" y="12" width="220" height="96" fill="#fff" stroke={stroke}/>
      <text x="40" y="40" fontFamily="Instrument Serif" fontSize="22" fill={stroke}>Chapter 04</text>
      <line x1="40" y1="52" x2="220" y2="52" stroke={TOKENS.rule}/>
      <line x1="40" y1="64" x2="200" y2="64" stroke={TOKENS.rule}/>
      <line x1="40" y1="76" x2="180" y2="76" stroke={TOKENS.rule}/>
      <rect x="40" y="86" width="60" height="14" fill={TOKENS.sage}/>
    </svg>
  );
  return (
    <svg width={w} height={h} viewBox="0 0 260 120">
      {['openai', 'claude', 'gemini', 'ollama', 'venice'].map((m, j) => (
        <g key={m}>
          <rect x={20 + j * 44} y="40" width="40" height="40" fill={j === 3 ? TOKENS.sage : 'none'} stroke={stroke}/>
          <text x={40 + j * 44} y="92" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill={stroke} letterSpacing="1">{m.toUpperCase()}</text>
        </g>
      ))}
    </svg>
  );
}

function FlowB({ S }) {
  return (
    <section style={{ background: TOKENS.paper, padding: '120px 48px', borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Eyebrow style={{ marginBottom: 14 }}>— {S.flowLabel}</Eyebrow>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif', fontSize: 72, lineHeight: 0.98,
          letterSpacing: -1.8, margin: 0, fontWeight: 400, maxWidth: 900,
        }}>{S.flowH}</h2>

        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${TOKENS.ink}` }}>
          {S.flow.map((step, i) => (
            <div key={step.n} style={{
              borderRight: i !== 3 ? `1px solid ${TOKENS.rule}` : 'none',
              padding: '32px 24px 24px 24px', paddingLeft: i === 0 ? 0 : 24,
              position: 'relative', minHeight: 200,
            }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: TOKENS.rust, letterSpacing: 2, textTransform: 'uppercase' }}>Step {step.n}</div>
              <h3 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32, fontWeight: 400, margin: '10px 0 12px', lineHeight: 1.05 }}>{step.t}</h3>
              <p style={{ fontSize: 15, color: TOKENS.ink2, lineHeight: 1.55, margin: 0 }}>{step.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteB({ lang }) {
  const Q = lang === 'es'
    ? { q: 'La biblioteca que te lees sola vale más que una docena de apps abiertas a medio leer.', a: 'Reseña de lectura · 2026' }
    : { q: 'A library that reads itself is worth more than a dozen half-open apps.', a: 'A reader\'s note · 2026' };
  return (
    <section style={{ padding: '120px 48px', textAlign: 'center' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontSize: 42, color: TOKENS.sageDeep, fontFamily: '"Instrument Serif", serif', lineHeight: 1 }}>"</div>
        <p style={{
          fontFamily: '"Instrument Serif", serif', fontSize: 48, lineHeight: 1.12,
          letterSpacing: -0.8, fontStyle: 'italic', color: TOKENS.ink, margin: '8px 0 28px', fontWeight: 400, textWrap: 'balance',
        }}>{Q.q}</p>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: TOKENS.ink3 }}>— {Q.a}</div>
      </div>
    </section>
  );
}

function UsesB({ S }) {
  return (
    <section style={{ background: TOKENS.paperDeep, padding: '120px 48px', borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Eyebrow style={{ marginBottom: 16 }}>— {S.useLabel}</Eyebrow>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif', fontSize: 72, lineHeight: 0.98,
          letterSpacing: -1.8, margin: 0, fontWeight: 400, maxWidth: 800,
        }}>{S.useH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, marginTop: 48, borderTop: `1px solid ${TOKENS.ink}` }}>
          {S.uses.map((u, i) => (
            <div key={u.t} style={{
              padding: '36px 32px 36px 0',
              paddingLeft: i % 2 === 1 ? 32 : 0,
              borderRight: i % 2 === 0 ? `1px solid ${TOKENS.rule}` : 'none',
              borderBottom: i < 2 ? `1px solid ${TOKENS.rule}` : 'none',
              display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20,
            }}>
              <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 40, fontStyle: 'italic', color: TOKENS.rust, lineHeight: 0.9 }}>0{i + 1}</div>
              <div>
                <h3 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32, margin: 0, fontWeight: 400, lineHeight: 1.05 }}>{u.t}</h3>
                <p style={{ fontSize: 15, color: TOKENS.ink2, lineHeight: 1.55, marginTop: 12 }}>{u.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackB({ S }) {
  return (
    <section style={{ padding: '90px 48px', background: TOKENS.ink, color: TOKENS.paperLight }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, color: TOKENS.sage, textTransform: 'uppercase' }}>— {S.stackLabel}</div>
            <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 48, lineHeight: 1, letterSpacing: -1, margin: '14px 0 0', fontWeight: 400, maxWidth: 780 }}>{S.stackH}</h2>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, color: 'rgba(243,236,219,0.5)', textTransform: 'uppercase' }}>
            colophon
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid rgba(243,236,219,0.2)` }}>
          {S.stack.map((x, i) => (
            <div key={x} style={{
              padding: '20px 16px 20px 0',
              paddingLeft: i % 4 === 0 ? 0 : 16,
              borderRight: (i % 4) !== 3 ? `1px solid rgba(243,236,219,0.12)` : 'none',
              borderBottom: i < 4 ? `1px solid rgba(243,236,219,0.12)` : 'none',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 13, letterSpacing: 1,
              color: 'rgba(243,236,219,0.9)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ color: TOKENS.sage }}>◆</span>{x}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalB({ S, mascot }) {
  return (
    <section style={{ background: TOKENS.sageDark, color: TOKENS.paperLight, padding: '140px 48px', textAlign: 'center', position: 'relative' }}>
      <Eyebrow style={{ marginBottom: 20, color: TOKENS.sage }}>— Install</Eyebrow>
      <h2 style={{
        fontFamily: '"Instrument Serif", serif',
        fontSize: 112, lineHeight: 0.92, letterSpacing: -2.5,
        margin: '0 auto 20px', fontWeight: 400, maxWidth: 1100, textWrap: 'balance',
      }}>{S.finalH}</h2>
      <p style={{ fontSize: 18, color: 'rgba(243,236,219,0.8)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.5 }}>{S.finalP}</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <button style={{
          background: TOKENS.paperLight, color: TOKENS.ink,
          padding: '18px 32px', fontSize: 13, fontWeight: 600,
          border: 'none', cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: 1.5, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <AppleIconB/> macOS · Apple Silicon · 84 MB
        </button>
        <button style={{
          background: 'transparent', color: TOKENS.paperLight,
          border: `1.5px solid ${TOKENS.paperLight}`,
          padding: '16px 28px', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>Windows · 96 MB</button>
      </div>
      <div style={{ marginTop: 48, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, color: 'rgba(243,236,219,0.5)', textTransform: 'uppercase' }}>
        v2.1.4 · Released April 2026 · ⌘ Custom OSS License
      </div>
    </section>
  );
}

function FooterB({ S }) {
  return (
    <footer style={{ background: TOKENS.paperLight, padding: '56px 48px 32px', borderTop: `1px solid ${TOKENS.rule}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 32 }}>
          <div>
            <DomeMark size={22}/>
            <p style={{ marginTop: 14, fontSize: 13, color: TOKENS.ink3, maxWidth: 340, lineHeight: 1.55 }}>{S.footer.tag}</p>
          </div>
          {S.footer.cols.map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: TOKENS.ink3, marginBottom: 12 }}>{col.h}</div>
              {col.links.map(l => <div key={l} style={{ fontSize: 13, color: TOKENS.ink2, marginBottom: 8 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <Rule/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 11, color: TOKENS.ink3, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
          <span>© 2026 Dome</span>
          <span>alder.velasquezobando@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}

function AgentsShotB({ lang, mascot }) {
  const L = lang === 'es'
    ? { label: 'Agentes', h: 'Un equipo de agentes, entrenados sobre tu biblioteca.', cap: 'Fig. 02 · La biblioteca de agentes y los runs recientes.' }
    : { label: 'Agents', h: 'A team of agents, trained on your own library.', cap: 'Fig. 02 · The agent library and recent runs.' };
  return (
    <section style={{ padding: '120px 48px', borderTop: `1px solid ${TOKENS.rule}`, background: TOKENS.paperLight }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Eyebrow>— {L.label}</Eyebrow>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 54, lineHeight: 1.02,
              letterSpacing: -1, margin: '16px 0 0', fontWeight: 400,
            }}>{L.h}</h2>
            {mascot && <div style={{ marginTop: 24 }}><Many size={80} mood="think"/></div>}
          </div>
          <Screen src="assets/screen-agents.png" title="Dome · Agents"/>
        </div>
        <div style={{ marginTop: 18, textAlign: 'right', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 1, color: TOKENS.ink3 }}>{L.cap}</div>
      </div>
    </section>
  );
}

function MarketplaceB({ S, mascot }) {
  return (
    <section style={{
      background: TOKENS.paperDeep, padding: '120px 48px',
      borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}`,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1px solid ${TOKENS.ink}`, paddingBottom: 20, marginBottom: 40 }}>
          <div>
            <Eyebrow>— {S.marketLabel}</Eyebrow>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 60, lineHeight: 1,
              letterSpacing: -1.2, margin: '14px 0 0', fontWeight: 400, maxWidth: 860,
            }}>{S.marketH}</h2>
          </div>
          <div style={{ maxWidth: 320, fontSize: 14, color: TOKENS.ink2, lineHeight: 1.5 }}>{S.marketP}</div>
        </div>
        <Screen src="assets/screen-marketplace.png" title="Dome · Marketplace"/>
      </div>
    </section>
  );
}

Object.assign(window, { LandingB });
