import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function EventCard({ event }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const spotsLeft = event.totalCapacity - event.ticketsSold;
  const percentBooked = Math.round((event.ticketsSold / event.totalCapacity) * 100);
  const locationLabel = t.cities[event.location] || event.location;

  const handleBook = async () => {
    setMessage('');
    try {
      const res = await api.post('/tickets/book', { eventId: event._id });
      setQrCodeImage(res.data.qrCodeImage);
      setMessage(t.event.bookedSuccess);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="w-full max-w-sm h-full flex flex-col" dir="ltr">
      <div className="relative ticket-notch bg-card rounded-lg shadow-md hover:shadow-xl hover:-rotate-1 transition-all duration-300 flex overflow-hidden border border-ink/10 flex-1">
        <div className="flex-1 p-5 flex flex-col min-w-0">
          <span className="self-start bg-mustard/20 text-maroon text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 font-[family-name:var(--font-ticket)]">
            {event.category || 'General'}
          </span>

          <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase text-ink leading-tight mb-1 truncate">
            {event.title}
          </h3>
          <p className="text-sm text-ink/60 mb-3 line-clamp-2">{event.description}</p>

          <div className="font-[family-name:var(--font-ticket)] text-xs text-ink/70 space-y-1 mb-3">
            <p>{t.event.loc} — {locationLabel}</p>
            <p>{t.event.date} — {new Date(event.date).toLocaleDateString()}</p>
          </div>

          <div className="mt-auto">
            <div className="w-full bg-ink/10 h-1 rounded-full">
              <div className="bg-teal h-1 rounded-full" style={{ width: `${percentBooked}%` }} />
            </div>
            <p className="font-[family-name:var(--font-ticket)] text-[10px] text-ink/50 mt-1">
              {spotsLeft} / {event.totalCapacity} {t.event.spotsLeft}
            </p>
          </div>
        </div>

        <div className="border-l-2 border-dashed border-ink/25" />

        <div className="w-[90px] shrink-0 bg-mustard/10 flex flex-col items-center justify-between py-4">
          <span className="font-[family-name:'Space_Mono',monospace] text-[9px] text-maroon font-bold [writing-mode:vertical-rl] rotate-180 tracking-widest">
            ADMIT ONE
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl text-ink">
            {event.ticketPrice}
          </span>
          <span className="font-[family-name:'Space_Mono',monospace] text-[9px] text-ink/50">SAR</span>
        </div>
      </div>

      {user ? (
        <button
          onClick={handleBook}
          disabled={spotsLeft <= 0}
          className={`mt-2 w-full py-2 rounded font-[family-name:var(--font-ticket)] text-xs uppercase tracking-widest font-bold transition-colors ${
            spotsLeft <= 0
              ? 'bg-ink/10 text-ink/40 cursor-not-allowed'
              : 'bg-maroon text-paper hover:bg-maroon/90'
          }`}
        >
          {spotsLeft <= 0 ? t.event.soldOut : t.event.bookTicket}
        </button>
      ) : (
        <p className="mt-2 text-center text-xs text-ink/40 font-[family-name:var(--font-ticket)]">
          {t.event.loginToBook}
        </p>
      )}

      {message && (
        <p className="text-xs mt-2 text-center font-bold text-teal">{message}</p>
      )}
      {qrCodeImage && (
        <img src={qrCodeImage} alt="Ticket QR Code" className="w-28 mx-auto mt-2 rounded border border-ink/20" />
      )}
    </div>
  );
}

export default EventCard;
