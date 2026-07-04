'use client';

const KEY = 'rs.profile.v1';
const FAV_KEY = 'rs.favs.v1';
const TASK_KEY = 'rs.tasks.v1';
const OUTREACH_KEY = 'rs.outreach.v1';

export const DEFAULT_PROFILE = null;

export function getProfile() {
  if (typeof window === 'undefined') return null;
  try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
export function saveProfile(p) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event('rs:profile'));
}
export function clearProfile() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('rs:profile'));
}

export function getFavs() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; }
}
export function toggleFav(id) {
  const cur = new Set(getFavs());
  cur.has(id) ? cur.delete(id) : cur.add(id);
  localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(cur)));
  window.dispatchEvent(new Event('rs:favs'));
  return cur.has(id);
}

export function getTasks(leadId) {
  if (typeof window === 'undefined') return [];
  try { const all = JSON.parse(localStorage.getItem(TASK_KEY) || '{}'); return all[leadId] || []; } catch { return []; }
}
export function saveTasks(leadId, tasks) {
  if (typeof window === 'undefined') return;
  const all = JSON.parse(localStorage.getItem(TASK_KEY) || '{}');
  all[leadId] = tasks;
  localStorage.setItem(TASK_KEY, JSON.stringify(all));
}

export function getOutreach() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(OUTREACH_KEY) || '{}'); } catch { return {}; }
}
export function saveOutreach(leadId, channel, content) {
  const all = getOutreach();
  all[leadId] = all[leadId] || {};
  all[leadId][channel] = { content, when: Date.now() };
  localStorage.setItem(OUTREACH_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event('rs:outreach'));
}

// AI-flavored personalized outreach templates by category
export function generateOutreach({ channel, lead, profile }) {
  const biz = profile?.name || 'RocketShip';
  const service = profile?.services?.[0] || 'growth services';
  const ideal = profile?.ideal || 'ambitious business owners';
  const senderName = profile?.founder || 'Vikram';
  const cat = (lead.category || '').toLowerCase();
  const first = (lead.owner || '').split(' ')[0] || 'there';
  const angle = cat.includes('dental') ? 'more high-value patients each month'
    : cat.includes('restaurant') ? 'more repeat diners and larger tables'
    : cat.includes('real estate') ? 'more qualified buyer leads without spending on ads'
    : cat.includes('gym') || cat.includes('fitness') ? 'higher membership retention and referrals'
    : cat.includes('law') ? 'more qualified case inquiries each week'
    : cat.includes('salon') || cat.includes('spa') ? 'a fuller booking calendar and repeat clients'
    : cat.includes('software') || cat.includes('marketing') ? 'better-fit inbound leads from your ICP'
    : cat.includes('hotel') ? 'higher direct bookings vs. OTAs'
    : cat.includes('auto') ? 'more repeat service bookings and higher avg. ticket'
    : 'more consistent, high-intent inquiries';

  if (channel === 'whatsapp') {
    return `Hey ${first} 👋\n\nQuick note — came across ${lead.business} on Google (${lead.rating}★, ${lead.reviews} reviews) in ${lead.city}. Really solid presence.\n\nWe help ${cat || 'businesses'} like yours get ${angle}. Would a 15-min chat this week be useful? No pitch, just ideas.\n\n— ${senderName}, ${biz}`;
  }
  if (channel === 'sms') {
    return `Hi ${first}, ${senderName} here from ${biz}. Loved what ${lead.business} is doing in ${lead.city}. We help ${cat || 'teams'} get ${angle}. Open to a quick call this week?`;
  }
  if (channel === 'email') {
    return `Subject: Idea for ${lead.business}\n\nHi ${first},\n\nSaw ${lead.business} on Google Maps — impressive traction (${lead.rating}★, ${lead.reviews} reviews). I run ${biz} and we specialize in ${service} for ${ideal}.\n\nA few of our ${cat || 'industry'} clients have used us to unlock ${angle}. Happy to share the exact 3-step playbook we used with them — no strings attached.\n\nWould Thursday or Friday work for a 15-min call?\n\nBest,\n${senderName}\n${biz}`;
  }
  if (channel === 'linkedin') {
    return `Hi ${first} — came across ${lead.business} and loved the reviews in ${lead.city}. I run ${biz} and we help ${cat || 'businesses like yours'} get ${angle}. Would love to connect and share a couple of ideas that might be useful — no pitch. 🙌`;
  }
  return '';
}
