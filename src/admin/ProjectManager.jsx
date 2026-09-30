import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbAlertTriangle, TbEdit, TbPlus, TbRefresh, TbTrash, TbX } from "react-icons/tb";
import { adminApi } from "../lib/api";

const blank = {
  slug: "",
  title: "",
  shortTitle: "",
  category: "",
  summary: "",
  description: "",
  technologies: "",
  tags: "",
  responsibilities: "",
  modules: "",
  projectUrl: "",
  repositoryUrl: "",
  featured: false,
  published: false,
  displayOrder: 0,
  uspTitle: "",
  uspBody: "",
  problem: "",
  architecture: "",
  challenge: "",
  solution: "",
  outcome: "",
  workflow: "",
};

const lines = (value = "") =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
const commaList = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function toForm(project) {
  if (!project) return { ...blank };
  return {
    ...blank,
    ...project,
    technologies: (project.technologies || []).join(", "),
    tags: (project.tags || []).join(", "),
    responsibilities: (project.responsibilities || []).join("\n"),
    modules: (project.modules || []).join("\n"),
    problem: project.caseStudy?.problem || "",
    architecture: project.caseStudy?.architecture || "",
    challenge: project.caseStudy?.challenge || "",
    solution: project.caseStudy?.solution || "",
    outcome: project.caseStudy?.outcome || "",
    workflow: (project.caseStudy?.workflow || []).join("\n"),
    uspTitle: project.usp?.title || "",
    uspBody: project.usp?.body || "",
  };
}

function toPayload(form) {
  return {
    slug: slugify(form.slug || form.title),
    title: form.title,
    shortTitle: form.shortTitle,
    category: form.category,
    summary: form.summary,
    description: form.description,
    technologies: commaList(form.technologies),
    tags: commaList(form.tags),
    responsibilities: lines(form.responsibilities),
    modules: lines(form.modules),
    projectUrl: form.projectUrl,
    repositoryUrl: form.repositoryUrl,
    featured: form.featured,
    published: form.published,
    displayOrder: Number(form.displayOrder) || 0,
    usp: { title: form.uspTitle, body: form.uspBody },
    caseStudy: {
      problem: form.problem,
      architecture: form.architecture,
      challenge: form.challenge,
      solution: form.solution,
      outcome: form.outcome,
      workflow: lines(form.workflow),
    },
  };
}

const inputClass = "mt-2 w-full rounded-xl border border-line/[0.1] bg-ink-900 px-3.5 py-2.5 text-sm text-paper outline-none focus:border-signal/50";

function Field({ label, name, form, setForm, required = false, type = "text" }) {
  return (
    <label className="text-sm text-paper-dim">
      {label}
      <input
        type={type}
        required={required}
        name={name}
        value={form[name]}
        onChange={(event) => setForm({ ...form, [name]: event.target.value })}
        className={inputClass}
      />
    </label>
  );
}

function TitleField({ form, setForm }) {
  function updateTitle(event) {
    const title = event.target.value;
    const slugWasGenerated = !form.slug || form.slug === slugify(form.title);
    setForm({ ...form, title, ...(slugWasGenerated ? { slug: slugify(title) } : {}) });
  }

  return (
    <label className="text-sm text-paper-dim">
      Full title
      <input required name="title" value={form.title} onChange={updateTitle} className={inputClass} />
    </label>
  );
}

function SlugField({ form, setForm }) {
  function updateSlug(event) {
    setForm({ ...form, slug: slugify(event.target.value) });
  }

  return (
    <label className="text-sm text-paper-dim">
      Slug
      <input
        required
        name="slug"
        value={form.slug}
        onChange={updateSlug}
        pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        placeholder="project-name"
        autoCapitalize="none"
        spellCheck="false"
        className={inputClass}
      />
      <span className="mt-1.5 block text-xs leading-5 text-paper-faint">
        Used in the project URL. Spaces and special characters are converted to hyphens automatically.
      </span>
    </label>
  );
}

function Area({ label, name, form, setForm, required = false, hint = "" }) {
  return (
    <label className="block text-sm text-paper-dim">
      {label}
      {hint && <span className="ml-2 text-xs text-paper-faint">{hint}</span>}
      <textarea
        required={required}
        name={name}
        value={form[name]}
        onChange={(event) => setForm({ ...form, [name]: event.target.value })}
        className={`${inputClass} min-h-24 resize-y`}
      />
    </label>
  );
}

