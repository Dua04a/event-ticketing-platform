import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

function Register() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'attendee' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
            <span className="font-[family-name:var(--font-ticket)] text-[10px] text-maroon uppercase tracking-widest">{t.register.boxOffice}</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-ink mb-6">{t.register.title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>{t.register.fullName}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.register.email}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.register.password}</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.register.accountType}</label>
                <select name="role" value={formData.role} onChange={handleChange} className={inputClass}>
                  <option value="attendee">{t.register.attendee}</option>
                  <option value="organizer">{t.register.organizer}</option>
                </select>
              </div>
              {error && <p className="text-maroon text-sm">{error}</p>}
              <button type="submit" className="w-full bg-maroon text-paper py-2.5 rounded font-[family-name:var(--font-ticket)] uppercase text-xs tracking-widest font-bold hover:bg-maroon/90 mt-2">
                {t.register.submit}
              </button>
            </form>

            <p className="text-xs text-ink/50 mt-6">
              {t.register.haveAccount} <Link to="/login" className="text-teal font-bold hover:underline">{t.register.loginLink}</Link>
            </p>
          </div>

          <div className="border-l-2 border-dashed border-ink/25" />
          <div className="w-[70px] shrink-0 bg-mustard/10 flex items-center justify-center">
            <span className="font-[family-name:var(--font-ticket)] text-[9px] text-maroon font-bold [writing-mode:vertical-rl] rotate-180 tracking-widest">
              {t.register.newMember}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
