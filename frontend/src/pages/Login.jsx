import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

function Login() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const inputClass = "w-full bg-transparent border-b-2 border-ink/20 focus:border-maroon outline-none py-2 text-ink";
  const labelClass = "block font-[family-name:var(--font-ticket)] text-[10px] uppercase tracking-widest text-ink/50 mb-1";

  return (
    <div className="min-h-screen bg-paper font-[family-name:var(--font-body)]">
      <Navbar />
      <div className="flex justify-center px-6 py-16">
        <div dir="ltr" className="relative ticket-notch bg-card rounded-lg shadow-md flex overflow-hidden border border-ink/10 w-full max-w-md">
          <div className="flex-1 p-8">
            <span className="font-[family-name:var(--font-ticket)] text-[10px] text-maroon uppercase tracking-widest">{t.login.boxOffice}</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-ink mb-6">{t.login.title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>{t.login.email}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.login.password}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
              </div>
              {error && <p className="text-maroon text-sm">{error}</p>}
              <button type="submit" className="w-full bg-maroon text-paper py-2.5 rounded font-[family-name:var(--font-ticket)] uppercase text-xs tracking-widest font-bold hover:bg-maroon/90 mt-2">
                {t.login.submit}
              </button>
            </form>

            <p className="text-xs text-ink/50 mt-6">
              {t.login.noAccount} <Link to="/register" className="text-teal font-bold hover:underline">{t.login.registerLink}</Link>
            </p>
          </div>

          <div className="border-l-2 border-dashed border-ink/25" />
          <div className="w-[70px] shrink-0 bg-mustard/10 flex items-center justify-center">
            <span className="font-[family-name:var(--font-ticket)] text-[9px] text-maroon font-bold [writing-mode:vertical-rl] rotate-180 tracking-widest">
              {t.login.entryPass}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
