// Direction A — "Study Nook"
// Mascot-forward, warm paper. Uses the real Many character and real product screenshots.

function LandingA({ lang = 'en', mascot = true }) {
  const S = STRINGS[lang];
  const A = S.a;
  return (
    <div style={{
      width: '100%',
      fontFamily: 'Inter, -apple-system, sans-serif',
      background: TOKENS.paper,
      color: TOKENS.ink,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, backgroundImage: paperGrainURL,
        mixBlendMode: 'multiply', opacity: 0.55, pointerEvents: 'none', zIndex: 1,
      }}/>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <NavA S={S}/>
        <HeroA A={A} S={S} mascot={mascot}/>
        <MarqueeA A={A}/>
        <ProductShotA lang={lang}/>
        <ManyShowcaseA A={A} mascot={mascot} lang={lang}/>
        <FeaturesA S={S} mascot={mascot}/>
        <FlowA S={S} mascot={mascot}/>
        <MarketplaceA S={S} mascot={mascot}/>
        <StudioBandA lang={lang}/>
        <UsesA S={S}/>
        <StackA S={S}/>
        <FinalCTAa S={S} mascot={mascot}/>
        <FooterA S={S}/>
      </div>
    </div>
  );
}

// ── NAV ──────────────────────────────────────────────────────
function NavA({ S }) {
  return (
    <nav style={{
      maxWidth: 1240, margin: '0 auto', padding: '28px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <DomeMark size={20}/>
      <div style={{ display: 'flex', gap: 32, fontSize: 14, color: TOKENS.ink2 }}>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>{S.nav.features}</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>{S.nav.how}</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>{S.nav.agents}</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>{S.nav.docs}</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>{S.nav.github}</a>
      </div>
      <button style={{
        background: TOKENS.ink, color: TOKENS.paper,
        padding: '10px 18px', fontSize: 13, fontWeight: 500,
        border: 'none', borderRadius: 999, cursor: 'pointer',
        fontFamily: 'inherit',
      }}>↓ {S.download}</button>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function HeroA({ A, S, mascot }) {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 48px 80px', position: 'relative' }}>
      <Spark size={22} color={TOKENS.sageDeep} style={{ position: 'absolute', top: 20, left: 120 }}/>
      <Spark size={14} color={TOKENS.rust} style={{ position: 'absolute', top: 80, right: 220 }}/>
      <Spark size={18} color={TOKENS.sageDeep} style={{ position: 'absolute', top: 300, left: 60 }}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 60, alignItems: 'center' }}>
        <div>
          <Eyebrow style={{ marginBottom: 24 }}>— {A.eyebrow}</Eyebrow>
          <h1 style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 108, lineHeight: 0.94, letterSpacing: -2.2,
            margin: 0, fontWeight: 400, textWrap: 'balance',
          }}>
            {A.h1a}<br/>
            <span style={{ fontStyle: 'italic', color: TOKENS.sageDark, position: 'relative' }}>
              {A.h1b}
              <svg viewBox="0 0 400 20" style={{
                position: 'absolute', left: 0, bottom: -4, width: '100%', height: 16,
              }}>
                <path d="M4 14 Q 80 4, 160 10 T 396 8" fill="none" stroke={TOKENS.sage} strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p style={{
            fontSize: 19, lineHeight: 1.55, color: TOKENS.ink2,
            maxWidth: 560, marginTop: 32, fontFamily: 'Inter, sans-serif',
          }}>{A.sub}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36 }}>
            <button style={{
              background: TOKENS.ink, color: TOKENS.paper,
              padding: '16px 26px', fontSize: 15, fontWeight: 500,
              border: 'none', borderRadius: 999, cursor: 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <AppleIcon/>{A.primary}
            </button>
            <div style={{ fontSize: 13, color: TOKENS.ink3 }}>
              <div>{A.secondary}</div>
              <div style={{ fontSize: 11, marginTop: 2 }}>{A.tinyNote}</div>
            </div>
          </div>

          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: TOKENS.ink3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <GhIcon/>
              <span><b style={{ color: TOKENS.ink }}>2.4k</b> ★ on GitHub</span>
            </div>
            <span>·</span>
            <span>Built by <b style={{ color: TOKENS.ink }}>@maxprain12</b></span>
          </div>
        </div>

        {/* right — mascot scene */}
        <HeroSceneA mascot={mascot}/>
      </div>
    </section>
  );
}

