import React from 'react';

const navItems = [
  ['hero', 'nav_home'], ['sobre', 'nav_about'], ['experiencia', 'nav_experience'],
  ['projetos', 'nav_projects'], ['skills', 'nav_skills'], ['formacao', 'nav_education'], ['contato', 'nav_contact']
];

export default function Header({ t, lang, setLang, onNavigate }) {
  const [open, setOpen] = React.useState(false);
  const navigate = (id) => { onNavigate(id); setOpen(false); };
  return <header className="site-header">
    <nav className="nav wrap" aria-label="Primary navigation">
      <button className="logo" type="button" aria-label="Back to top" onClick={() => navigate('hero')}>
        <svg className="logo-mark" viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M14 16V84H28V55H46C60 55 70 46 70 33C70 20 60 16 46 16H14ZM28 28H44C51 28 56 30 56 33.5C56 37 51 43 44 43H28V28Z" fill="#e9ecf3"/><path d="M58 84L76 50L58 16H74L92 50L74 84H58Z" fill="#5eead4"/></svg>
        <span>pedro.dev</span><span className="logo-status"><span className="dot"></span><span>ONLINE</span></span>
      </button>
      <div className="navlinks" id="desktopNav">
        {navItems.map(([id,key]) => <button key={id} data-target={id} className={id==='hero'?'active':''} onClick={() => navigate(id)}>{t[key]}</button>)}
        <LanguageSwitch lang={lang} setLang={setLang}/>
      </div>
      <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(v=>!v)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
    </nav>
    <div className={`mobile-drawer ${open?'open':''}`} id="mobileDrawer">
      {navItems.map(([id,key]) => <button key={id} data-target={id} className={id==='hero'?'active':''} onClick={() => navigate(id)}>{t[key]}</button>)}
      <LanguageSwitch lang={lang} setLang={setLang}/>
    </div>
  </header>;
}

function LanguageSwitch({lang,setLang}) { return <div className="lang-switch"><button className={`lang-btn ${lang==='en'?'active':''}`} onClick={()=>setLang('en')}>EN</button><button className={`lang-btn ${lang==='pt'?'active':''}`} onClick={()=>setLang('pt')}>PT</button></div>; }
