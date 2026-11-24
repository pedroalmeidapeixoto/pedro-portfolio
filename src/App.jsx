import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Deliver from './components/Deliver';
import About from './components/About';
import Journey from './components/Journey';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Intro, { shouldPlayIntro } from './components/Intro';
import RouteWidget from './components/RouteWidget';
import { usePageMotion, scrollToId } from './hooks/useMotion';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = React.useState('pt');
  const t = translations[lang];
  const [intro] = React.useState(shouldPlayIntro);
  const [ready, setReady] = React.useState(!intro);
  const onIntroDone = React.useCallback(() => setReady(true), []);

  React.useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = t.page_title;
  }, [lang, t]);

  // smooth scroll, the sheets that slide over each other, the reveals and the progress bar (held back while the intro plays)
  usePageMotion(ready);

  const navigate = (id) => scrollToId(id);

  return (
    <>
      {intro && <Intro onDone={onIntroDone} />}
      <div className="progress-bar" id="progressBar" aria-hidden="true" />
      <Header t={t} lang={lang} setLang={setLang} onNavigate={navigate} />
      <main>
        <Hero t={t} onNavigate={navigate} />
        <Manifesto t={t} />
        <Deliver t={t} />
        <About t={t} />
        <Journey t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <RouteWidget />
      <button className="floating-btn" id="floatingBtn" type="button" onClick={() => navigate('hero')} aria-label={t.aria_back_top}>↑</button>
    </>
  );
}