function AppleIcon() {
  return <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
    <path d="M10.3 8.5c0-1.8 1.5-2.7 1.6-2.7-.9-1.3-2.2-1.5-2.7-1.5-1.2-.1-2.2.7-2.8.7-.6 0-1.5-.7-2.4-.6C2.7 4.4 1.6 5.1 1 6.2c-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6c1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1 0 0-1.9-.7-1.9-2.9zM8.5 3c.5-.6.9-1.5.7-2.4-.8 0-1.7.5-2.3 1.1-.5.5-.9 1.4-.7 2.3.9.1 1.8-.5 2.3-1z"/>
  </svg>;
}

function GhIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
}

function HeroSceneA({ mascot }) {
  return (
    <div style={{ position: 'relative', height: 520 }}>
      {/* back book stack */}
      <BookSpine top={40} right={120} color={TOKENS.sageDeep} title="METHOD" rotate={-3}/>
      <BookSpine top={60} right={60} color={TOKENS.rust} title="NOTES" rotate={4}/>
      <BookSpine top={78} right={180} color={TOKENS.ink} title="ARCHIVE" rotate={-8}/>

      {/* paper stack */}
      <div style={{
        position: 'absolute', top: 130, right: 20, width: 300,
        background: TOKENS.paperLight, border: `1px solid ${TOKENS.rule}`,
        borderRadius: 4, padding: 18,
        boxShadow: '0 12px 32px rgba(48,38,20,0.14), 0 2px 4px rgba(0,0,0,0.05)',
        transform: 'rotate(-2deg)',
      }}>
        <Eyebrow>Paper · 2024</Eyebrow>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 23, lineHeight: 1.1, marginTop: 8, marginBottom: 12 }}>
          On the emergence of habits in long research projects.
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            height: 3, marginTop: 5, borderRadius: 2,
            background: TOKENS.rule,
            width: `${[95, 78, 92, 60, 85, 40][i]}%`
          }}/>
        ))}
        <div style={{
          position: 'absolute', top: -8, right: 14,
          background: TOKENS.sage, color: TOKENS.sageDark, padding: '3px 10px',
          fontSize: 10, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1.5,
          textTransform: 'uppercase', borderRadius: 2, fontWeight: 500,
        }}>✦ Indexed</div>
      </div>

      {/* post-it */}
      <div style={{
        position: 'absolute', top: 360, right: 240, width: 150, padding: 14,
        background: '#F7D76B', fontFamily: '"Caveat", cursive', fontSize: 20,
        color: TOKENS.ink, lineHeight: 1.15,
        transform: 'rotate(6deg)',
        boxShadow: '0 6px 16px rgba(48,38,20,0.18)',
      }}>
        ask Many to summarise <u>ch. 4</u> by friday
      </div>

      {mascot ? (
        <div style={{ position: 'absolute', bottom: -20, left: -10 }}>
          <Many size={200} mood="glasses"/>
          <div style={{
            fontFamily: '"Caveat", cursive', fontSize: 24, color: TOKENS.ink2,
            marginTop: -6, marginLeft: 60, transform: 'rotate(-4deg)',
            whiteSpace: 'nowrap',
          }}>
            ← hi, I'm Many
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute', bottom: 20, left: 20,
          width: 180, height: 180, borderRadius: '50%',
          border: `2px solid ${TOKENS.ink}`,
          background: TOKENS.manyBody,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Instrument Serif", serif', fontSize: 44, fontStyle: 'italic',
          color: TOKENS.sageDark,
        }}>dome</div>
      )}
    </div>
  );
}

