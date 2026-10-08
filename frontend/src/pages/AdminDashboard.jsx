import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await api.get('/organizer-requests');
      setRequests(res.data);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchRequests();
  }, [user]);

  const handleApprove = async (userId) => {
    await api.post(`/organizer-requests/${userId}/approve`);
    fetchRequests();
  };

  const handleReject = async (userId) => {
    await api.post(`/organizer-requests/${userId}/reject`);
    fetchRequests();
  };

  if (user?.role !== 'admin') {
    return (
      <div className="site-page min-h-screen bg-paper font-[family-name:var(--font-body)]">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-ink/60">{t.admin.adminsOnly}</p>
          <Link to="/" className="text-teal hover:underline">{t.admin.backToHome}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-page min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <span className="font-[family-name:var(--font-ticket)] text-[10px] text-maroon uppercase tracking-widest">{t.admin.panel}</span>
        <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase text-ink mb-6">{t.admin.title}</h1>

        {loading && <p className="text-ink/40">{t.admin.loading}</p>}
        {error && <p className="text-maroon">{error}</p>}
        {!loading && requests.length === 0 && <p className="text-ink/40">{t.admin.empty}</p>}

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="glass-panel bg-card border border-ink/10 rounded-lg p-5 flex justify-between items-center" dir="ltr">
              <div>
                <p className="font-bold text-ink">{req.name} <span className="text-ink/40 font-normal">({req.email})</span></p>
                <p className="text-sm text-ink/60 mt-1">
                  {t.admin.org}: {req.organizerRequest?.orgName} · {t.admin.phone}: {req.organizerRequest?.phone}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(req._id)}
                  className="bg-teal text-paper px-4 py-2 rounded text-xs font-bold uppercase tracking-wide hover:opacity-90"
                >
                  {t.admin.approve}
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="bg-ink/10 text-ink px-4 py-2 rounded text-xs font-bold uppercase tracking-wide hover:bg-ink/20"
                >
                  {t.admin.reject}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
