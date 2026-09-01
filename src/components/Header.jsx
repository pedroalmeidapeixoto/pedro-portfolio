import React from 'react';

const items = [
  ['hero', 'nav_home'], ['sobre', 'nav_about'], ['experiencia', 'nav_experience'],
  ['projetos', 'nav_projects'], ['skills', 'nav_skills'], ['formacao', 'nav_education'], ['contato', 'nav_contact']
];

const contacts = [
  { label: 'E-mail', href: 'mailto:pedroalmeidapeixoto@gmail.com', icon: 'mail' },
  { label: 'WhatsApp', href: 'https://wa.me/5583986590715', icon: 'whatsapp' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pedroalmeidapeixoto/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/pedroalmeidapeixoto', icon: 'github' },
  { label: 'Telefone', href: 'tel:+5583986590715', icon: 'phone' }
];

export default function Header({ t, lang, setLang, onNavigate }) {
  const [open, setOpen] = React.useState(false);
  const go = (id) => { onNavigate(id); setOpen(false); };

  return (
    <header className="site-header">
      <nav className="wrap nav" aria-label="Primary navigation">
        <button className="brand" type="button" onClick={() => go('hero')} aria-label={t.aria_back_top}>
          <span className="brand-mark">P</span>
          <span className="brand-name">Pedro Henrique Peixoto</span>
        </button>

        <div className="navlinks">
          {items.map(([id, key]) => (
            <button key={id} type="button" onClick={() => go(id)}>{t[key]}</button>
          ))}
          <Language lang={lang} setLang={setLang} />
        </div>

        <button className="menu-toggle" type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={t.aria_open_menu}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        {items.map(([id, key]) => (
          <button key={id} type="button" onClick={() => go(id)}>{t[key]}</button>
        ))}
        <div className="mobile-contact-grid">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <ContactIcon type={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <Language lang={lang} setLang={setLang} />
      </div>
    </header>
  );
}

function Language({ lang, setLang }) {
  return (
    <div className="lang">
      <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button>
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
    </div>
  );
}

function ContactIcon({ type }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    whatsapp: <><path d="M20.2 11.1a8.2 8.2 0 0 1-12.1 7.1L4 19l.9-4A8.2 8.2 0 1 1 20.2 11.1Z"/><path d="M8.7 8.5c.2-.5.4-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.5.6c.5 1 1.3 1.8 2.4 2.3l.7-.6c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.6v.4c0 .4-.1.6-.5.8-.4.2-1.3.4-2.1.1-1.4-.4-2.8-1.2-4-2.4-1.1-1.1-2-2.5-2.3-3.8-.2-.8 0-1.7.3-2.1Z"/></>,
    linkedin: <><path d="M6 8v10"/><path d="M6 5.2v.1"/><path d="M10 18v-6a3 3 0 0 1 6 0v6"/><path d="M10 11v7"/></>,
    github: <><path d="M15 22v-3.2c.1-.9-.3-1.5-.8-1.8 2.7-.3 5.5-1.3 5.5-5.9 0-1.3-.5-2.4-1.2-3.2.1-.3.5-1.5-.1-3.1 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6.8 4.5 5.8 4.8 5.8 4.8c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.9-1.2 3.2 0 4.6 2.8 5.6 5.5 5.9-.4.3-.7.8-.8 1.5V22"/><path d="M7 18c-2 .9-2.5-1-3.5-1.2"/></>,
    phone: <><path d="M7 3h3l1.5 4-2 1.4a13 13 0 0 0 6.1 6.1l1.4-2 4 1.5v3c0 1-1 2-2 2C11.3 19 5 12.7 5 5c0-1 1-2 2-2Z"/></>
  };
  return <svg className="contact-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}