function ProjectToggle({ label, checked, disabled, tone, onChange }) {
  const activeTrack = tone === "system" ? "border-system/35 bg-system/20" : "border-signal/35 bg-signal/20";
  const activeKnob = tone === "system" ? "bg-system" : "bg-signal";
  const activeText = tone === "system" ? "text-system" : "text-signal";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${checked ? "Disable" : "Enable"} ${label}`}
      disabled={disabled}
      onClick={onChange}
      className="group inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-55">
      <span className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${checked ? activeTrack : "border-line/[0.14] bg-ink-900"}`}>
        <span
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-all ${checked ? `left-[18px] ${activeKnob}` : "left-1 bg-paper-faint"}`}
        />
      </span>
      <span className={`text-xs font-medium transition-colors ${checked ? activeText : "text-paper-faint group-hover:text-paper-dim"}`}>{label}</span>
    </button>
  );
}

export default function ProjectManager({ token }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState(null);
  const [form, setForm] = useState({ ...blank });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    setStatus("");
    try {
      setItems(await adminApi.listProjects(token));
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function edit(project = null) {
    setEditing(project?._id || "new");
    setForm(toForm(project));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("Saving…");
    try {
      if (editing === "new") await adminApi.createProject(token, toPayload(form));
      else await adminApi.updateProject(token, editing, toPayload(form));
      setEditing(null);
      setForm({ ...blank });
      await load();
      setStatus("Project saved");
    } catch (error) {
      const fieldErrors = error.details?.fieldErrors;
      setStatus(fieldErrors ? Object.values(fieldErrors).flat().join(" ") : error.message);
    }
  }

  useEffect(() => {
    if (!deleteTarget) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape" && !deleting) setDeleteTarget(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [deleteTarget, deleting]);

  async function remove() {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await adminApi.deleteProject(token, deleteTarget._id);
      const deletedTitle = deleteTarget.title;
      setDeleteTarget(null);
      await load();
      setStatus(`“${deletedTitle}” was deleted.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setDeleting(false);
    }
  }

  async function toggleProjectFlag(project, field) {
    if (updatingProjectId) return;
    setUpdatingProjectId(project._id);
    setStatus(`Updating ${field}…`);
    try {
      const updated = await adminApi.updateProject(token, project._id, { [field]: !project[field] });
      setItems((current) => current.map((item) => (item._id === updated._id ? updated : item)));
      const label = field === "published" ? "Publishing" : "Featured status";
      setStatus(`${label} updated for “${updated.title}”.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setUpdatingProjectId(null);
    }
  }

  if (editing) {
    return (
      <form onSubmit={submit} className="rounded-2xl border border-line/[0.08] bg-ink-800/70 p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 border-b border-line/[0.08] pb-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">{editing === "new" ? "New project" : "Edit project"}</p>
            <h2 className="mt-1 font-display text-2xl">Project content</h2>
          </div>
          <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-line/[0.1] px-4 py-2 text-sm text-paper-dim">
            Cancel
          </button>
        </div>

        <fieldset className="mt-6">
          <legend className="font-display text-lg">Basics</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <TitleField form={form} setForm={setForm} />
            <Field label="Short title" name="shortTitle" form={form} setForm={setForm} />
            <SlugField form={form} setForm={setForm} />
            <Field label="Category" name="category" form={form} setForm={setForm} required />
            <Field label="Display order" name="displayOrder" type="number" form={form} setForm={setForm} />
            <div className="sm:col-span-2">
              <Area label="Summary" name="summary" form={form} setForm={setForm} required />
            </div>
            <div className="sm:col-span-2">
              <Area label="Description" name="description" form={form} setForm={setForm} />
            </div>
            <div className="sm:col-span-2">
              <Field label="All technologies" name="technologies" form={form} setForm={setForm} />
              <p className="mt-1 text-xs text-paper-faint">Separate technologies with commas.</p>
            </div>
            <div className="sm:col-span-2">
              <Field label="Cover tags" name="tags" form={form} setForm={setForm} />
              <p className="mt-1 text-xs text-paper-faint">The short technology list shown on the project cover.</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-8 border-t border-line/[0.08] pt-6">
          <legend className="font-display text-lg">Featured-work positioning</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Area label="USP title" name="uspTitle" form={form} setForm={setForm} />
            <Area label="USP description" name="uspBody" form={form} setForm={setForm} />
            <Area label="Responsibilities" name="responsibilities" form={form} setForm={setForm} hint="one per line" />
            <Area label="Modules" name="modules" form={form} setForm={setForm} hint="one per line" />
          </div>
        </fieldset>

        <fieldset className="mt-8 border-t border-line/[0.08] pt-6">
          <legend className="font-display text-lg">Case study</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Area label="Problem" name="problem" form={form} setForm={setForm} />
            <Area label="Architecture" name="architecture" form={form} setForm={setForm} />
            <Area label="Challenge" name="challenge" form={form} setForm={setForm} />
            <Area label="Solution" name="solution" form={form} setForm={setForm} />
            <Area label="Outcome" name="outcome" form={form} setForm={setForm} />
            <Area label="Workflow" name="workflow" form={form} setForm={setForm} hint="one step per line" />
          </div>
        </fieldset>

        <fieldset className="mt-8 border-t border-line/[0.08] pt-6">
          <legend className="font-display text-lg">Links and publishing</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Live project URL" name="projectUrl" type="url" form={form} setForm={setForm} />
            <Field label="Repository URL" name="repositoryUrl" type="url" form={form} setForm={setForm} />
            <div className="flex items-end gap-6 pb-2">
              <label className="flex items-center gap-2 text-sm text-paper-dim">
                <input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-paper-dim">
                <input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /> Published
              </label>
            </div>
            <p className="text-xs leading-5 text-paper-faint sm:col-span-2">
              A project appears in the public Featured Work book only when both Featured and Published are enabled.
            </p>
          </div>
        </fieldset>

        <div className="mt-7 flex flex-col gap-3 border-t border-line/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-paper-faint" role="status">
            {status}
          </p>
          <button type="submit" className="nav-cta rounded-xl px-6 py-3 text-sm font-medium text-ink-900">
            Save project
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-line/[0.08] bg-ink-800/70">
        <div className="flex flex-col gap-4 border-b border-line/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl">Portfolio projects</h2>
            <p className="mt-1 text-sm text-paper-faint">Published records appear on the public portfolio.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} aria-label="Refresh projects" className="grid h-10 w-10 place-items-center rounded-xl border border-line/[0.1]">
              <TbRefresh />
            </button>
            <button onClick={() => edit()} className="nav-cta flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-ink-900">
              <TbPlus /> Add project
            </button>
          </div>
        </div>
        {status && (
          <p className="border-b border-line/[0.08] px-5 py-3 text-sm text-paper-faint" role="status">
            {status}
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="font-mono text-xs uppercase tracking-[0.1em] text-paper-faint">
              <tr>
                <th className="px-5 py-4">Project</th>
                <th className="px-5 py-4">Visibility</th>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/[0.07]">
              {loading && (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-paper-faint">
                    Loading projects…
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((project) => (
                  <tr key={project._id} className="hover:bg-line/[0.02]">
                    <td className="px-5 py-4">
                      <span className="block font-medium text-paper">{project.title}</span>
                      <span className="text-xs text-paper-faint">
                        {project.category} · /{project.slug}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <ProjectToggle
                          label="Published"
                          checked={project.published}
                          disabled={updatingProjectId === project._id}
                          tone="system"
                          onChange={() => toggleProjectFlag(project, "published")}
                        />
                        <ProjectToggle
                          label="Featured"
                          checked={project.featured}
                          disabled={updatingProjectId === project._id}
                          tone="signal"
                          onChange={() => toggleProjectFlag(project, "featured")}
                        />
                        {updatingProjectId === project._id && <TbRefresh className="h-4 w-4 animate-spin text-paper-faint" aria-label="Saving project" />}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-paper-dim">{project.displayOrder}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => edit(project)}
                          aria-label={`Edit ${project.title}`}
                          title="Edit project"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-system/20 bg-system/[0.06] text-system transition-colors hover:border-system/40 hover:bg-system/[0.11]">
                          <TbEdit />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(project)}
                          aria-label={`Delete ${project.title}`}
                          title="Delete project"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-red-400/20 bg-red-400/[0.055] text-red-300 transition-colors hover:border-red-400/40 hover:bg-red-400/[0.11]">
                          <TbTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!loading && !items.length && (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-paper-faint">
                    No projects in the database yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-ink-900/80 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !deleting) setDeleteTarget(null);
            }}>
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-project-title"
              aria-describedby="delete-project-description"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line/[0.12] bg-ink-800 shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent" />
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                aria-label="Close confirmation"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-line/[0.1] text-paper-faint hover:border-line/[0.2] hover:text-paper disabled:opacity-40">
                <TbX className="h-4 w-4" />
              </button>

              <div className="p-6 sm:p-7">
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-red-400/25 bg-red-400/[0.08] text-red-300">
                  <motion.span
                    initial={{ scale: 0.75, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                    <TbAlertTriangle className="h-7 w-7" />
                  </motion.span>
                </div>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Confirm deletion</p>
                <h2 id="delete-project-title" className="mt-2 font-display text-2xl font-semibold text-paper">
                  Delete this project?
                </h2>
                <p id="delete-project-description" className="mt-3 text-sm leading-6 text-paper-dim">
                  You are about to permanently delete <strong className="font-semibold text-paper">“{deleteTarget.title}”</strong>. It will be removed from the
                  admin panel and the public portfolio.
                </p>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.045] p-3.5">
                  <TbTrash className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <p className="text-xs leading-5 text-paper-dim">This action cannot be undo. Choose Cancel if you want to keep the project.</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setDeleteTarget(null)}
                    disabled={deleting}
                    className="rounded-xl border border-line/[0.12] bg-line/[0.035] px-4 py-3 text-sm font-medium text-paper-dim hover:border-line/[0.22] hover:text-paper disabled:opacity-40">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={remove}
                    disabled={deleting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(248,113,113,0.16)] hover:bg-red-300 disabled:cursor-wait disabled:opacity-60">
                    {deleting ? (
                      <>
                        <TbRefresh className="h-4 w-4 animate-spin" />
                        Deleting…
                      </>
                    ) : (
                      <>
                        <TbTrash className="h-4 w-4" />
                        Delete project
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
