import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(t.home.error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [t]);

  const categories = [...new Set(events.map((event) => event.category?.trim()).filter(Boolean))];
  const visibleEvents = activeCategory === 'all'
    ? events
    : events.filter((event) => event.category?.trim() === activeCategory);
  const organizerLink = user?.role === 'organizer'
    ? '/create-event'
    : user?.role === 'attendee'
      ? '/become-organizer'
      : user?.role === 'admin'
        ? '/admin'
        : '/register';

  return (
    <div className="site-page home-page min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />

      <main>
        <section className="home-showcase">
          <span className="home-showcase__star home-showcase__star--yellow" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--pink" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--teal" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--violet" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--yellow-small" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--pink-small" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--teal-small" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--coral" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--violet-small" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--yellow-medium" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--pink-large" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--teal-large" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--violet-medium" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--coral-small" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--yellow-large" aria-hidden="true" />
          <span className="home-showcase__star home-showcase__star--pink-medium" aria-hidden="true" />
          <header className="home-showcase__header">
            <span className="home-eyebrow">{t.home.kicker}</span>
            <h1>{t.home.heroTitle}</h1>
            <p>{t.home.heroSubtitle}</p>
          </header>

          <div className="home-showcase__actions">
            <a href="#events" className="home-button home-button--primary">{t.home.browseEvents}</a>
            <Link to={organizerLink} className="home-button home-button--secondary">{t.home.organizeEvent}</Link>
          </div>
        </section>

        <section id="events" className="home-events">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">{t.home.boxOffice}</span>
              <h2>{t.home.discoverTitle}</h2>
              <p>{t.home.discoverSubtitle}</p>
            </div>
            {!loading && events.length > 0 && (
              <span className="home-event-count">{events.length} {t.home.eventsListed}</span>
            )}
          </div>

          {!loading && categories.length > 0 && (
            <div className="home-filters" aria-label={t.home.filterEvents}>
              <button
                type="button"
                className={activeCategory === 'all' ? 'home-filter is-active' : 'home-filter'}
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
              >
                {t.home.allEvents}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? 'home-filter is-active' : 'home-filter'}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {loading && <p className="text-center text-ink/50 py-10">{t.home.loading}</p>}
          {error && <p className="home-message home-message--error">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <div className="home-empty-state">
              <span className="home-empty-state__icon" aria-hidden="true">✦</span>
              <h3>{t.home.emptyTitle}</h3>
              <p>{t.home.empty}</p>
              <Link to={organizerLink} className="home-button home-button--primary">{t.home.organizeEvent}</Link>
            </div>
          )}
          {!loading && events.length > 0 && visibleEvents.length === 0 && (
            <p className="home-message">{t.home.noCategoryEvents}</p>
          )}

          <div className="event-shelf grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {visibleEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <span>STAGEDOOR</span>
        <p>{t.home.footer}</p>
      </footer>
    </div>
  );
}

export default Home;
