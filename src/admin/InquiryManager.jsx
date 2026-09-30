import { useEffect, useMemo, useState } from 'react';
import {
  TbArrowLeft,
  TbArrowUpRight,
  TbBriefcase,
  TbBuilding,
  TbCalendarTime,
  TbCheck,
  TbChevronRight,
  TbInbox,
  TbMail,
  TbNotes,
  TbRefresh,
  TbSearch,
  TbUser,
} from 'react-icons/tb';
import { adminApi } from '../lib/api';

const statuses = ['new', 'read', 'replied', 'archived'];

const statusStyles = {
  new: 'border-signal/30 bg-signal/[0.1] text-signal',
  read: 'border-system/25 bg-system/[0.07] text-system',
  replied: 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300',
  archived: 'border-line/[0.12] bg-line/[0.04] text-paper-dim',
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium capitalize ${statusStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function InfoItem({ Icon, label, children }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-2 text-[13px] font-medium text-paper-dim"><Icon className="h-4 w-4 text-paper-dim" />{label}</dt>
      <dd className="mt-2 break-words text-[15px] font-medium leading-5 text-paper">{children}</dd>
    </div>
  );
}

function formatDate(value, options) {
  return new Intl.DateTimeFormat(undefined, options).format(new Date(value));
}

function formatListDate(value) {
  const date = new Date(value);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return formatDate(value, { hour: '2-digit', minute: '2-digit' });
  }
  return formatDate(value, { day: '2-digit', month: 'short' });
}