function BookSpine({ top, right, color, title, rotate = 0 }) {
  return (
    <div style={{
      position: 'absolute', top, right,
      width: 60, height: 190,
      background: color, color: TOKENS.paper,
      transform: `rotate(${rotate}deg)`,
      fontFamily: '"Instrument Serif", serif',
      fontSize: 18, padding: '20px 0',
      borderRadius: '2px 2px 4px 4px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15), inset -3px 0 0 rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      letterSpacing: 4, textTransform: 'uppercase',
      writingMode: 'vertical-rl',
    }}>{title}</div>
  );
}

// ── MARQUEE ──────────────────────────────────────────────────
function MarqueeA({ A }) {
  const items = [...A.marquee, ...A.marquee];
  return (
    <section style={{
      borderTop: `1px solid ${TOKENS.rule}`,
      borderBottom: `1px solid ${TOKENS.rule}`,
      overflow: 'hidden',
      padding: '22px 0',
      background: TOKENS.paperDeep,
    }}>
      <div style={{
        display: 'flex', gap: 48, whiteSpace: 'nowrap',
        animation: 'marqueeA 50s linear infinite',
      }}>
        {items.map((x, i) => (
          <span key={i} style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 30,
            fontStyle: 'italic', color: TOKENS.ink2,
            display: 'flex', alignItems: 'center', gap: 48,
          }}>
            {x}
            <span style={{ color: TOKENS.sageDeep }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeA { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

// ── PRODUCT SHOT ─────────────────────────────────────────────
function ProductShotA({ lang }) {
  const L = lang === 'es'
    ? { cap: 'Fig. 01 — El espacio de trabajo de Dome, con Many razonando sobre tu biblioteca.' }
    : { cap: 'Fig. 01 — The Dome workspace, with Many reasoning over your library.' };
  return (
    <section style={{ padding: '80px 48px 40px', position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        {/* floating sticker on screenshot */}
        <div style={{
          position: 'absolute', top: -20, left: -10, zIndex: 3,
          transform: 'rotate(-6deg)',
          background: TOKENS.rust, color: TOKENS.paper, padding: '8px 14px',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
          boxShadow: '0 6px 18px rgba(138,62,26,0.35)',
        }}>
          ✦ Your dome, every morning
        </div>
        <Screen src="assets/screen-home.png" title="Dome · Home"/>
        <div style={{ marginTop: 18, textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 1.5, color: TOKENS.ink3 }}>
          {L.cap}
        </div>
      </div>
    </section>
  );
}

// ── MANY SHOWCASE ────────────────────────────────────────────
function ManyShowcaseA({ A, mascot, lang }) {
  const L = lang === 'es'
    ? { quoteA: '"He leído 1,204 páginas por ti. Pregúntame lo que quieras."' }
    : { quoteA: '"I\'ve read 1,204 pages for you. Ask me anything."' };
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '120px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72, alignItems: 'center' }}>
        <div>
          <Eyebrow style={{ marginBottom: 20 }}>— {A.pill}</Eyebrow>
          <h2 style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 60, lineHeight: 1.02, letterSpacing: -1.2,
            margin: 0, fontWeight: 400,
          }}>{A.manyCardTitle}</h2>
          <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.6, color: TOKENS.ink2, maxWidth: 500 }}>
            {A.manyCardBody}
          </p>
          {mascot && (
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 20 }}>
              <Many size={96} mood="think"/>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: TOKENS.ink3, maxWidth: 260, lineHeight: 1.2 }}>
                {L.quoteA}
              </div>
            </div>
          )}
        </div>
        <Screen src="assets/screen-many.png" title="Dome · Many"/>
      </div>
    </section>
  );
}

