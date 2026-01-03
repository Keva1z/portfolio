import React, { useRef, useEffect, useState } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import BackgroundMusic from './components/BackgroundMusic';
import Thoughts from './components/Thoughts';

function App() {
  const slidesRef = useRef([]);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getCurrentIndex = () => {
      const top = container.scrollTop;
      return Math.round(top / window.innerHeight);
    };

    const goTo = (index) => {
      const el = slidesRef.current[index];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const i = Math.min(getCurrentIndex() + 1, slidesRef.current.length - 1);
        goTo(i);
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const i = Math.max(getCurrentIndex() - 1, 0);
        goTo(i);
      }
      if (e.key === 'Home') goTo(0);
      if (e.key === 'End') goTo(slidesRef.current.length - 1);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.5);
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setSlideRef = (i) => (el) => {
    slidesRef.current[i] = el;
    if (i === 0) heroRef.current = el;
  };

  return (
    <>
      <BackgroundVideo />
      <BackgroundMusic />

      {/* Показываем бренд и портрет, контролируя видимость через классы (fade) */}
      <>
        <div className={`site-brand ${heroVisible ? 'site-brand--visible' : 'site-brand--hidden'}`} aria-hidden="true">
          <h1 className="site-brand__title">Keva1z</h1>
          <p className="site-brand__subtitle">Герус Вячеслав</p>
        </div>

        <div className={`site-photo ${heroVisible ? 'site-photo--visible' : 'site-photo--hidden'}`} aria-hidden="true">
          <img
            className="site-photo__img"
            src="/images/me.png"
            alt="Keva1z — Герус Вячеслав"
            loading="lazy"
          />
        </div>
      </>

      <main className="site-content">
        <div className="slides" ref={containerRef}>
          <section ref={setSlideRef(0)} className="slide slide--hero">
            <div className="slide-inner" />
          </section>

          <section ref={setSlideRef(1)} className="slide">
            <div className="slide-inner about">
              <div className="about-left tech-stack">
                <div className="tech-label">Other</div>
                <ul className="tech-list">
                  <li className="tech-badge">Git</li>
                  <li className="tech-badge">Docker</li>
                  <li className="tech-badge">Nginx</li>
                </ul>
              </div>

              <div className="about-center">
                <h2>Обо мне</h2>
                <p>
                  Я — Вячеслав, backend-разработчик с глубоким увлечением проектированием масштабируемых систем. Путь в программирование начался в 11 лет, что позволило мне развить фундаментальное понимание архитектуры и принципов разработки. К 16 годам реализовал значительный проект <a href="https://nefor-love.ru/" target="_blank" rel="noopener noreferrer">NeforLove</a> — многофункциональную платформу с веб-интерфейсом и Telegram-ботом, решающую реальные задачи. Специализируюсь на создании надёжных backend-решений на <strong>Python</strong> и <strong>TypeScript</strong>, с упором на чистоту кода, производительность и удобство разработки.
                </p>
              </div>

              <div className="about-right tech-stack">
                <div className="tech-label">Python</div>
                <ul className="tech-list">
                  <li className="tech-badge">FastAPI</li>
                  <li className="tech-badge">Aiogram</li>
                  <li className="tech-badge">SQLAlchemy</li>
                  <li className="tech-badge">Alembic</li>
                  <li className="tech-badge">Pytest</li>
                  <li className="tech-badge">Numpy</li>
                </ul>
              </div>

              <div className="about-right tech-stack">
                <div className="tech-label">TypeScript</div>
                <ul className="tech-list">
                  <li className="tech-badge">NestJS</li>
                  <li className="tech-badge">Express</li>
                  <li className="tech-badge">Grammy</li>
                  <li className="tech-badge">Prisma</li>
                  <li className="tech-badge">Drizzle ORM</li>
                </ul>
              </div>
            </div>
          </section>

          <section ref={setSlideRef(2)} className="slide">
            <div className="slide-inner">
              <h2>Проекты</h2>

              <div className="project-card">
                <h3>NeforLove</h3>
                <p>Крупный проект, запущенный в 16 лет — сайт и телеграм-бот.</p>
                <div className="project-actions">
                  <a className="btn btn--outline" href="https://github.com/Keva1z/neforlove-ts" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a className="btn btn--primary" href="https://nefor-love.ru/" target="_blank" rel="noopener noreferrer">Сайт</a>
                  <a className="btn btn--ghost" href="https://t.me/NeforLove_robot" target="_blank" rel="noopener noreferrer">Телеграмм</a>
                </div>
              </div>

            </div>
          </section>

          <section ref={setSlideRef(4)} className="slide">
            <div className="slide-inner">
              <h2>Мысли из Telegram</h2>
              <p>Отправляю сообщение в бота — оно сразу появляется на сайте.</p>
              <Thoughts />
            </div>
          </section>

          <section ref={setSlideRef(3)} className="slide">
            <div className="slide-inner">
              <h2>Контакты</h2>
              <p>Свяжись со мной через соцсети:</p>
              <div className="contacts-list">
                <a className="contact-link" href="https://github.com/Keva1z" target="_blank" rel="noopener noreferrer" aria-label="GitHub (Keva1z)">
                  <svg className="contact-icon" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.17-3.1-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.74.11 3.03.73.81 1.17 1.84 1.17 3.1 0 4.44-2.7 5.42-5.27 5.7.41.35.77 1.05.77 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.2.67.79.56C20.71 21.39 24 17.08 24 12 24 5.65 18.35.5 12 .5z" /></svg>
                  <span>GitHub</span>
                </a>

                <a className="contact-link" href="https://t.me/Keva1z" target="_blank" rel="noopener noreferrer" aria-label="Telegram (@Keva1z)">
                  <svg className="contact-icon" viewBox="0 0 240 240" width="40" height="40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm57.33 82.5l-19.64 92.7c-1.49 6.78-5.4 8.45-10.95 5.27l-30.3-22.38-14.62 14.07c-1.62 1.62-2.98 2.98-6.08 2.98l2.17-30.27 55.02-49.71c2.39-2.17-.52-3.38-3.7-1.22L73.8 115.9 39.68 103.2c-6.6-1.92-6.75-6.6 1.38-9.77L162 73.2c6.42-2.06 12.08 1.47 15.33 9.3z" /></svg>
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;