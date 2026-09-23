const paths = {
  backend: <><path d="M7 8.5 12 5l5 3.5v7L12 19l-5-3.5v-7Z" /><path d="m9.5 10 2.5 1.5 2.5-1.5M12 11.5V15" /></>,
  platforms: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M5 10h14M10 10v9" /></>,
  gis: <><path d="M5 18V7l4-2 6 2 4-2v11l-4 3-6-2-4 1Z" /><path d="M9 5v12m6-10v12" /></>,
  realtime: <><path d="M13 3 7 13h5l-1 8 6-11h-5l1-7Z" /></>,
  infra: <><path d="M5 8h14v9H5zM8 5h8v3M8 20h8" /><circle cx="8" cy="12.5" r=".7" fill="currentColor" stroke="none" /></>,
  architecture: <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="m11 7-4 9m6-9 4 9M8 18h8" /></>,
  data: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
  cloud: <><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6.2 9 4.5 4.5 0 0 0 7 18Z" /></>,
  development: <><path d="m9 7-5 5 5 5m6-10 5 5-5 5M13 4l-2 16" /></>,
  frontend: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M4 9h16M7 7h.01M10 7h.01" /></>,
  leadership: <><circle cx="12" cy="7" r="3" /><path d="M6 20v-2c0-3.3 2.7-6 6-6s6 2.7 6 6v2M5 10a2.5 2.5 0 0 0-2 2.5M19 10a2.5 2.5 0 0 1 2 2.5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
};

export default function SystemIcon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.architecture}
    </svg>
  );
}
