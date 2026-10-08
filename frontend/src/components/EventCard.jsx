import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function EventCard({ event }) {
  const { user } = useAuth();
  const { t, dir } = useLanguage();
  const [message, setMessage] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');

  const safeEvent = event ?? {};
  const totalCapacity = Number(safeEvent.totalCapacity) || 0;
  const ticketsSold = Number(safeEvent.ticketsSold) || 0;
  const spotsLeft = Math.max(0, totalCapacity - ticketsSold);
  const percentBooked = totalCapacity > 0 ? Math.round((ticketsSold / totalCapacity) * 100) : 0;
  const locationLabel = t.cities[safeEvent.location] || safeEvent.location || 'TBD';
  const eventDate = safeEvent.date ? new Date(safeEvent.date) : null;

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
    <div className="w-full max-w-sm h-full flex flex-col" dir={dir}>
      <div className="relative ticket-notch glass-panel bg-card rounded-lg shadow-md hover:shadow-xl hover:-rotate-1 transition-all duration-300 flex overflow-hidden border border-ink/10 flex-1">
        <div className="flex-1 p-4 flex flex-col min-w-0">
          <span className="self-start bg-mustard/20 text-maroon text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 font-[family-name:var(--font-ticket)]">
            {safeEvent.category || 'General'}
          </span>

          <h3 className="font-[family-name:var(--font-display)] text-xl uppercase text-ink leading-tight mb-1 truncate">
            {safeEvent.title || 'Untitled event'}
          </h3>
          <p className="text-sm text-ink/60 mb-3 line-clamp-2">{safeEvent.description || 'No description provided.'}</p>

          <div className="font-[family-name:var(--font-ticket)] text-xs text-ink/70 space-y-1 mb-3">
            <p>{t.event.loc} — {locationLabel}</p>
            <p>{t.event.date} — {eventDate ? eventDate.toLocaleDateString() : 'TBA'}</p>
          </div>

          <div className="mt-auto">
            <div className="w-full bg-ink/10 h-1 rounded-full">
              <div className="bg-teal h-1 rounded-full" style={{ width: `${percentBooked}%` }} />
            </div>
            <p className="font-[family-name:var(--font-ticket)] text-[10px] text-ink/50 mt-1">
              {spotsLeft} / {totalCapacity || 0} {t.event.spotsLeft}
            </p>
          </div>
        </div>

        <div className="border-l-2 border-dashed border-ink/25" />

        <div className="w-[72px] shrink-0 bg-mustard/10 flex flex-col items-center justify-between py-3">
          <span className="font-[family-name:'Space_Mono',monospace] text-[9px] text-maroon font-bold [writing-mode:vertical-rl] rotate-180 tracking-widest">
            ADMIT ONE
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl text-ink">
            {safeEvent.ticketPrice ?? 0}
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
              : 'bg-mustard text-paper hover:bg-mustard/90'
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
