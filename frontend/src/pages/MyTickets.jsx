import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

function MyTickets() {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets/my-tickets');
        setTickets(res.data);
      } catch (err) {
        setError('Failed to load your tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <span className="font-[family-name:var(--font-ticket)] text-[10px] text-maroon uppercase tracking-widest">{t.myTickets.willCall}</span>
        <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase text-ink mb-1">{t.myTickets.title}</h1>
        <Link to="/" className="text-teal text-sm hover:underline">{t.myTickets.backToEvents}</Link>

        {loading && <p className="text-ink/40 mt-8">{t.myTickets.loading}</p>}
        {error && <p className="text-maroon mt-8">{error}</p>}
        {!loading && tickets.length === 0 && <p className="text-ink/40 mt-8">{t.myTickets.empty}</p>}

        <div className="mt-8 space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} dir="ltr" className="relative ticket-notch-sm bg-card rounded-lg shadow-sm flex overflow-hidden border border-ink/10">
              <div className="flex-1 p-5">
                <h3 className="font-[family-name:var(--font-display)] text-xl uppercase text-ink">
                  {ticket.eventId?.title || 'Event no longer available'}
                </h3>
                <p className="font-[family-name:var(--font-ticket)] text-xs text-ink/60 mt-1">
                  {t.cities[ticket.eventId?.location] || ticket.eventId?.location} — {ticket.eventId ? new Date(ticket.eventId.date).toLocaleDateString() : '-'}
                </p>
                <p className="font-[family-name:var(--font-ticket)] text-[10px] text-ink/40 mt-2 break-all">
                  {t.myTickets.code}: {ticket.qrCode}
                </p>
              </div>
              <div className="border-l-2 border-dashed border-ink/25" />
              <div className="w-[70px] shrink-0 flex items-center justify-center bg-mustard/10">
                <span
                  className={`font-[family-name:'Space_Mono',monospace] text-[10px] font-bold uppercase tracking-widest ${ticket.status === 'valid' ? 'text-teal' : 'text-ink/40'}`}
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTickets;
