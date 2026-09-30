import { useEffect, useState } from 'react';
import { TbArrowRight, TbBriefcase, TbFileText, TbInbox, TbStar } from 'react-icons/tb';
import { adminApi } from '../lib/api';

export default function Dashboard({ token, onNavigate }) {
  const [data, setData] = useState({ loading: true, error: '', projects: [], inquiries: [] });

  useEffect(() => {
    Promise.all([adminApi.listProjects(token), adminApi.listInquiries(token)])
      .then(([projects, inquiries]) => setData({ loading: false, error: '', projects, inquiries }))
      .catch((error) => setData((current) => ({ ...current, loading: false, error: error.message })));
  }, [token]);

  if (data.loading) return <p className="font-mono text-sm text-paper-faint">Loading dashboard…</p>;
  if (data.error) return <p className="text-sm text-red-400">{data.error}</p>;

  const cards = [
    { label: 'Published projects', value: data.projects.filter((item) => item.published).length, Icon: TbBriefcase, color: 'text-system' },
    { label: 'Project drafts', value: data.projects.filter((item) => !item.published).length, Icon: TbFileText, color: 'text-signal' },
    { label: 'New enquiries', value: data.inquiries.filter((item) => item.status === 'new').length, Icon: TbInbox, color: 'text-system' },
    { label: 'Featured projects', value: data.projects.filter((item) => item.featured).length, Icon: TbStar, color: 'text-signal' },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, Icon, color }) => (
          <article key={label} className="rounded-2xl border border-line/[0.08] bg-ink-800/70 p-5">
            <Icon className={`h-6 w-6 ${color}`} />
            <p className="mt-5 font-display text-3xl font-medium">{value}</p>
            <p className="mt-1 text-sm text-paper-faint">{label}</p>
          </article>
        ))}
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line/[0.08] bg-ink-800/70 p-5">
          <div className="flex items-center justify-between"><h2 className="font-display text-xl">Recent enquiries</h2><button onClick={() => onNavigate('inquiries')} className="text-sm text-signal">View all</button></div>
          <div className="mt-4 divide-y divide-line/[0.07]">
            {data.inquiries.slice(0, 5).map((item) => (
              <button key={item._id} onClick={() => onNavigate('inquiries')} className="flex w-full items-center justify-between gap-4 py-4 text-left">
                <span className="min-w-0"><span className="block truncate text-sm text-paper">{item.name}</span><span className="block truncate text-xs text-paper-faint">{item.email}</span></span>
                <span className="rounded-full border border-line/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase text-paper-dim">{item.status}</span>
              </button>
            ))}
            {!data.inquiries.length && <p className="py-6 text-sm text-paper-faint">No enquiries yet.</p>}
          </div>
        </section>
        <section className="rounded-2xl border border-line/[0.08] bg-ink-800/70 p-5">
          <div className="flex items-center justify-between"><h2 className="font-display text-xl">Projects</h2><button onClick={() => onNavigate('projects')} className="text-sm text-signal">Manage</button></div>
          <div className="mt-4 divide-y divide-line/[0.07]">
            {data.projects.slice(0, 5).map((item) => (
              <button key={item._id} onClick={() => onNavigate('projects')} className="flex w-full items-center justify-between gap-4 py-4 text-left">
                <span className="min-w-0"><span className="block truncate text-sm text-paper">{item.title}</span><span className="block truncate text-xs text-paper-faint">{item.category}</span></span>
                <span className={item.published ? 'text-xs text-system' : 'text-xs text-signal'}>{item.published ? 'Published' : 'Draft'} <TbArrowRight className="inline" /></span>
              </button>
            ))}
            {!data.projects.length && <p className="py-6 text-sm text-paper-faint">Create your first project.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
