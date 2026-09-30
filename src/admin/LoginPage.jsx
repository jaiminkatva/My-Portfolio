import { useState } from 'react';
import { TbLock } from 'react-icons/tb';
import { adminApi } from '../lib/api';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  async function submit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      onLogin(await adminApi.login(form));
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-900 px-5 text-paper">
      <div className="bp-grid absolute inset-0 opacity-30" />
      <div className="absolute h-80 w-80 rounded-full bg-signal/[0.08] blur-[100px]" />
      <form onSubmit={submit} className="relative w-full max-w-md rounded-3xl border border-line/[0.1] bg-ink-800/85 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
        <a href={import.meta.env.BASE_URL} className="mb-8 flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" className="h-11 w-11 rounded-xl border border-signal/20 p-1.5" />
          <span><span className="block font-display text-lg font-medium">Portfolio Admin</span><span className="font-mono text-xs text-paper-faint">Secure access</span></span>
        </a>
        <h1 className="font-display text-3xl font-medium">Welcome back.</h1>
        <p className="mt-2 text-sm text-paper-dim">Sign in with the account created by the admin seed command.</p>
        <label className="mt-7 block text-sm text-paper-dim">Email
          <input type="email" required autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-xl border border-line/[0.1] bg-ink-900 px-4 py-3 text-paper outline-none focus:border-signal/50" />
        </label>
        <label className="mt-5 block text-sm text-paper-dim">Password
          <input type="password" required minLength={8} autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-2 w-full rounded-xl border border-line/[0.1] bg-ink-900 px-4 py-3 text-paper outline-none focus:border-signal/50" />
        </label>
        {status.error && <p role="alert" className="mt-4 text-sm text-red-400">{status.error}</p>}
        <button type="submit" disabled={status.loading} className="nav-cta mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-ink-900 disabled:opacity-60">
          <TbLock /> {status.loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