// ── FEATURES ─────────────────────────────────────────────────
function FeaturesA({ S, mascot }) {
  return (
    <section style={{
      background: TOKENS.paperDeep, padding: '120px 0',
      borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}`,
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
          <div>
            <Eyebrow style={{ marginBottom: 16 }}>— {S.featuresLabel}</Eyebrow>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: 64, lineHeight: 1, letterSpacing: -1.5,
              margin: 0, maxWidth: 820, fontWeight: 400, textWrap: 'balance',
            }}>{S.featuresH}</h2>
          </div>
          {mascot && <Many size={80} mood="think"/>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${TOKENS.rule}`, background: TOKENS.paperLight }}>
          {S.features.map((f, i) => (
            <div key={f.k} style={{
              padding: 32,
              borderRight: i % 3 !== 2 ? `1px solid ${TOKENS.rule}` : 'none',
              borderBottom: i < 3 ? `1px solid ${TOKENS.rule}` : 'none',
              background: i === 0 ? TOKENS.sage : 'transparent',
              minHeight: 280,
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                color: i === 0 ? TOKENS.sageDark : TOKENS.ink3, letterSpacing: 2,
              }}>FIG. {f.k}</div>
              <h3 style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: 30, lineHeight: 1.05, margin: '12px 0 12px',
                fontWeight: 400, color: TOKENS.ink, letterSpacing: -0.3,
              }}>{f.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: TOKENS.ink2, margin: 0 }}>{f.p}</p>
              <FeatureGlyphA i={i}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGlyphA({ i }) {
  const stroke = TOKENS.ink, w = 70, h = 54;
  if (i === 0) return (
    <svg width={w} height={h} viewBox="0 0 70 54" style={{ marginTop: 22 }}>
      <path d="M12 42 C12 22 22 12 35 12 C48 12 58 22 58 42 L58 48 L12 48 Z" fill="none" stroke={stroke} strokeWidth="1.8"/>
      <circle cx="28" cy="32" r="2.5" fill={stroke}/><circle cx="42" cy="32" r="2.5" fill={stroke}/>
      <path d="M27 42 Q35 46 43 42" fill="none" stroke={stroke} strokeWidth="1.5"/>
    </svg>
  );
  if (i === 1) return (
    <svg width={w} height={h} viewBox="0 0 70 54" style={{ marginTop: 22 }}>
      {[0, 1, 2, 3].map((y) => <line key={y} x1="8" x2="62" y1={12 + y * 9} y2={12 + y * 9} stroke={stroke} strokeWidth="1"/>)}
      <rect x="26" y="16" width="18" height="24" fill="none" stroke={TOKENS.rust} strokeWidth="2"/>
      <text x="35" y="33" fontFamily="Instrument Serif" fontSize="14" textAnchor="middle" fontStyle="italic" fill={TOKENS.rust}>p.87</text>
    </svg>
  );
  if (i === 2) return (
    <svg width={w} height={h} viewBox="0 0 70 54" style={{ marginTop: 22 }}>
      <rect x="6" y="10" width="18" height="14" fill={TOKENS.sage} stroke={stroke}/>
      <rect x="28" y="18" width="18" height="14" fill="none" stroke={stroke}/>
      <rect x="50" y="28" width="14" height="14" fill={TOKENS.rust} stroke={stroke}/>
      <text x="15" y="22" fontFamily="Instrument Serif" fontSize="10" textAnchor="middle" fill={stroke}>map</text>
      <text x="37" y="30" fontFamily="Instrument Serif" fontSize="10" textAnchor="middle" fill={stroke}>quiz</text>
      <text x="57" y="40" fontFamily="Instrument Serif" fontSize="10" textAnchor="middle" fill="#fff">deck</text>
    </svg>
  );
  if (i === 3) return (
    <svg width={w} height={h} viewBox="0 0 70 54" style={{ marginTop: 22 }}>
      {[[10, 14], [35, 8], [58, 14], [22, 40], [48, 40]].map(([x, y], j) => <rect key={j} x={x - 6} y={y - 4} width="12" height="8" fill={j === 1 ? TOKENS.sage : 'none'} stroke={stroke}/>)}
      <g stroke={stroke} strokeWidth="1">
        <line x1="16" y1="14" x2="29" y2="8"/>
        <line x1="41" y1="8" x2="52" y2="14"/>
        <line x1="16" y1="14" x2="22" y2="36"/>
        <line x1="52" y1="14" x2="48" y2="36"/>
        <line x1="22" y1="40" x2="48" y2="40"/>
      </g>
    </svg>
  );
  if (i === 4) return (
    <svg width={w} height={h} viewBox="0 0 70 54" style={{ marginTop: 22 }}>
      <rect x="6" y="6" width="58" height="42" fill="#fff" stroke={stroke}/>
      <text x="12" y="20" fontFamily="Instrument Serif" fontSize="11" fill={stroke}>Chapter 04</text>
      <line x1="12" y1="26" x2="58" y2="26" stroke={TOKENS.rule}/>
      <line x1="12" y1="32" x2="50" y2="32" stroke={TOKENS.rule}/>
      <line x1="12" y1="38" x2="44" y2="38" stroke={TOKENS.rule}/>
      <rect x="12" y="41" width="16" height="4" fill={TOKENS.sage}/>
    </svg>
  );
  return (
    <svg width={w} height={h} viewBox="0 0 70 54" style={{ marginTop: 22 }}>
      {['GPT', 'CLA', 'GEM', 'OLL', 'MNX'].map((m, j) => (
        <g key={m}>
          <rect x={4 + j * 13} y="14" width="11" height="26" fill={j === 3 ? TOKENS.sage : 'none'} stroke={stroke}/>
          <text x={9.5 + j * 13} y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill={stroke} letterSpacing="0.5">{m}</text>
        </g>
      ))}
    </svg>
  );
}

// ── FLOW ─────────────────────────────────────────────────────
function FlowA({ S, mascot }) {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '120px 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <Eyebrow>— {S.flowLabel}</Eyebrow>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 64, lineHeight: 1, letterSpacing: -1.5,
          margin: '16px auto 0', fontWeight: 400, maxWidth: 780,
        }}>{S.flowH}</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
        <svg style={{ position: 'absolute', top: 28, left: 60, right: 60, width: 'calc(100% - 120px)', height: 8, zIndex: 0 }} preserveAspectRatio="none" viewBox="0 0 1000 8">
          <line x1="0" y1="4" x2="1000" y2="4" stroke={TOKENS.rule} strokeWidth="2" strokeDasharray="4 6"/>
        </svg>
        {S.flow.map((step, i) => (
          <div key={step.n} style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 999,
              background: [TOKENS.sage, TOKENS.rust, TOKENS.ink, TOKENS.sageDeep][i],
              color: [TOKENS.ink, TOKENS.paper, TOKENS.paper, TOKENS.paper][i],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Instrument Serif", serif', fontSize: 22,
              border: `2px solid ${TOKENS.paper}`, margin: '0 auto',
              boxShadow: '0 4px 12px rgba(48,38,20,0.12)',
            }}>{step.n}</div>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <h3 style={{
                fontFamily: '"Instrument Serif", serif', fontSize: 26, fontWeight: 400,
                margin: 0, lineHeight: 1.1,
              }}>{step.t}</h3>
              <p style={{ fontSize: 14, color: TOKENS.ink2, lineHeight: 1.5, marginTop: 10 }}>{step.p}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── MARKETPLACE ──────────────────────────────────────────────
function MarketplaceA({ S, mascot }) {
  return (
    <section style={{
      background: TOKENS.paperLight,
      borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}`,
      padding: '100px 0',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Eyebrow style={{ marginBottom: 16 }}>— {S.marketLabel}</Eyebrow>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 54, lineHeight: 1, letterSpacing: -1,
              margin: 0, fontWeight: 400,
            }}>{S.marketH}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: TOKENS.ink2, marginTop: 20, maxWidth: 420 }}>{S.marketP}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {S.agentsSample.map((a, i) => (
              <div key={a.n} style={{
                background: TOKENS.paper, border: `1px solid ${TOKENS.rule}`,
                padding: '14px 14px', borderRadius: 6,
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44, background: TOKENS.manyBody,
                  borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${TOKENS.sageDeep}`,
                }}>
                  {mascot ? <Many size={32} mood={['glasses', 'think', 'wave'][i % 3]}/> : <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, color: TOKENS.sageDeep }}>{a.n[0]}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: TOKENS.ink, letterSpacing: -0.2 }}>{a.n}</div>
                    <span style={{ fontSize: 10, color: TOKENS.rust }}>★</span>
                  </div>
                  <div style={{ fontSize: 12, color: TOKENS.ink3, lineHeight: 1.45, marginTop: 2 }}>{a.d}</div>
                </div>
                <button style={{
                  background: TOKENS.ink, color: TOKENS.paper, border: 'none',
                  padding: '6px 12px', fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0, alignSelf: 'flex-start',
                }}>+ Install</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STUDIO BAND (dark sage, with slides screenshot) ──────────
