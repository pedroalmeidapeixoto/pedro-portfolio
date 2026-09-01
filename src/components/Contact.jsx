import React from 'react';

const links = [
  { key: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/5583986590715', icon: 'whatsapp' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/pedroalmeidapeixoto/', icon: 'linkedin' },
  { key: 'github', label: 'GitHub', href: 'https://github.com/pedroalmeidapeixoto', icon: 'github' },
  { key: 'phone', label: 'Telefone', href: 'tel:+5583986590715', icon: 'phone' }
];

export default function Contact({ t }) {
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Nome: ${f.get('name')}\nContato: ${f.get('contact')}\n\n${f.get('message')}`;
    window.location.href = `mailto:${t.email}?subject=${encodeURIComponent('Contato via portfólio — ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
  };

  const resume = t.resume_file;

  return (
    <section id="contato" className="contact-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span>{t.contact_eyebrow}</span>
          <h2>{t.contact_title}</h2>
          <p>{t.contact_intro}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="email-card">
              <small>E-MAIL</small>
              <strong>{t.email}</strong>
              <a href={`mailto:${t.email}`}>{t.send_email} ↗</a>
            </div>

            <div className="contact-links">
              {links.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span className="contact-link-main">
                    <ContactIcon type={item.icon} />
                    <span>{item.label}</span>
                  </span>
                  <span>↗</span>
                </a>
              ))}
            </div>

            <div className="resume-download">
              <div>
                <small>{t.resume_label}</small>
                <strong>{t.resume_title}</strong>
                <span>{t.resume_subtitle}</span>
              </div>
              <div className="resume-actions">
                <a href={resume.pt} target="_blank" rel="noreferrer">{t.resume_pt} ↓</a>
                <a href={resume.en} target="_blank" rel="noreferrer">{t.resume_en} ↓</a>
              </div>
            </div>
          </div>

          <form className="contact-form reveal reveal-delay" onSubmit={submit}>
            <label>{t.form_name}<input name="name" required placeholder={t.form_name_ph}/></label>
            <label>{t.form_contact}<input name="contact" required placeholder={t.form_contact_ph}/></label>
            <label>{t.form_message}<textarea name="message" rows="6" required placeholder={t.form_message_ph}/></label>
            <button className="btn primary contact-submit" type="submit">
              <span>{t.form_submit}</span><span>→</span>
            </button>
            <p>{t.form_note}</p>
          </form>
        </div>
      </div>
    </section>
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
