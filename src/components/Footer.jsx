import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { TbMail } from 'react-icons/tb';
import { identity } from '../data/content';

const socials = [
  { href: `mailto:${identity.email}`, label: 'Email', Icon: TbMail },
  { href: identity.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn, external: true },
  { href: identity.github, label: 'GitHub', Icon: FaGithub, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/[0.07] bg-ink-900 py-9">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 px-6 text-sm text-paper-faint md:flex-row md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-signal/20 p-1">
            <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" width="22" height="19" loading="lazy" className="h-full w-full object-contain" />
          </span>
          <span className="h-4 w-px bg-line/10" />
          <span>© {year} {identity.name} · Backend Engineer · Team Lead</span>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="grid h-9 w-9 place-items-center rounded-full border border-line/[0.08] transition-colors hover:border-signal/30 hover:text-signal"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
          <span className="mx-1 h-4 w-px bg-line/10" />
          <a href="#top" className="rounded-full border border-line/[0.08] px-4 py-2 transition-colors hover:border-signal/30 hover:text-signal">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
