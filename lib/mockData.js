export const WORKSPACES = [
  { id: 'w1', name: 'Bhavya Enterprises', category: 'Real Estate', city: 'Mumbai', country: 'India', color: '#6E45FE', initials: 'BE' },
  { id: 'w2', name: 'NovaLeads Agency', category: 'Marketing', city: 'Dubai', country: 'UAE', color: '#22D3EE', initials: 'NL' },
  { id: 'w3', name: 'Helios Capital', category: 'Finance', city: 'Singapore', country: 'SG', color: '#34D399', initials: 'HC' },
];

export const KPIS = [
  { label: "Today's Leads", value: 142, delta: '+18%', tone: 'brand', icon: 'Sparkles' },
  { label: 'Hot Leads', value: 38, delta: '+6%', tone: 'rose', icon: 'Flame' },
  { label: 'Pending Calls', value: 21, delta: '-2%', tone: 'amber', icon: 'PhoneCall' },
  { label: 'Meetings Today', value: 7, delta: '+1', tone: 'cyan', icon: 'CalendarClock' },
  { label: 'Active Clients', value: 184, delta: '+12', tone: 'emerald', icon: 'Users' },
  { label: 'Revenue (MTD)', value: '$284K', delta: '+22%', tone: 'brand', icon: 'TrendingUp' },
  { label: 'Conversion Rate', value: '12.4%', delta: '+1.8%', tone: 'cyan', icon: 'Target' },
  { label: 'Avg Deal Size', value: '$4.2K', delta: '+3%', tone: 'emerald', icon: 'CircleDollarSign' },
];

export const REVENUE_SERIES = [
  { m: 'Jan', revenue: 120, leads: 240 }, { m: 'Feb', revenue: 168, leads: 320 },
  { m: 'Mar', revenue: 210, leads: 410 }, { m: 'Apr', revenue: 198, leads: 380 },
  { m: 'May', revenue: 254, leads: 520 }, { m: 'Jun', revenue: 312, leads: 612 },
  { m: 'Jul', revenue: 348, leads: 690 }, { m: 'Aug', revenue: 402, leads: 740 },
];

export const PIE_DATA = [
  { name: 'New', value: 38, fill: '#38BDF8' },
  { name: 'Interested', value: 24, fill: '#34D399' },
  { name: 'Meeting', value: 14, fill: '#22D3EE' },
  { name: 'Proposal', value: 10, fill: '#F472B6' },
  { name: 'Closed', value: 14, fill: '#6E45FE' },
];

const FIRST = ['Aarav','Ishaan','Vivaan','Reyansh','Diya','Anaya','Aanya','Aditya','Kabir','Sara','Liam','Noah','Emma','Olivia','Ava','Mia','Ethan','Lucas','Sophia','Mason','Lara','Omar','Yusuf','Fatima','Layla','Zayd','Hiroshi','Mei','Wei','Chen'];
const LAST = ['Sharma','Patel','Khan','Singh','Kapoor','Iyer','Mehta','Reddy','Nair','Das','Smith','Johnson','Williams','Brown','Davis','Garcia','Rodriguez','Wilson','Anderson','Lee','Kim','Park','Wang','Liu','Tanaka','Suzuki','Hassan','Ahmed','Ali','Yamada'];
const CITIES = ['Mumbai','Delhi','Bengaluru','Dubai','Singapore','London','New York','Toronto','Berlin','Sydney','Tokyo','Paris','Madrid','Riyadh','Doha'];
const CATS = ['Restaurant','Real Estate Agency','Dental Clinic','Gym & Fitness','Law Firm','Salon & Spa','Auto Repair','E-commerce Store','Marketing Agency','Software Studio','Coffee Shop','Boutique Hotel','Construction Co.','Accounting Firm','Travel Agency'];
const STATUSES = ['New','Contacted','Follow Up','Meeting','Proposal','Negotiation','Won','Lost'];

function seeded(n) { return ((Math.sin(n) * 10000) % 1 + 1) % 1; }
function pick(arr, n) { return arr[Math.floor(seeded(n) * arr.length)]; }

