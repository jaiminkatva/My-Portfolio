import { useEffect, useState } from 'react';
import { TbBriefcase, TbDashboard, TbFileText, TbInbox, TbLogout, TbMoon, TbSun } from 'react-icons/tb';
import useTheme from '../hooks/useTheme';
import { adminApi } from '../lib/api';
import Dashboard from './Dashboard';
import ContentManager from './ContentManager';
import InquiryManager from './InquiryManager';
import LoginPage from './LoginPage';
import ProjectManager from './ProjectManager';

const TOKEN_KEY = 'portfolio_admin_token';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', Icon: TbDashboard },
  { id: 'content', label: 'Site content', Icon: TbFileText },
  { id: 'projects', label: 'Projects', Icon: TbBriefcase },
  { id: 'inquiries', label: 'Enquiries', Icon: TbInbox },
];

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(Boolean(token));
  const [tab, setTab] = useState('dashboard');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!token) return;
    adminApi.me(token)
      .then(setAdmin)
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      })
      .finally(() => setChecking(false));
  }, [token]);

  function handleLogin(result) {
    localStorage.setItem(TOKEN_KEY, result.token);
    setToken(result.token);
    setAdmin(result.admin);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  }

  if (checking) {
    return <div className="grid min-h-screen place-items-center bg-ink-900 font-mono text-sm text-paper-faint">Checking session…</div>;
  }
  if (!token || !admin) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-ink-900 text-paper">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line/[0.08] bg-ink-800/90 p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <a href={import.meta.env.BASE_URL} className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" className="h-10 w-10 rounded-xl border border-signal/20 p-1.5" />
          <span><span className="block font-display font-medium">Portfolio Admin</span><span className="font-mono text-xs text-paper-faint">Content control</span></span>
        </a>
        <nav className="mt-10 grid gap-2" aria-label="Admin navigation">
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${tab === id ? 'bg-signal text-ink-900' : 'text-paper-dim hover:bg-line/[0.05] hover:text-paper'}`}>
              <Icon className="h-5 w-5" /> {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-line/[0.08] pt-5">
          <p className="truncate text-sm text-paper">{admin.name}</p>
          <p className="truncate text-xs text-paper-faint">{admin.email}</p>
          <button type="button" onClick={logout} className="mt-4 flex items-center gap-2 text-sm text-paper-dim hover:text-signal"><TbLogout /> Sign out</button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-line/[0.08] bg-ink-900/85 px-4 backdrop-blur-xl sm:px-7">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">Admin panel</p>
            <h1 className="font-display text-xl font-medium">{tabs.find((item) => item.id === tab)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <select value={tab} onChange={(event) => setTab(event.target.value)} className="rounded-xl border border-line/[0.1] bg-ink-800 px-3 py-2 text-sm lg:hidden">
              {tabs.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-xl border border-line/[0.1] bg-ink-800 text-paper-dim">
              {theme === 'dark' ? <TbMoon /> : <TbSun />}
            </button>
            <a href={import.meta.env.BASE_URL} className="rounded-xl border border-line/[0.1] bg-ink-800 px-4 py-2 text-sm text-paper-dim hover:text-paper">View site</a>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-7">
          {tab === 'dashboard' && <Dashboard token={token} onNavigate={setTab} />}
          {tab === 'content' && <ContentManager token={token} />}
          {tab === 'projects' && <ProjectManager token={token} />}
          {tab === 'inquiries' && <InquiryManager token={token} />}
        </main>
      </div>
    </div>
  );
}