function StudioBandA({ lang }) {
  const L = lang === 'es'
    ? { label: 'Studio', sub: 'Tu biblioteca, convertida en material de estudio citado.', items: ['Mapa mental', 'Quiz', 'Línea de tiempo', 'Flashcards SM-2', 'Guía de estudio', 'FAQ'] }
    : { label: 'Studio', sub: 'Your library, turned into cited study material.', items: ['Mindmap', 'Quiz', 'Timeline', 'Flashcards · SM-2', 'Study guide', 'FAQ'] };
  return (
    <section style={{ background: TOKENS.sageDark, color: TOKENS.paper, padding: '100px 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7 }}>— {L.label}</div>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: 56, lineHeight: 1, letterSpacing: -1, margin: '16px 0 0', fontWeight: 400, maxWidth: 640,
            }}>{L.sub}</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {L.items.map((t, i) => (
            <div key={t} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: 24, minHeight: 120, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 26, margin: 0, fontWeight: 400 }}>{t}</h3>
              <StudioGlyph i={i}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioGlyph({ i }) {
  const c = TOKENS.sage, c2 = TOKENS.paper;
  if (i === 0) return (
    <svg width="60" height="40" viewBox="0 0 60 40">
      {[[15, 12], [30, 6], [45, 12], [22, 30], [38, 30]].map(([x, y], j) => <circle key={j} cx={x} cy={y} r="3" fill={c}/>)}
      <g stroke={c2} strokeWidth="1" opacity="0.7">
        <line x1="15" y1="12" x2="30" y2="6"/><line x1="30" y1="6" x2="45" y2="12"/>
        <line x1="15" y1="12" x2="22" y2="30"/><line x1="45" y1="12" x2="38" y2="30"/>
        <line x1="22" y1="30" x2="38" y2="30"/>
      </g>
    </svg>
  );
  if (i === 1) return <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 42, fontStyle: 'italic', color: c, lineHeight: 1 }}>?</div>;
  if (i === 2) return (
    <svg width="90" height="24" viewBox="0 0 90 24">
      <line x1="0" y1="12" x2="90" y2="12" stroke={c2} strokeWidth="1"/>
      {[12, 36, 60, 84].map(x => <circle key={x} cx={x} cy="12" r="3" fill={c}/>)}
    </svg>
  );
  if (i === 3) return (
    <svg width="56" height="40" viewBox="0 0 56 40">
      <rect x="4" y="6" width="34" height="24" fill="none" stroke={c2} strokeWidth="1" transform="rotate(-5 21 18)"/>
      <rect x="14" y="8" width="34" height="24" fill={c} stroke={c2} strokeWidth="1"/>
    </svg>
  );
  if (i === 4) return (
    <svg width="60" height="40" viewBox="0 0 60 40">
      {[0, 1, 2, 3].map(j => <g key={j}>
        <circle cx="4" cy={6 + j * 10} r="2" fill={c}/>
        <line x1="10" y1={6 + j * 10} x2={[50, 40, 48, 32][j]} y2={6 + j * 10} stroke={c2} strokeWidth="1"/>
      </g>)}
    </svg>
  );
  return <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, fontStyle: 'italic', color: c }}>FAQ</div>;
}

