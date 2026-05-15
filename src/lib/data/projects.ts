import type { BaseMongoDocument } from '@/types/base-document';

export interface Project extends BaseMongoDocument {
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  progress: number;
  tags: string[];
  vehicleType: string;
  estimatedCost: string;
}

export interface Task extends BaseMongoDocument {
  projectId: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Member extends BaseMongoDocument {
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'active' | 'away' | 'offline';
}

export interface ActivityItem extends BaseMongoDocument {
  projectId: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'task' | 'member' | 'status' | 'comment';
}

export const MOCK_PROJECTS: Project[] = [
  {
    _id: 'proj-001',
    title: 'Collision Damage Assessment — 2022 Toyota Camry',
    description: 'Full forensic analysis of front-end collision damage including hood, bumper, fenders, and frame integrity assessment for insurance claim #INS-78234.',
    status: 'active',
    priority: 'high',
    dueDate: '2025-02-15',
    progress: 68,
    tags: ['Collision', 'Insurance Claim', 'Front-End'],
    vehicleType: 'Sedan',
    estimatedCost: '$8,400',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'proj-002',
    title: 'Hail Damage Survey — 2021 Ford F-150',
    description: 'Systematic dent mapping across roof, hood, and bed panels from severe hailstorm event. Coverage area assessment for State Farm policy #SF-442199.',
    status: 'active',
    priority: 'medium',
    dueDate: '2025-02-08',
    progress: 45,
    tags: ['Hail', 'Insurance', 'Roof'],
    vehicleType: 'Truck',
    estimatedCost: '$3,200',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-18',
  },
  {
    _id: 'proj-003',
    title: 'Side-Swipe Repair Estimate — 2023 BMW 3 Series',
    description: 'Driver-side panel damage assessment from parking lot incident. Includes door, mirror, and rocker panel evaluation for client dispute resolution.',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-01-30',
    progress: 100,
    tags: ['Side Damage', 'Luxury', 'Panel Work'],
    vehicleType: 'Sedan',
    estimatedCost: '$5,750',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-28',
  },
  {
    _id: 'proj-004',
    title: 'Rear-End Impact Analysis — 2020 Honda CR-V',
    description: 'Multi-angle photographic analysis of rear bumper, trunk, and tail light assembly damage. Structural integrity check on rear chassis rails.',
    status: 'on-hold',
    priority: 'medium',
    dueDate: '2025-03-01',
    progress: 22,
    tags: ['Rear Impact', 'SUV', 'Structural'],
    vehicleType: 'SUV',
    estimatedCost: '$4,100',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-15',
  },
];

export const MOCK_TASKS: Task[] = [
  {
    _id: 'task-001',
    projectId: 'proj-001',
    title: 'Upload initial damage photographs',
    status: 'done',
    assignee: 'Rivera, M.',
    dueDate: '2025-01-12',
    priority: 'high',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-12',
  },
  {
    _id: 'task-002',
    projectId: 'proj-001',
    title: 'Run AI damage detection scan',
    status: 'done',
    assignee: 'Chen, S.',
    dueDate: '2025-01-14',
    priority: 'high',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-14',
  },
  {
    _id: 'task-003',
    projectId: 'proj-001',
    title: 'Review hood and fender damage zones',
    status: 'in-progress',
    assignee: 'Okafor, J.',
    dueDate: '2025-01-22',
    priority: 'high',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-18',
  },
  {
    _id: 'task-004',
    projectId: 'proj-001',
    title: 'Compile frame integrity report',
    status: 'in-progress',
    assignee: 'Chen, S.',
    dueDate: '2025-01-28',
    priority: 'medium',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'task-005',
    projectId: 'proj-001',
    title: 'Generate insurance claim documentation',
    status: 'todo',
    assignee: 'Rivera, M.',
    dueDate: '2025-02-05',
    priority: 'medium',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
  },
  {
    _id: 'task-006',
    projectId: 'proj-001',
    title: 'Final client review and sign-off',
    status: 'todo',
    assignee: 'Okafor, J.',
    dueDate: '2025-02-12',
    priority: 'low',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
  },
];

export const MOCK_MEMBERS: Member[] = [
  {
    _id: 'mem-001',
    name: 'Marcus Rivera',
    role: 'Lead Assessor',
    email: 'marcus.rivera@dentascan.io',
    avatar: 'MR',
    status: 'active',
    createdAt: '2024-06-01',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'mem-002',
    name: 'Sofia Chen',
    role: 'AI Analyst',
    email: 'sofia.chen@dentascan.io',
    avatar: 'SC',
    status: 'active',
    createdAt: '2024-07-15',
    updatedAt: '2025-01-18',
  },
  {
    _id: 'mem-003',
    name: 'James Okafor',
    role: 'Technical Inspector',
    email: 'james.okafor@dentascan.io',
    avatar: 'JO',
    status: 'away',
    createdAt: '2024-09-01',
    updatedAt: '2025-01-15',
  },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    _id: 'act-001',
    projectId: 'proj-001',
    actor: 'Sofia Chen',
    action: 'completed',
    target: 'AI damage detection scan',
    timestamp: '2025-01-14T14:32:00Z',
    type: 'task',
    createdAt: '2025-01-14',
    updatedAt: '2025-01-14',
  },
  {
    _id: 'act-002',
    projectId: 'proj-001',
    actor: 'Marcus Rivera',
    action: 'updated status to',
    target: 'In Progress',
    timestamp: '2025-01-13T09:15:00Z',
    type: 'status',
    createdAt: '2025-01-13',
    updatedAt: '2025-01-13',
  },
  {
    _id: 'act-003',
    projectId: 'proj-001',
    actor: 'James Okafor',
    action: 'assigned to',
    target: 'Review hood and fender damage zones',
    timestamp: '2025-01-12T16:45:00Z',
    type: 'member',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-12',
  },
  {
    _id: 'act-004',
    projectId: 'proj-001',
    actor: 'Marcus Rivera',
    action: 'uploaded photographs for',
    target: 'initial damage assessment',
    timestamp: '2025-01-12T10:20:00Z',
    type: 'task',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-12',
  },
  {
    _id: 'act-005',
    projectId: 'proj-001',
    actor: 'Sofia Chen',
    action: 'joined the project as',
    target: 'AI Analyst',
    timestamp: '2025-01-10T11:00:00Z',
    type: 'member',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
  },
];

export function getAllProjects(): Project[] {
  return MOCK_PROJECTS;
}

export function getProjectById(id: string): Project | null {
  return MOCK_PROJECTS.find(p => p._id === id) ?? null;
}

export function getTasksByProjectId(projectId: string): Task[] {
  return MOCK_TASKS.filter(t => t.projectId === projectId);
}

export function getMembersByProjectId(_projectId: string): Member[] {
  return MOCK_MEMBERS;
}

export function getActivityByProjectId(projectId: string): ActivityItem[] {
  return MOCK_ACTIVITY.filter(a => a.projectId === projectId);
}
