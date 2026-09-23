import {
  SiCloudflare,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMaplibre,
  SiMaptiler,
  SiMongodb,
  SiMongoose,
  SiNginx,
  SiNodedotjs,
  SiPm2,
  SiPostman,
  SiQgis,
  SiReact,
  SiRedis,
  SiSocketdotio,
} from 'react-icons/si';
import { FaAws, FaLayerGroup } from 'react-icons/fa6';
import {
  TbApi,
  TbAutomation,
  TbBuilding,
  TbBuildingEstate,
  TbCalendarClock,
  TbCash,
  TbChartInfographic,
  TbDatabase,
  TbFileText,
  TbLayersLinked,
  TbMap2,
  TbRoute,
  TbServer,
  TbSettingsAutomation,
  TbTopologyFull,
} from 'react-icons/tb';

const marks = {
  'Node.js': [SiNodedotjs, '#5FA04E'],
  'Express.js': [SiExpress, '#E8EAED'],
  JavaScript: [SiJavascript, '#F7DF1E'],
  'REST APIs': [TbApi, '#FF8A3D'],
  MongoDB: [SiMongodb, '#47A248'],
  Mongoose: [SiMongoose, '#B85C5C'],
  Redis: [SiRedis, '#FF4438'],
  'Socket.IO': [SiSocketdotio, '#E8EAED'],
  Docker: [SiDocker, '#2496ED'],
  Nginx: [SiNginx, '#009639'],
  PM2: [SiPm2, '#A88BFA'],
  VPS: [TbServer, '#5EC8D8'],
  Cloudflare: [SiCloudflare, '#F38020'],
  'AWS S3': [FaAws, '#FF9900'],
  MapTiler: [SiMaptiler, '#5EC8D8'],
  MapLibre: [SiMaplibre, '#74C7A5'],
  MBTiles: [TbDatabase, '#A88BFA'],
  'GIS applications': [SiQgis, '#589632'],
  GIS: [TbMap2, '#74C7A5'],
  Postman: [SiPostman, '#FF6C37'],
  React: [SiReact, '#61DAFB'],
  Automation: [TbAutomation, '#FF8A3D'],
  'ERP Architecture': [TbTopologyFull, '#A88BFA'],
  'HR Automation': [TbSettingsAutomation, '#5EC8D8'],
  Attendance: [TbCalendarClock, '#F7C65D'],
  Payroll: [TbCash, '#6BD6A4'],
  'Workflow Engine': [TbRoute, '#7DA6FF'],
  'Document Generation': [TbFileText, '#F18BB8'],
  'Tile Serving': [TbServer, '#5EC8D8'],
  'Mapping Infrastructure': [TbLayersLinked, '#A88BFA'],
  'Real Estate': [TbBuildingEstate, '#FF8A3D'],
  Construction: [TbBuilding, '#F7C65D'],
  'ERP Visualization': [TbChartInfographic, '#F18BB8'],
};

export default function TechnologyMark({ name, className = 'h-[18px] w-[18px]' }) {
  if (name === 'Git / GitHub') {
    return (
      <span className="flex items-center gap-1" aria-hidden="true">
        <SiGit className="h-4 w-4 text-[#F05032]" />
        <SiGithub className="h-4 w-4 text-paper" />
      </span>
    );
  }

  if (name === 'MERN ecosystem') {
    return (
      <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
        <SiMongodb className="h-2.5 w-2.5 text-[#47A248]" />
        <SiExpress className="h-2.5 w-2.5 text-paper" />
        <SiReact className="h-2.5 w-2.5 text-[#61DAFB]" />
        <SiNodedotjs className="h-2.5 w-2.5 text-[#5FA04E]" />
      </span>
    );
  }

  const [Icon, color] = marks[name] || [FaLayerGroup, '#AAB2C0'];
  return <Icon className={className} style={{ color }} aria-hidden="true" />;
}
