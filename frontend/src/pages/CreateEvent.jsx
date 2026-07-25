import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage, cityKeys } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

function CreateEvent() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', location: cityKeys[0], date: '', ticketPrice: '', totalCapacity: '',
  });
  const [error, setError] = useState('');

  if (!user || user.role !== 'organizer') {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-ink/60">{t.createEvent.onlyOrganizers}</p>
          <Link to="/" className="text-teal hover:underline">{t.createEvent.backToHome}</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/events', {
        ...formData,
        ticketPrice: Number(formData.ticketPrice),
        totalCapacity: Number(formData.totalCapacity),
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    }
  };

  const inputClass = "w-full bg-transparent border-b-2 border-ink/20 focus:border-maroon outline-none py-2 text-ink placeholder:text-ink/30";
  const labelClass = "block font-[family-name:var(--font-ticket)] text-[10px] uppercase tracking-widest text-ink/50 mb-1";

  return (
    <div className="min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-12">
        <span className="font-[family-name:var(--font-ticket)] text-[10px] text-maroon uppercase tracking-widest">{t.createEvent.organizerDesk}</span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-ink mb-6">{t.createEvent.title}</h2>
        <Link to="/" className="text-teal text-sm hover:underline">{t.createEvent.backToHome}</Link>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6 bg-card p-6 rounded-lg border border-ink/10 shadow-sm">
          <div>
            <label className={labelClass}>{t.createEvent.eventTitle}</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t.createEvent.description}</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className={inputClass} rows="2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.createEvent.category}</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t.createEvent.location}</label>
              <select name="location" value={formData.location} onChange={handleChange} className={inputClass}>
                {cityKeys.map((key) => (
                  <option key={key} value={key}>{t.cities[key]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.createEvent.date}</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required dir="ltr" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t.createEvent.price}</label>
              <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required dir="ltr" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{t.createEvent.capacity}</label>
            <input type="number" name="totalCapacity" value={formData.totalCapacity} onChange={handleChange} required dir="ltr" className={inputClass} />
          </div>
          {error && <p className="text-maroon text-sm">{error}</p>}
          <button type="submit" className="w-full bg-maroon text-paper py-2.5 rounded font-[family-name:var(--font-ticket)] uppercase text-xs tracking-widest font-bold hover:bg-maroon/90 mt-2">
            {t.createEvent.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
