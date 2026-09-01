import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Deliver from './components/Deliver';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = React.useState('pt');
  const t = translations[lang];

  React.useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = t.page_title;
  }, [lang, t]);

  React.useEffect(() => {
    const reveal = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add('visible');
        }
      });
    };

    const progress = () => {
      const html = document.documentElement;
      const total = html.scrollHeight - html.clientHeight;
      const pct = total > 0 ? (html.scrollTop / total) * 100 : 0;
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.width = `${pct}%`;
      document.getElementById('floatingBtn')?.classList.toggle('visible', window.scrollY > 500);
    };

    const onScroll = () => { reveal(); progress(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    reveal();
    progress();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <div className="progress-bar" id="progressBar" aria-hidden="true" />
      <Header t={t} lang={lang} setLang={setLang} onNavigate={navigate} />
      <main>
        <Hero t={t} onNavigate={navigate} />
        <Deliver t={t} />
        <About t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Education t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <button className="floating-btn" id="floatingBtn" type="button" onClick={() => navigate('hero')} aria-label={t.aria_back_top}>↑</button>
    </>
  );
}
