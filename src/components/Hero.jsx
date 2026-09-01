import React from 'react';
import profilePhoto from '../../docs/profile-photo.png';

const icons = {
  CSharp: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  DotNet: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  Spring: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
};

const stack = [['C#', icons.CSharp], ['.NET', icons.DotNet], ['Java', icons.Java], ['Spring Boot', icons.Spring], ['PostgreSQL', icons.PostgreSQL], ['React', icons.React], ['TypeScript', icons.TypeScript], ['Git', icons.Git]];

const contacts = [
  { label: 'E-mail', href: 'mailto:pedroalmeidapeixoto@gmail.com', icon: 'mail' },
  { label: 'WhatsApp', href: 'https://wa.me/5583986590715', icon: 'whatsapp' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pedroalmeidapeixoto/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/pedroalmeidapeixoto', icon: 'github' },
  { label: 'Telefone', href: 'tel:+5583986590715', icon: 'phone' }
];

export default function Hero({ t, onNavigate }) {
  return (
    <section className="hero" id="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy reveal">
          <span className="availability"><i /> {t.availability}</span>
          <span className="eyebrow">BACKEND DEVELOPER · C# / .NET</span>
          <h1>Pedro Henrique<br /><span>Peixoto.</span></h1>
          <p className="hero-lede">{t.hero_lede}</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => onNavigate('projetos')}>{t.hero_cta_projects} →</button>
            <button className="btn" onClick={() => onNavigate('contato')}>{t.hero_cta_contact}</button>
          </div>
          <div className="hero-socials" aria-label={t.header_contacts_label}>
            {contacts.map((item, index) => (
              <a
                key={item.label}
                className="hero-social"
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={item.label}
                title={item.label}
                style={{ '--social-delay': `${index * 70}ms` }}
              >
                <ContactIcon type={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal reveal-delay">
          <div className="photo-frame">
            <img src={profilePhoto} alt={t.about_photo_alt} /> 
            <span className="photo-corner photo-corner-a" />
            <span className="photo-corner photo-corner-b" />
          </div>
          <div className="stack-box">
            <span>{t.hero_stack_label}</span>
            <div>
              {stack.map(([name, src]) => <span className="stack-icon" key={name}><img src={src} alt="" />{name}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="wrap hero-bottom"><span>{t.hero_location}</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
  );
}


function ContactIcon({ type }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    whatsapp: <><path d="M20.2 11.1a8.2 8.2 0 0 1-12.1 7.1L4 19l.9-4A8.2 8.2 0 1 1 20.2 11.1Z"/><path d="M8.7 8.5c.2-.5.4-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.5.6c.5 1 1.3 1.8 2.4 2.3l.7-.6c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.6v.4c0 .4-.1.6-.5.8-.4.2-1.3.4-2.1.1-1.4-.4-2.8-1.2-4-2.4-1.1-1.1-2-2.5-2.3-3.8-.2-.8 0-1.7.3-2.1Z"/></>,
    linkedin: <><path d="M6 8v10"/><path d="M6 5.2v.1"/><path d="M10 18v-6a3 3 0 0 1 6 0v6"/><path d="M10 11v7"/></>,
    github: <><path d="M15 22v-3.2c.1-.9-.3-1.5-.8-1.8 2.7-.3 5.5-1.3 5.5-5.9 0-1.3-.5-2.4-1.2-3.2.1-.3.5-1.5-.1-3.1 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6.8 4.5 5.8 4.8 5.8 4.8c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.9-1.2 3.2 0 4.6 2.8 5.6 5.5 5.9-.4.3-.7.8-.8 1.5V22"/><path d="M7 18c-2 .9-2.5-1-3.5-1.2"/></>,
    phone: <path d="M7 3h3l1.5 4-2 1.4a13 13 0 0 0 6.1 6.1l1.4-2 4 1.5v3c0 1-1 2-2 2C11.3 19 5 12.7 5 5c0-1 1-2 2-2Z"/>
  };

  return (
    <svg className="contact-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}
