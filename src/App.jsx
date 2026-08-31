import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = React.useState(() => {
    return localStorage.getItem('portfolio-lang') || 'pt';
  });

  const t = translations[lang];

  React.useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);

    document.documentElement.lang =
      lang === 'pt' ? 'pt-BR' : 'en';

    document.title = t.page_title;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document
              .querySelectorAll(
                '.navlinks button,.mobile-drawer>button'
              )
              .forEach((button) =>
                button.classList.toggle(
                  'active',
                  button.dataset.target === entry.target.id
                )
              );
          }
        }),
      {
        rootMargin: '-25% 0px -60% 0px',
      }
    );

    [
      'hero',
      'sobre',
      'experiencia',
      'projetos',
      'skills',
      'formacao',
      'contato',
    ].forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        io.observe(element);
      }
    });

    const rev = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            rev.unobserve(entry.target);
          }
        }),
      {
        threshold: 0.12,
      }
    );

    document
      .querySelectorAll('.reveal')
      .forEach((element) => rev.observe(element));

    return () => {
      io.disconnect();
      rev.disconnect();
    };
  }, [lang]);

  React.useEffect(() => {
    const onScroll = () => {
      const html = document.documentElement;

      const denominator =
        html.scrollHeight - html.clientHeight;

      const pct =
        denominator > 0
          ? (html.scrollTop / denominator) * 100
          : 0;

      const progressBar =
        document.getElementById('progressBar');

      const floatingBtn =
        document.getElementById('floatingBtn');

      if (progressBar) {
        progressBar.style.width = `${pct}%`;
      }

      if (floatingBtn) {
        floatingBtn.classList.toggle(
          'visible',
          window.scrollY > 350
        );
      }
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    onScroll();

    return () =>
      window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  const handleLanguageChange = (newLang) => {
    if (!translations[newLang]) {
      return;
    }

    setLang(newLang);
  };

  return (
    <>
      <div
        className="tech-grid"
        aria-hidden="true"
      />

      <div
        className="tech-grid-glow"
        id="techGridGlow"
        aria-hidden="true"
      />

      <div
        className="progress-bar"
        id="progressBar"
        aria-hidden="true"
      />

      <Header
        t={t}
        lang={lang}
        setLang={handleLanguageChange}
        onNavigate={navigate}
      />

      <main>
        <Hero
          t={t}
          onNavigate={navigate}
        />

        <About t={t} />

        <Experience t={t} />

        <Projects t={t} />

        <Skills t={t} />

        <Education t={t} />

        <Contact t={t} />
      </main>

      <Footer t={t} />

      <button
        className="floating-btn"
        id="floatingBtn"
        type="button"
        aria-label={t.aria_back_top}
        onClick={() => navigate('hero')}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}