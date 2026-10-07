import { useState, useEffect } from 'react';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        setError(t.home.error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [t]);

  return (
    <div className="min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />

      <div className="party-divider" />

      <div className="party-stage relative overflow-hidden text-center py-16 px-6">
        <span className="party-confetti party-confetti--star" aria-hidden="true" />
        <span className="party-confetti party-confetti--sparkle" aria-hidden="true" />
        <span className="party-confetti party-confetti--dot" aria-hidden="true" />
        <span className="party-confetti party-confetti--dash" aria-hidden="true" />
        <span className="party-confetti party-confetti--ring" aria-hidden="true" />
        <span className="party-confetti party-confetti--star-small" aria-hidden="true" />
        <span className="party-confetti party-confetti--pill" aria-hidden="true" />
        <span className="party-confetti party-confetti--dot-small" aria-hidden="true" />
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-ink uppercase tracking-wide mb-3">
          {t.home.heroTitle}
        </h1>
        <p className="text-mustard font-[family-name:var(--font-ticket)] text-xs uppercase tracking-widest">
          {t.home.heroSubtitle}
        </p>
      </div>

      <div className="party-divider" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading && <p className="text-center text-ink/40">{t.home.loading}</p>}
        {error && <p className="text-center text-maroon">{error}</p>}
        {!loading && events.length === 0 && <p className="text-center text-ink/40">{t.home.empty}</p>}

        <div className="event-shelf grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
