import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

function BecomeOrganizer() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [orgName, setOrgName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const status = user?.organizerRequestStatus || 'none';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/organizer-requests', { orgName, phone });
      updateUser({ organizerRequestStatus: res.data.status });
      setMessage(t.becomeOrganizer.success);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    }
  };

  if (user?.role === 'organizer') {
    return (
      <div className="site-page min-h-screen bg-paper font-[family-name:var(--font-body)]">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-ink/60">{t.becomeOrganizer.alreadyOrganizer}</p>
          <Link to="/create-event" className="text-teal hover:underline">{t.becomeOrganizer.goToCreate}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-page min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <span className="font-[family-name:var(--font-ticket)] text-[10px] text-maroon uppercase tracking-widest">{t.becomeOrganizer.backstage}</span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-ink mb-6">{t.becomeOrganizer.title}</h2>

        {status === 'pending' && (
          <div className="bg-mustard/10 border border-mustard/30 rounded-lg p-4 text-sm text-ink/70">
            {t.becomeOrganizer.pending}
          </div>
        )}

        {status === 'rejected' && (
          <div className="bg-maroon/10 border border-maroon/30 rounded-lg p-4 text-sm text-ink/70 mb-4">
            {t.becomeOrganizer.rejected}
          </div>
        )}

        {status !== 'pending' && (
          <form onSubmit={handleSubmit} className="glass-panel space-y-3 bg-card p-6 rounded-lg border border-ink/10 shadow-sm">
            <div>
              <label className="block font-[family-name:var(--font-ticket)] text-[10px] uppercase tracking-widest text-ink/50 mb-1">
                {t.becomeOrganizer.orgName}
              </label>
              <input
                type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} required
                className="w-full bg-transparent border-b-2 border-ink/20 focus:border-maroon outline-none py-2 text-ink"
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-ticket)] text-[10px] uppercase tracking-widest text-ink/50 mb-1">
                {t.becomeOrganizer.phone}
              </label>
              <input
                type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required dir="ltr"
                className="w-full bg-transparent border-b-2 border-ink/20 focus:border-maroon outline-none py-2 text-ink"
              />
            </div>
            {error && <p className="text-maroon text-sm">{error}</p>}
            {message && <p className="text-teal text-sm">{message}</p>}
            <button type="submit" className="w-full bg-maroon text-paper py-2.5 rounded font-[family-name:var(--font-ticket)] uppercase text-xs tracking-widest font-bold hover:bg-maroon/90">
              {t.becomeOrganizer.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BecomeOrganizer;
