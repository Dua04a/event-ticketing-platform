import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLanguage();

  return (
    <nav className="bg-card border-b-2 border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-[family-name:var(--font-display)] text-2xl text-maroon tracking-wide">
          STAGEDOOR
        </Link>
        <div className="flex items-center gap-5 text-xs font-[family-name:var(--font-ticket)] uppercase tracking-wide">
          {user ? (
            <>
              <span className="hidden sm:inline text-ink/50">{user.name} · {user.role}</span>
              <Link to="/my-tickets" className="text-teal hover:opacity-70">{t.nav.myTickets}</Link>

              {user.role === 'organizer' && (
                <Link to="/create-event" className="text-teal hover:opacity-70">{t.nav.createEvent}</Link>
              )}
              {user.role === 'attendee' && (
                <Link to="/become-organizer" className="text-teal hover:opacity-70">{t.nav.becomeOrganizer}</Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="text-teal hover:opacity-70">{t.nav.admin}</Link>
              )}

              <button onClick={logout} className="bg-ink/10 text-ink px-3 py-1.5 rounded hover:bg-ink/20">
                {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-ink/70 hover:text-ink">{t.nav.login}</Link>
              <Link to="/register" className="bg-maroon text-paper px-3 py-1.5 rounded font-bold hover:bg-maroon/90">
                {t.nav.register}
              </Link>
            </>
          )}
          <button onClick={toggleLang} className="bg-mustard/20 text-maroon px-3 py-1.5 rounded font-bold hover:bg-mustard/30">
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