export default function InquiryManager({ token }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mobileDetail, setMobileDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({ type: '', text: '' });

  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items
      .filter((item) => {
        const matchesStatus = filter === 'all' || item.status === filter;
        const matchesSearch = !term || [item.name, item.email, item.company, item.service, item.message]
          .some((value) => value?.toLowerCase().includes(term));
        return matchesStatus && matchesSearch;
      })
      .sort((first, second) => {
        const difference = new Date(second.createdAt) - new Date(first.createdAt);
        return sort === 'newest' ? difference : -difference;
      });
  }, [filter, items, search, sort]);

  const counts = useMemo(() => statuses.reduce((result, status) => ({
    ...result,
    [status]: items.filter((item) => item.status === status).length,
  }), { all: items.length }), [items]);

  const original = items.find((item) => item._id === selected?._id);
  const hasChanges = Boolean(selected && original
    && (selected.status !== original.status || (selected.notes || '') !== (original.notes || '')));

  async function load() {
    setLoading(true);
    setNotice({ type: '', text: '' });
    try {
      const inquiries = await adminApi.listInquiries(token);
      setItems(inquiries);
      setSelected((current) => inquiries.find((item) => item._id === current?._id) || inquiries[0] || null);
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!visibleItems.some((item) => item._id === selected?._id)) {
      setSelected(visibleItems[0] || null);
    }
  }, [filter, search]); // eslint-disable-line react-hooks/exhaustive-deps

  function selectInquiry(item) {
    setSelected(item);
    setNotice({ type: '', text: '' });
    setMobileDetail(true);
  }

  function stageStatus(status) {
    setSelected((current) => current ? { ...current, status } : current);
    setNotice({ type: '', text: '' });
  }

  async function save() {
    if (!selected || saving) return;
    setSaving(true);
    setNotice({ type: '', text: '' });
    try {
      const updated = await adminApi.updateInquiry(token, selected._id, {
        status: selected.status,
        notes: selected.notes || '',
      });
      setItems((current) => current.map((item) => item._id === updated._id ? updated : item));
      setSelected(updated);
      if (filter !== 'all' && filter !== updated.status) setFilter('all');
      setNotice({ type: 'success', text: 'Inquiry updated successfully.' });
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  }

  const replyHref = selected
    ? `mailto:${selected.email}?subject=${encodeURIComponent('Re: Your project inquiry')}`
    : '#';

  return (
    <div className="grid gap-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium text-paper">Inquiries</h2>
          <p className="mt-1.5 text-sm leading-5 text-paper-dim">Manage and respond to incoming project inquiries.</p>
        </div>
        <dl className="grid max-w-full shrink-0 grid-cols-5 divide-x divide-line/[0.1] overflow-hidden rounded-xl border border-line/[0.12] bg-ink-800/75">
          {[
            ['Total', counts.all],
            ['New', counts.new],
            ['Read', counts.read],
            ['Replied', counts.replied],
            ['Archived', counts.archived],
          ].map(([label, value]) => (
            <div key={label} className="min-w-[62px] px-3 py-2 text-center sm:min-w-[70px]">
              <dt className="font-mono text-[9px] uppercase tracking-[0.08em] text-paper-faint">{label}</dt>
              <dd className={`mt-0.5 font-display text-base font-semibold ${label === 'New' && value ? 'text-signal' : 'text-paper'}`}>{value || 0}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className={`${mobileDetail ? 'hidden md:flex' : 'flex'} flex-col gap-3 rounded-2xl border border-line/[0.1] bg-ink-800/65 p-3 md:flex-row md:items-center`}>
        <label className="relative block min-w-0 flex-1 md:max-w-sm">
          <span className="sr-only">Search inquiries</span>
          <TbSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-faint" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search inquiries…" className="w-full rounded-xl border border-line/[0.12] bg-ink-900/75 py-2.5 pl-10 pr-4 text-sm text-paper outline-none placeholder:text-paper-faint focus:border-signal/45" />
        </label>

        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto" aria-label="Filter inquiries by status">
          {['all', ...statuses].map((status) => (
            <button key={status} type="button" onClick={() => setFilter(status)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors ${filter === status ? 'bg-signal text-ink-900' : 'text-paper-dim hover:bg-line/[0.05] hover:text-paper'}`}>
              {status} <span className="ml-1 opacity-65">{counts[status] || 0}</span>
            </button>
          ))}
        </div>

        <div className="flex shrink-0 gap-2">
          <label className="flex-1"><span className="sr-only">Sort inquiries</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full rounded-xl border border-line/[0.12] bg-ink-900 px-3 py-2.5 text-xs text-paper-dim outline-none focus:border-signal/45"><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
          <button type="button" onClick={load} aria-label="Refresh inquiries" title="Refresh inquiries" className="grid h-10 w-10 place-items-center rounded-xl border border-line/[0.12] bg-ink-900 text-paper-dim hover:border-signal/30 hover:text-signal"><TbRefresh className={loading ? 'animate-spin' : ''} /></button>
        </div>
      </section>

      <div className="grid md:h-[calc(100vh-15rem)] md:min-h-[580px] md:grid-cols-[minmax(275px,37%)_minmax(0,63%)]">
        <section className={`${mobileDetail ? 'hidden md:flex' : 'flex'} min-w-0 flex-col overflow-hidden rounded-2xl border border-line/[0.1] bg-ink-800/70 md:rounded-r-none md:border-r-0`}>
          <div className="flex items-center justify-between border-b border-line/[0.09] px-4 py-3">
            <div><h3 className="text-sm font-semibold text-paper">Inbox</h3><p className="mt-0.5 text-xs text-paper-faint">{visibleItems.length} {visibleItems.length === 1 ? 'inquiry' : 'inquiries'}</p></div>
            {counts.new > 0 && <span className="rounded-full bg-signal/[0.1] px-2.5 py-1 text-xs font-medium text-signal">{counts.new} new</span>}
          </div>

          <div className="min-h-64 flex-1 divide-y divide-line/[0.08] overflow-y-auto">
            {loading && !items.length && <div className="grid min-h-64 place-items-center"><span className="text-sm text-paper-dim">Loading inquiries…</span></div>}
            {!loading && visibleItems.map((item) => {
              const active = selected?._id === item._id;
              return (
                <button key={item._id} type="button" onClick={() => selectInquiry(item)} className={`group relative block w-full px-4 py-3.5 text-left transition-colors ${active ? 'bg-signal/[0.075]' : 'hover:bg-line/[0.035]'}`}>
                  {item.status === 'new' && <span className="absolute bottom-3 left-0 top-3 w-0.5 rounded-r-full bg-signal" />}
                  <span className="flex items-start gap-3">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold uppercase ${active ? 'border-signal/30 bg-signal/[0.1] text-signal' : 'border-line/[0.12] bg-ink-900 text-paper-dim'}`}>{item.name?.charAt(0) || '?'}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3"><strong className={`truncate text-sm ${item.status === 'new' ? 'font-semibold text-paper' : 'font-medium text-paper'}`}>{item.name}</strong><span className="shrink-0 text-[11px] text-paper-faint">{formatListDate(item.createdAt)}</span></span>
                      <span className="mt-0.5 block truncate text-xs text-paper-dim">{item.company || 'Independent'} · {item.service || 'General inquiry'}</span>
                      <span className="mt-2 block truncate text-sm text-paper-dim">{item.message}</span>
                      <span className="mt-2 flex items-center justify-between"><StatusBadge status={item.status} /><TbChevronRight className={`h-4 w-4 ${active ? 'text-signal' : 'text-paper-faint group-hover:text-paper'}`} /></span>
                    </span>
                  </span>
                </button>
              );
            })}
            {!loading && !visibleItems.length && <div className="grid min-h-64 place-items-center px-5 text-center"><div><TbInbox className="mx-auto h-7 w-7 text-paper-faint" /><p className="mt-3 text-sm text-paper">No matching inquiries</p><p className="mt-1 text-xs text-paper-dim">Try a different search or filter.</p></div></div>}
          </div>
        </section>

        <section className={`${mobileDetail ? 'flex' : 'hidden md:flex'} min-w-0 flex-col overflow-hidden rounded-2xl border border-line/[0.1] bg-ink-800/70 md:rounded-l-none`}>
          {!selected ? (
            <div className="grid flex-1 place-items-center px-6 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-line/[0.1] bg-ink-900 text-paper-faint"><TbMail className="h-5 w-5" /></span><h3 className="mt-4 font-display text-lg text-paper">Select an inquiry</h3><p className="mt-1 text-sm text-paper-dim">Choose a conversation to view its details.</p></div></div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <header className="border-b border-line/[0.1]">
                  <button type="button" onClick={() => setMobileDetail(false)} className="inquiry-mobile-back w-full items-center gap-2 border-b border-line/[0.08] px-5 py-3 text-sm font-medium text-paper-dim hover:text-signal"><TbArrowLeft /> Back to inquiries</button>
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-signal/25 bg-signal/[0.09] font-display text-base font-semibold uppercase text-signal">{selected.name?.charAt(0) || '?'}</span>
                      <div className="min-w-0"><h3 className="truncate font-display text-xl font-semibold text-paper">{selected.name}</h3><a href={`mailto:${selected.email}`} className="mt-1.5 inline-flex max-w-full items-center gap-1.5 truncate text-sm font-medium text-system hover:text-signal"><TbMail className="shrink-0" /><span className="truncate">{selected.email}</span></a></div>
                    </div>
                    <div className="flex shrink-0 items-end gap-2">
                      <label className="min-w-32"><span className="mb-1.5 block text-[11px] font-medium text-paper-dim">Current status</span><select value={selected.status} onChange={(event) => stageStatus(event.target.value)} className="w-full rounded-xl border border-line/[0.14] bg-ink-900 px-3 py-2.5 text-sm capitalize text-paper outline-none focus:border-signal/45">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
                      <a href={replyHref} className="nav-cta inline-flex h-[42px] items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-ink-900">Reply <TbArrowUpRight /></a>
                    </div>
                  </div>
                </header>

                <div className="grid gap-6 p-5 sm:p-6">
                  <section>
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-dim">Contact information</h4>
                    <dl className="mt-3 grid gap-x-6 gap-y-5 rounded-xl border border-line/[0.12] bg-ink-900/55 p-5 sm:grid-cols-2 xl:grid-cols-4">
                      <InfoItem Icon={TbUser} label="Name">{selected.name}</InfoItem>
                      <InfoItem Icon={TbMail} label="Email"><a href={`mailto:${selected.email}`} className="text-system hover:text-signal">{selected.email}</a></InfoItem>
                      <InfoItem Icon={TbBuilding} label="Company">{selected.company || 'Not provided'}</InfoItem>
                      <InfoItem Icon={TbCalendarTime} label="Received">{formatDate(selected.createdAt, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</InfoItem>
                    </dl>
                  </section>

                  <section>
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-dim">Project details</h4>
                    <dl className="mt-3 grid gap-x-6 gap-y-5 rounded-xl border border-line/[0.12] bg-ink-900/55 p-5 sm:grid-cols-2">
                      <InfoItem Icon={TbBriefcase} label="Service">{selected.service || 'Not selected'}</InfoItem>
                      <InfoItem Icon={TbNotes} label="Budget / engagement">{selected.budget || 'Not decided'}</InfoItem>
                    </dl>
                  </section>

                  <section>
                    <div className="flex items-center justify-between gap-3"><h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-dim">Project brief</h4><span className="rounded-full border border-line/[0.1] px-2.5 py-1 text-[11px] text-paper-dim">Customer message</span></div>
                    <div className="mt-3 min-h-24 whitespace-pre-wrap rounded-xl border border-line/[0.12] bg-ink-900/70 p-5 text-[15px] leading-7 text-paper">{selected.message}</div>
                  </section>

                  <label className="block rounded-xl border border-signal/20 bg-signal/[0.045] p-5">
                    <span className="flex items-start justify-between gap-3"><span><strong className="block text-[15px] font-semibold text-paper">Private notes</strong><span className="mt-1.5 block text-[13px] text-paper-dim">Internal only — never shown to the customer.</span></span><span className="shrink-0 text-xs text-paper-dim">{(selected.notes || '').length}/2000</span></span>
                    <textarea value={selected.notes || ''} onChange={(event) => { setSelected({ ...selected, notes: event.target.value }); setNotice({ type: '', text: '' }); }} maxLength={2000} placeholder="Add follow-up details or next steps…" className="mt-4 min-h-28 w-full resize-y rounded-lg border border-line/[0.14] bg-ink-900 p-4 text-[15px] leading-6 text-paper outline-none placeholder:text-paper-faint focus:border-signal/50 focus:shadow-[0_0_0_3px_rgb(var(--color-signal)/0.06)]" />
                  </label>
                </div>
              </div>

              <div className="sticky bottom-0 border-t border-line/[0.12] bg-ink-800/95 p-4 backdrop-blur-xl sm:p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <span className={`text-[13px] font-medium ${notice.type === 'error' ? 'text-red-300' : notice.type === 'success' ? 'text-system' : 'text-paper-dim'}`} role="status">{notice.text || (hasChanges ? 'Unsaved changes' : 'All changes saved')}</span>
                  <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                    <button type="button" onClick={() => stageStatus('read')} className={`rounded-lg border px-3.5 py-2.5 text-[13px] font-medium ${selected.status === 'read' ? 'border-system/30 bg-system/[0.08] text-system' : 'border-line/[0.12] text-paper-dim hover:text-paper'}`}>Mark read</button>
                    <button type="button" onClick={() => stageStatus('replied')} className={`rounded-lg border px-3.5 py-2.5 text-[13px] font-medium ${selected.status === 'replied' ? 'border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-300' : 'border-line/[0.12] text-paper-dim hover:text-paper'}`}>Mark replied</button>
                    <button type="button" onClick={() => stageStatus('archived')} className={`rounded-lg border px-3.5 py-2.5 text-[13px] font-medium ${selected.status === 'archived' ? 'border-signal/30 bg-signal/[0.08] text-signal' : 'border-line/[0.12] text-paper-dim hover:text-paper'}`}>Archive</button>
                    <button type="button" onClick={save} disabled={!hasChanges || saving} className="nav-cta col-span-3 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-ink-900 disabled:cursor-not-allowed disabled:opacity-45 sm:col-span-1">{saving ? <><TbRefresh className="animate-spin" />Saving…</> : <><TbCheck />Save changes</>}</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
