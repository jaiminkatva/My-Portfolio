import { useEffect, useState } from 'react';
import { TbPlus, TbTrash } from 'react-icons/tb';
import { editableContent } from '../data/content';
import { adminApi } from '../lib/api';

const sections = [
  { id: 'identity', label: 'Profile' },
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'approach', label: 'Approach' },
  { id: 'stack', label: 'Tech stack' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const cloneDefaults = () => JSON.parse(JSON.stringify(editableContent));
const inputClass = 'mt-2 w-full rounded-xl border border-line/[0.1] bg-ink-900 px-3.5 py-2.5 text-sm text-paper outline-none focus:border-signal/50';

function getAt(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

function Field({ label, path, data, update, type = 'text' }) {
  return <label className="block text-sm text-paper-dim">{label}<input className={inputClass} type={type} value={getAt(data, path) ?? ''} onChange={(event) => update(path, event.target.value)} /></label>;
}

function Area({ label, path, data, update, rows = 4 }) {
  return <label className="block text-sm text-paper-dim">{label}<textarea className={`${inputClass} resize-y`} rows={rows} value={getAt(data, path) ?? ''} onChange={(event) => update(path, event.target.value)} /></label>;
}

function ListField({ label, path, data, update, hint = 'One item per line' }) {
  const value = getAt(data, path) || [];
  return <label className="block text-sm text-paper-dim">{label}<span className="ml-2 text-xs text-paper-faint">{hint}</span><textarea className={`${inputClass} resize-y`} rows={5} value={value.join('\n')} onChange={(event) => update(path, event.target.value.split('\n'))} /></label>;
}

function Group({ title, children }) {
  return <fieldset className="rounded-2xl border border-line/[0.08] bg-ink-900/35 p-5"><legend className="px-2 font-display text-lg text-paper">{title}</legend><div className="grid gap-5 sm:grid-cols-2">{children}</div></fieldset>;
}

function Repeater({ title, items, onChange, fields, createItem }) {
  function changeItem(index, key, value) {
    onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between"><h3 className="font-display text-lg">{title}</h3><button type="button" onClick={() => onChange([...items, createItem])} className="flex items-center gap-2 rounded-xl border border-line/[0.1] px-3 py-2 text-sm text-system"><TbPlus /> Add</button></div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="rounded-2xl border border-line/[0.08] bg-ink-900/35 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => field.area ? (
                <label key={field.key} className={`text-sm text-paper-dim ${field.wide ? 'sm:col-span-2' : ''}`}>{field.label}<textarea rows={3} className={`${inputClass} resize-y`} value={field.list ? (item[field.key] || []).join('\n') : item[field.key] || ''} onChange={(event) => changeItem(index, field.key, field.list ? event.target.value.split('\n') : event.target.value)} /></label>
              ) : (
                <label key={field.key} className={`text-sm text-paper-dim ${field.wide ? 'sm:col-span-2' : ''}`}>{field.label}<input className={inputClass} value={item[field.key] || ''} onChange={(event) => changeItem(index, field.key, event.target.value)} /></label>
              ))}
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="mt-4 flex items-center gap-2 text-xs text-red-400"><TbTrash /> Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentManager({ token }) {
  const [active, setActive] = useState('identity');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('Loading content…');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getContent(token)
      .then((content) => {
        setData(content || cloneDefaults());
        setStatus(content ? '' : 'Using the current checked-in content. Save once to publish it through the API.');
      })
      .catch((error) => setStatus(error.message));
  }, [token]);

  function update(path, value) {
    setData((current) => {
      const next = JSON.parse(JSON.stringify(current));
      const keys = path.split('.');
      const finalKey = keys.pop();
      const parent = keys.reduce((object, key) => object[key], next);
      parent[finalKey] = value;
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setStatus('Saving…');
    try {
      const cleaned = JSON.parse(JSON.stringify(data), (_key, value) => Array.isArray(value) ? value.map((item) => typeof item === 'string' ? item.trim() : item).filter((item) => typeof item !== 'string' || item) : value);
      const saved = await adminApi.updateContent(token, cleaned);
      setData(saved);
      setStatus('Content published. Refresh the portfolio to see the changes.');
    } catch (error) {
      const fields = error.details?.fieldErrors;
      setStatus(fields ? Object.values(fields).flat().join(' ') : error.message);
    } finally {
      setSaving(false);
    }
  }

  if (!data) return <p className="font-mono text-sm text-paper-faint">{status}</p>;

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
      <nav className="h-fit rounded-2xl border border-line/[0.08] bg-ink-800/70 p-2 xl:sticky xl:top-24" aria-label="Content sections">
        {sections.map((section) => <button key={section.id} type="button" onClick={() => setActive(section.id)} className={`block w-full rounded-xl px-4 py-3 text-left text-sm ${active === section.id ? 'bg-signal text-ink-900' : 'text-paper-dim hover:bg-line/[0.04] hover:text-paper'}`}>{section.label}</button>)}
      </nav>

      <section className="rounded-2xl border border-line/[0.08] bg-ink-800/70 p-5 sm:p-7">
        <div className="mb-7 flex flex-col gap-4 border-b border-line/[0.08] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">Site content</p><h2 className="mt-1 font-display text-2xl">{sections.find((section) => section.id === active)?.label}</h2></div>
          <button type="button" onClick={save} disabled={saving} className="nav-cta rounded-xl px-5 py-2.5 text-sm font-medium text-ink-900 disabled:opacity-60">{saving ? 'Publishing…' : 'Publish changes'}</button>
        </div>

        <div className="grid gap-6">
          {active === 'identity' && <Group title="Profile and links"><Field label="Name" path="identity.name" data={data} update={update} /><Field label="Professional title" path="identity.title" data={data} update={update} /><ListField label="Roles" path="identity.roles" data={data} update={update} /><Area label="Brand sentence" path="identity.brandSentence" data={data} update={update} /><Field label="Email" path="identity.email" type="email" data={data} update={update} /><Field label="LinkedIn URL" path="identity.linkedin" type="url" data={data} update={update} /><Field label="GitHub URL" path="identity.github" type="url" data={data} update={update} /></Group>}

          {active === 'hero' && <><Group title="Hero copy"><Field label="Kicker" path="hero.kicker" data={data} update={update} /><Field label="Headline" path="hero.headline" data={data} update={update} /><div className="sm:col-span-2"><Area label="Supporting text" path="hero.sub" data={data} update={update} /></div><div className="sm:col-span-2"><ListField label="Technology tags" path="hero.tags" data={data} update={update} /></div></Group><Group title="Hero buttons"><Field label="Primary label" path="hero.ctaPrimary.label" data={data} update={update} /><Field label="Primary link" path="hero.ctaPrimary.href" data={data} update={update} /><Field label="Secondary label" path="hero.ctaSecondary.label" data={data} update={update} /><Field label="Secondary link" path="hero.ctaSecondary.href" data={data} update={update} /></Group></>}

          {active === 'about' && <><Group title="About section"><Field label="Eyebrow" path="about.eyebrow" data={data} update={update} /><Field label="Heading" path="about.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Section introduction" path="about.intro" data={data} update={update} /></div><Area label="Motto" path="about.motto" data={data} update={update} /><div className="sm:col-span-2"><ListField label="Paragraphs" path="about.paragraphs" data={data} update={update} /></div><div className="sm:col-span-2"><ListField label="Distinctive strengths" path="about.distinctive" data={data} update={update} /></div></Group><Group title="AI workflow"><Field label="Eyebrow" path="whyMe.eyebrow" data={data} update={update} /><Field label="Heading" path="whyMe.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Introduction" path="whyMe.intro" data={data} update={update} /></div></Group></>}

          {active === 'experience' && <><Group title="Experience"><Field label="Eyebrow" path="experience.eyebrow" data={data} update={update} /><Field label="Section heading" path="experience.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Section introduction" path="experience.intro" data={data} update={update} /></div><Field label="Role" path="experience.role" data={data} update={update} /><Field label="Badge" path="experience.badge" data={data} update={update} /><Field label="Company" path="experience.company" data={data} update={update} /><Field label="Period" path="experience.period" data={data} update={update} /><div className="sm:col-span-2"><Area label="Summary" path="experience.summary" data={data} update={update} /></div></Group><Group title="Leadership"><div className="sm:col-span-2"><ListField label="Responsibilities" path="leadership.items" data={data} update={update} /></div></Group></>}

          {active === 'approach' && <><Group title="Engineering approach"><Field label="Eyebrow" path="engineeringPhilosophy.eyebrow" data={data} update={update} /><Field label="Heading" path="engineeringPhilosophy.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Introduction" path="engineeringPhilosophy.intro" data={data} update={update} /></div></Group><Repeater title="Process steps" items={data.engineeringPhilosophy.steps} onChange={(value) => update('engineeringPhilosophy.steps', value)} createItem={{ key: '', label: '', detail: '' }} fields={[{ key: 'key', label: 'Key' }, { key: 'label', label: 'Label' }, { key: 'detail', label: 'Detail', area: true, wide: true }]} /></>}

          {active === 'stack' && <><Group title="Technology section"><Field label="Eyebrow" path="stackMeta.eyebrow" data={data} update={update} /><Field label="Heading" path="stackMeta.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Description" path="stackMeta.body" data={data} update={update} /></div></Group><Repeater title="Technology groups" items={data.stack} onChange={(value) => update('stack', value)} createItem={{ group: '', items: [] }} fields={[{ key: 'group', label: 'Group' }, { key: 'items', label: 'Technologies (one per line)', area: true, list: true, wide: true }]} /></>}

          {active === 'services' && <><Group title="Services section"><Field label="Eyebrow" path="servicesMeta.eyebrow" data={data} update={update} /><Field label="Heading" path="servicesMeta.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Description" path="servicesMeta.body" data={data} update={update} /></div></Group><Repeater title="Services" items={data.services} onChange={(value) => update('services', value)} createItem={{ id: '', title: '', description: '' }} fields={[{ key: 'id', label: 'ID' }, { key: 'title', label: 'Title' }, { key: 'description', label: 'Description', area: true, wide: true }]} /></>}

          {active === 'contact' && <Group title="Contact section"><Field label="Eyebrow" path="contact.eyebrow" data={data} update={update} /><Field label="Heading" path="contact.heading" data={data} update={update} /><div className="sm:col-span-2"><Area label="Body" path="contact.body" data={data} update={update} /></div><Field label="CTA label" path="contact.ctaLabel" data={data} update={update} /></Group>}
        </div>
        <p className={`mt-6 text-sm ${status.startsWith('Content published') ? 'text-system' : 'text-paper-faint'}`} role="status">{status}</p>
      </section>
    </div>
  );
}