// ── USES ─────────────────────────────────────────────────────
function UsesA({ S }) {
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '120px 48px' }}>
      <Eyebrow style={{ marginBottom: 16 }}>— {S.useLabel}</Eyebrow>
      <h2 style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 64, lineHeight: 1,
        letterSpacing: -1.5, margin: 0, fontWeight: 400, maxWidth: 720,
      }}>{S.useH}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 56, borderTop: `1px solid ${TOKENS.rule}` }}>
        {S.uses.map((u, i) => (
          <div key={u.t} style={{
            padding: '32px 24px 24px 0',
            borderRight: i !== 3 ? `1px solid ${TOKENS.rule}` : 'none',
            paddingLeft: i !== 0 ? 24 : 0,
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: TOKENS.ink3, letterSpacing: 2 }}>N°0{i + 1}</div>
            <h3 style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 26, fontWeight: 400,
              margin: '12px 0 10px', lineHeight: 1.1,
            }}>{u.t}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: TOKENS.ink2, margin: 0 }}>{u.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── STACK ────────────────────────────────────────────────────
function StackA({ S }) {
  return (
    <section style={{
      background: TOKENS.paperDeep, padding: '90px 48px',
      borderTop: `1px solid ${TOKENS.rule}`, borderBottom: `1px solid ${TOKENS.rule}`,
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Eyebrow style={{ marginBottom: 16 }}>— {S.stackLabel}</Eyebrow>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 48, lineHeight: 1.02,
              letterSpacing: -1, margin: 0, fontWeight: 400,
            }}>{S.stackH}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 32px' }}>
            {S.stack.map((x, i) => (
              <div key={x} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
                color: TOKENS.ink2, paddingBottom: 10, borderBottom: `1px dashed ${TOKENS.rule}`,
              }}>
                <span style={{ color: TOKENS.rust, fontSize: 11 }}>◆</span>{x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FINAL CTA ────────────────────────────────────────────────
function FinalCTAa({ S, mascot }) {
  return (
    <section style={{ padding: '140px 48px 120px', textAlign: 'center', position: 'relative' }}>
      {mascot && (
        <div style={{ position: 'absolute', left: '50%', top: 60, transform: 'translateX(-50%)' }}>
          <Many size={120} mood="wave"/>
        </div>
      )}
      <h2 style={{
        fontFamily: '"Instrument Serif", serif',
        fontSize: 100, lineHeight: 0.95, letterSpacing: -2,
        margin: `${mascot ? 200 : 0}px 0 20px`, fontWeight: 400, maxWidth: 900,
        marginLeft: 'auto', marginRight: 'auto',
      }}>{S.finalH}</h2>
      <p style={{ fontSize: 18, color: TOKENS.ink2, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.55 }}>{S.finalP}</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
        <button style={{
          background: TOKENS.ink, color: TOKENS.paper,
          padding: '18px 32px', fontSize: 15, fontWeight: 500,
          border: 'none', borderRadius: 999, cursor: 'pointer',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <AppleIcon/> macOS · Apple Silicon
        </button>
        <button style={{
          background: 'transparent', color: TOKENS.ink,
          border: `1.5px solid ${TOKENS.ink}`,
          padding: '16px 28px', fontSize: 15, fontWeight: 500,
          borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
        }}>Windows</button>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function FooterA({ S }) {
  return (
    <footer style={{
      background: TOKENS.ink, color: TOKENS.paper, padding: '80px 48px 36px',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 64 }}>
          <div>
            <DomeMark color={TOKENS.paper} size={24}/>
            <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(241,234,214,0.75)', maxWidth: 340, lineHeight: 1.55 }}>
              {S.footer.tag}
            </p>
          </div>
          {S.footer.cols.map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: TOKENS.sage, marginBottom: 16 }}>{col.h}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 14, color: 'rgba(241,234,214,0.85)', marginBottom: 10 }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <Rule color="rgba(241,234,214,0.15)"/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, fontSize: 12, color: 'rgba(241,234,214,0.55)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1 }}>
          <span>© 2026 — DOME · CUSTOM OSS LICENSE</span>
          <span>alder.velasquezobando@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LandingA });