export const LEADS = Array.from({ length: 64 }).map((_, i) => {
  const first = pick(FIRST, i * 3 + 1);
  const last = pick(LAST, i * 5 + 2);
  const cat = pick(CATS, i * 7 + 3);
  const city = pick(CITIES, i * 11 + 4);
  const rating = (3.4 + seeded(i + 99) * 1.6).toFixed(1);
  const reviews = Math.floor(20 + seeded(i + 13) * 980);
  const hasWeb = seeded(i + 17) > 0.25;
  const hasEmail = seeded(i + 23) > 0.35;
  const hasPhone = seeded(i + 29) > 0.15;
  const biz = `${last} ${cat.split(' ')[0]}`;
  return {
    id: `LD-${1000 + i}`,
    business: biz,
    owner: `${first} ${last}`,
    phone: hasPhone ? `+1 (${200 + i % 700}) ${100 + i % 900}-${1000 + (i * 73) % 9000}` : '',
    email: hasEmail ? `${first}.${last}@${biz.toLowerCase().replace(/[^a-z]/g,'')}.com` : '',
    website: hasWeb ? `${biz.toLowerCase().replace(/[^a-z]/g,'')}.com` : '',
    rating: parseFloat(rating),
    reviews,
    category: cat,
    address: `${100 + i} ${pick(['Park','Main','Oak','Pine','Lake','Hill'], i)} St, ${city}`,
    city,
    maps: `https://maps.google.com/?q=${encodeURIComponent(biz + ' ' + city)}`,
    status: pick(STATUSES, i + 41),
    hot: seeded(i + 53) > 0.78,
  };
});

export const ACTIVITIES = [
  { who: 'Vikram', what: 'closed deal with', target: 'Reddy Dental', when: '2m ago', icon: 'CheckCircle2', tone: 'emerald' },
  { who: 'Aditya', what: 'added 24 leads from', target: 'Lead Finder · Dubai', when: '14m ago', icon: 'Plus', tone: 'brand' },
  { who: 'Sara', what: 'scheduled meeting with', target: 'Helios Capital', when: '1h ago', icon: 'CalendarClock', tone: 'cyan' },
  { who: 'You', what: 'sent proposal to', target: 'Nova Boutique Hotel', when: '3h ago', icon: 'FileText', tone: 'amber' },
  { who: 'Ishaan', what: 'marked as hot', target: 'Iyer Realty', when: 'yesterday', icon: 'Flame', tone: 'rose' },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'New high-intent lead', body: 'Sharma Realty (4.8★) matched your Mumbai filter.', when: '2m', unread: true, tone: 'brand' },
  { id: 2, title: 'Call reminder', body: 'Khan Auto Repair at 3:30 PM today.', when: '12m', unread: true, tone: 'amber' },
  { id: 3, title: 'AI summary ready', body: '32 leads enriched in workspace NovaLeads.', when: '1h', unread: true, tone: 'cyan' },
  { id: 4, title: 'Deal closed', body: 'Reddy Dental moved to Client. +$4,200 MRR.', when: '3h', unread: false, tone: 'emerald' },
  { id: 5, title: 'Workspace invite', body: 'Helios Capital invited you as Admin.', when: 'yesterday', unread: false, tone: 'brand' },
];

export const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/app/dashboard' },
  { key: 'workspace', label: 'Workspace', icon: 'Building2', href: '/app/workspace' },
  { key: 'lead-finder', label: 'Lead Finder', icon: 'Radar', href: '/app/lead-finder' },
  { key: 'leads', label: 'Leads', icon: 'Users', href: '/app/leads' },
  { key: 'crm', label: 'CRM', icon: 'KanbanSquare', href: '/app/crm' },
  { key: 'reports', label: 'Reports', icon: 'BarChart3', href: '/app/reports' },
  { key: 'analytics', label: 'Analytics', icon: 'LineChart', href: '/app/reports?tab=analytics' },
  { key: 'notifications', label: 'Notifications', icon: 'Bell', href: '/app/notifications' },
  { key: 'settings', label: 'Settings', icon: 'Settings', href: '/app/settings' },
  { key: 'profile', label: 'Profile', icon: 'User', href: '/app/profile' },
  { key: 'support', label: 'Support', icon: 'LifeBuoy', href: '/app/support' },
];
