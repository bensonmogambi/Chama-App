import { useState, useEffect } from "react";
import {
  LayoutDashboard, RefreshCw, TrendingUp, Vote, Award, FileText,
  Users, ShieldAlert, Bell, Plus, Download, ChevronRight, Check,
  X, Clock, ArrowUpRight, ArrowDownLeft, Wallet, Globe, MessageSquare,
  Star, AlertTriangle, Lock, Unlock, PieChart, BarChart2, Phone,
  Heart, Zap, Target, MapPin, ChevronDown, Send, Eye, Landmark,
  UserCheck, Activity, Coffee, Home
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, BarChart, Bar
} from "recharts";

// ── THEME ────────────────────────────────────────────────────────────────────
const theme = {
  green: "#00A86B",
  greenLight: "#E6F7F1",
  greenDark: "#007A4D",
  amber: "#F5A623",
  amberLight: "#FEF3DC",
  red: "#E8404A",
  redLight: "#FDECEE",
  blue: "#2D6BE4",
  blueLight: "#EBF1FD",
  purple: "#7B61FF",
  purpleLight: "#F0EEFF",
  bg: "#F4F3EE",
  card: "#FFFFFF",
  sidebar: "#0F1A14",
  sidebarText: "#A8C4B0",
  sidebarActive: "#00A86B",
  text: "#1A1F1C",
  textMuted: "#6B7A70",
  border: "#E2E8E4",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${theme.bg}; color: ${theme.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
  .app { display: flex; height: 100vh; overflow: hidden; }
  .sidebar { width: 240px; background: ${theme.sidebar}; display: flex; flex-direction: column; flex-shrink: 0; overflow-y: auto; }
  .sidebar-logo { padding: 24px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .logo-mark { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
  .logo-icon { width: 32px; height: 32px; background: ${theme.green}; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .logo-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: white; letter-spacing: -0.5px; }
  .logo-tagline { font-size: 11px; color: ${theme.sidebarText}; padding-left: 42px; font-style: italic; }
  .chama-switcher { margin: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; padding: 10px 12px; cursor: pointer; border: 1px solid rgba(255,255,255,0.08); }
  .chama-switcher-name { font-size: 13px; font-weight: 500; color: white; display: flex; align-items: center; justify-content: space-between; }
  .chama-switcher-meta { font-size: 11px; color: ${theme.sidebarText}; margin-top: 2px; }
  .nav-section { padding: 8px 12px 4px; font-size: 10px; font-weight: 600; color: rgba(168,196,176,0.5); letter-spacing: 1px; text-transform: uppercase; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: ${theme.sidebarText}; margin: 1px 8px; transition: all 0.15s; }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
  .nav-item.active { background: rgba(0,168,107,0.15); color: ${theme.green}; font-weight: 500; }
  .nav-item .badge-count { margin-left: auto; background: ${theme.red}; color: white; font-size: 10px; padding: 1px 6px; border-radius: 10px; font-weight: 600; }
  .nav-item .badge-new { margin-left: auto; background: ${theme.amber}; color: white; font-size: 9px; padding: 1px 5px; border-radius: 4px; font-weight: 700; letter-spacing: 0.5px; }
  .sidebar-bottom { margin-top: auto; padding: 12px; border-top: 1px solid rgba(255,255,255,0.07); }
  .user-card { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; cursor: pointer; }
  .user-card:hover { background: rgba(255,255,255,0.05); }
  .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: ${theme.green}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 500; color: white; }
  .user-score { font-size: 11px; color: ${theme.sidebarText}; }
  .main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
  .topbar { padding: 16px 24px; background: ${theme.card}; border-bottom: 1px solid ${theme.border}; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
  .page-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: ${theme.text}; }
  .page-sub { font-size: 12px; color: ${theme.textMuted}; margin-top: 1px; }
  .topbar-actions { display: flex; align-items: center; gap: 10px; }
  .btn { padding: 8px 16px; border-radius: 8px; border: 1px solid ${theme.border}; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; display: flex; align-items: center; gap: 6px; background: white; color: ${theme.text}; }
  .btn:hover { background: ${theme.bg}; }
  .btn-primary { background: ${theme.green}; color: white; border-color: ${theme.green}; }
  .btn-primary:hover { background: ${theme.greenDark}; border-color: ${theme.greenDark}; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-ghost { border: none; background: transparent; color: ${theme.textMuted}; }
  .btn-ghost:hover { background: ${theme.bg}; color: ${theme.text}; }
  .content { padding: 20px 24px; flex: 1; }
  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .metric-card { background: ${theme.card}; border-radius: 14px; padding: 16px; border: 1px solid ${theme.border}; position: relative; overflow: hidden; }
  .metric-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .metric-card.green::before { background: ${theme.green}; }
  .metric-card.amber::before { background: ${theme.amber}; }
  .metric-card.blue::before { background: ${theme.blue}; }
  .metric-card.purple::before { background: ${theme.purple}; }
  .metric-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
  .metric-label { font-size: 11px; color: ${theme.textMuted}; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .metric-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: ${theme.text}; margin-top: 4px; line-height: 1; }
  .metric-change { font-size: 12px; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
  .change-up { color: ${theme.green}; }
  .change-down { color: ${theme.red}; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .card { background: ${theme.card}; border-radius: 14px; border: 1px solid ${theme.border}; overflow: hidden; }
  .card-header { padding: 14px 16px; border-bottom: 1px solid ${theme.border}; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: ${theme.text}; }
  .card-sub { font-size: 11px; color: ${theme.textMuted}; margin-top: 1px; }
  .card-body { padding: 14px 16px; }
  .table-row { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid ${theme.border}; gap: 10px; }
  .table-row:last-child { border-bottom: none; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .status-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-green { background: ${theme.greenLight}; color: ${theme.greenDark}; }
  .badge-amber { background: ${theme.amberLight}; color: #B8740A; }
  .badge-red { background: ${theme.redLight}; color: #C0242D; }
  .badge-blue { background: ${theme.blueLight}; color: #1A4FB5; }
  .badge-purple { background: ${theme.purpleLight}; color: #5A40D6; }
  .badge-gray { background: #F1EFE8; color: #5F5E5A; }
  .progress-bar { height: 6px; background: ${theme.bg}; border-radius: 4px; overflow: hidden; margin: 6px 0; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
  .section-tab { display: flex; gap: 4px; background: ${theme.bg}; border-radius: 10px; padding: 4px; }
  .tab-btn { padding: 7px 14px; border-radius: 7px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; background: transparent; color: ${theme.textMuted}; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
  .tab-btn.active { background: ${theme.card}; color: ${theme.text}; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
  .score-ring-wrap { display: flex; flex-direction: column; align-items: center; padding: 16px 0; }
  .score-ring-label { font-size: 11px; color: ${theme.textMuted}; margin-top: 8px; }
  .timeline-item { display: flex; gap: 12px; padding: 10px 0; position: relative; }
  .timeline-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
  .timeline-line { position: absolute; left: 4px; top: 20px; bottom: 0; width: 2px; background: ${theme.border}; }
  .alert-banner { padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-size: 13px; }
  .alert-success { background: ${theme.greenLight}; color: ${theme.greenDark}; border: 1px solid #B5E6D4; }
  .alert-warning { background: ${theme.amberLight}; color: #7A5200; border: 1px solid #FAD89B; }
  .alert-info { background: ${theme.blueLight}; color: #1A3A8F; border: 1px solid #B5CCFA; }
  .diaspora-flag { width: 18px; height: 12px; border-radius: 2px; overflow: hidden; display: inline-flex; }
  .vote-option { background: ${theme.bg}; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; cursor: pointer; border: 1.5px solid transparent; transition: all 0.15s; }
  .vote-option:hover { border-color: ${theme.green}; background: ${theme.greenLight}; }
  .vote-option.voted-yes { border-color: ${theme.green}; background: ${theme.greenLight}; }
  .vote-option.voted-no { border-color: ${theme.red}; background: ${theme.redLight}; }
  .dispute-card { background: ${theme.bg}; border-radius: 10px; padding: 12px 14px; margin-bottom: 10px; border-left: 3px solid ${theme.amber}; }
  .dispute-card.resolved { border-left-color: ${theme.green}; }
  .dispute-card.escalated { border-left-color: ${theme.red}; }
  .member-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .member-card { background: ${theme.bg}; border-radius: 10px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.15s; border: 1.5px solid transparent; }
  .member-card:hover { border-color: ${theme.green}; background: ${theme.greenLight}; }
  .member-avatar-lg { width: 44px; height: 44px; border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }
  .member-name { font-size: 12px; font-weight: 600; color: ${theme.text}; }
  .member-score { font-size: 11px; color: ${theme.textMuted}; margin-top: 2px; }
  .trust-bar { display: flex; gap: 2px; margin-top: 6px; justify-content: center; }
  .trust-dot { width: 8px; height: 8px; border-radius: 50%; }
  .whatsapp-preview { background: #ECE5DD; border-radius: 10px; padding: 12px; font-size: 12px; }
  .wa-bubble { background: white; border-radius: 8px; padding: 8px 10px; margin-bottom: 6px; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
  .wa-bubble.sent { background: #DCF8C6; margin-left: auto; }
  .wa-time { font-size: 10px; color: #999; margin-top: 3px; text-align: right; }
  .insurance-card { background: linear-gradient(135deg, #0F1A14 0%, #1A3320 100%); border-radius: 14px; padding: 16px; color: white; position: relative; overflow: hidden; }
  .insurance-card::after { content: ''; position: absolute; right: -20px; top: -20px; width: 100px; height: 100px; border-radius: 50%; background: rgba(0,168,107,0.15); }
  .minutes-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${theme.border}; cursor: pointer; }
  .minutes-item:last-child { border-bottom: none; }
  .minutes-item:hover .minutes-title { color: ${theme.green}; }
  .minutes-title { font-size: 13px; font-weight: 500; color: ${theme.text}; transition: color 0.15s; }
  .minutes-meta { font-size: 11px; color: ${theme.textMuted}; margin-top: 2px; }
  .empty-state { text-align: center; padding: 40px 20px; color: ${theme.textMuted}; }
  .empty-icon { width: 48px; height: 48px; border-radius: 12px; background: ${theme.bg}; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
  .tooltip-custom { background: ${theme.text}; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: 'DM Sans', sans-serif; }
  .notification-dot { width: 8px; height: 8px; border-radius: 50%; background: ${theme.red}; border: 2px solid ${theme.card}; position: absolute; top: 0; right: 0; }
`;

// ── DATA ─────────────────────────────────────────────────────────────────────
const MEMBERS = [
  { id:1, name:"Wanjiru Kamau",    initials:"WK", color:"#00A86B", colorBg:"#E6F7F1", score:782, paid:true,  role:"Chair",      county:"Nairobi",  phone:"+254 712 345 678", months:34, loans:1, flag:"🇰🇪" },
  { id:2, name:"Achieng Otieno",   initials:"AO", color:"#2D6BE4", colorBg:"#EBF1FD", score:741, paid:true,  role:"Treasurer",  county:"Kisumu",   phone:"+254 723 456 789", months:36, loans:0, flag:"🇰🇪" },
  { id:3, name:"James Kariuki",    initials:"JK", color:"#F5A623", colorBg:"#FEF3DC", score:698, paid:true,  role:"Secretary",  county:"Murang'a", phone:"+254 701 234 567", months:30, loans:1, flag:"🇰🇪" },
  { id:4, name:"Fatuma Hassan",    initials:"FH", color:"#E8404A", colorBg:"#FDECEE", score:720, paid:true,  role:"Member",     county:"Mombasa",  phone:"+254 733 567 890", months:28, loans:0, flag:"🇰🇪" },
  { id:5, name:"Mary Njoroge",     initials:"MN", color:"#7B61FF", colorBg:"#F0EEFF", score:655, paid:false, role:"Member",     county:"Nakuru",   phone:"+254 745 678 901", months:24, loans:2, flag:"🇰🇪" },
  { id:6, name:"Peter Omondi",     initials:"PO", color:"#00A86B", colorBg:"#E6F7F1", score:710, paid:true,  role:"Member",     county:"Kisumu",   phone:"+254 756 789 012", months:32, loans:0, flag:"🇰🇪" },
  { id:7, name:"Grace Mwangi",     initials:"GM", color:"#2D6BE4", colorBg:"#EBF1FD", score:760, paid:true,  role:"Member",     county:"Kiambu",   phone:"+254 767 890 123", months:35, loans:1, flag:"🇰🇪" },
  { id:8, name:"David Kipchoge",   initials:"DK", color:"#F5A623", colorBg:"#FEF3DC", score:689, paid:false, role:"Member",     county:"Uasin Gishu",phone:"+254 778 901 234",months:22, loans:0, flag:"🇰🇪" },
  { id:9, name:"Amina Waweru",     initials:"AW", color:"#E8404A", colorBg:"#FDECEE", score:730, paid:true,  role:"Member",     county:"Nairobi",  phone:"+254 789 012 345", months:29, loans:1, flag:"🇰🇪" },
  { id:10,name:"John Muthoni",     initials:"JM", color:"#7B61FF", colorBg:"#F0EEFF", score:668, paid:true,  role:"Member",     county:"Meru",     phone:"+254 790 123 456", months:26, loans:0, flag:"🇰🇪" },
  { id:11,name:"Samuel Njiru",     initials:"SN", color:"#00A86B", colorBg:"#E6F7F1", score:695, paid:false, role:"Member",     county:"Nyeri",    phone:"+254 701 987 654", months:20, loans:1, flag:"🇰🇪" },
  { id:12,name:"Diana Oloo (UK)",  initials:"DO", color:"#2D6BE4", colorBg:"#EBF1FD", score:802, paid:true,  role:"Diaspora",   county:"London",   phone:"+44 7700 900 123", months:36, loans:0, flag:"🇬🇧" },
];

const CONTRIBUTIONS = [
  { month:"Jan", target:60000, collected:60000 },
  { month:"Feb", target:60000, collected:57000 },
  { month:"Mar", target:60000, collected:60000 },
  { month:"Apr", target:60000, collected:55000 },
  { month:"May", target:60000, collected:40000 },
];

const INVESTMENTS = [
  { name:"CIC Unit Trust",      type:"Money Market",    amount:120000, returns:14.2, status:"active",  risk:"Low" },
  { name:"Tatu City Plot",      type:"Real Estate",     amount:200000, returns:28.0, status:"active",  risk:"Medium" },
  { name:"Treasury Bills",      type:"Government Bond", amount:80000,  returns:11.5, status:"active",  risk:"Low" },
  { name:"SME Loan — Wanjiru",  type:"Internal Lending",amount:60000,  returns:15.0, status:"active",  risk:"Low" },
  { name:"Nairobi REIT",        type:"Real Estate",     amount:50000,  returns:9.8,  status:"pending", risk:"Medium" },
];

const MERRY = [
  { name:"Achieng Otieno",  month:"Feb 2026", amount:60000, status:"received" },
  { name:"James Kariuki",   month:"Mar 2026", amount:60000, status:"received" },
  { name:"Fatuma Hassan",   month:"Apr 2026", amount:60000, status:"received" },
  { name:"Wanjiru Kamau",   month:"May 2026", amount:60000, status:"next" },
  { name:"Peter Omondi",    month:"Jun 2026", amount:60000, status:"upcoming" },
  { name:"Grace Mwangi",    month:"Jul 2026", amount:60000, status:"upcoming" },
  { name:"Mary Njoroge",    month:"Aug 2026", amount:60000, status:"upcoming" },
  { name:"David Kipchoge",  month:"Sep 2026", amount:60000, status:"upcoming" },
  { name:"Amina Waweru",    month:"Oct 2026", amount:60000, status:"upcoming" },
  { name:"John Muthoni",    month:"Nov 2026", amount:60000, status:"upcoming" },
  { name:"Samuel Njiru",    month:"Dec 2026", amount:60000, status:"upcoming" },
  { name:"Diana Oloo (UK)", month:"Jan 2027", amount:60000, status:"upcoming" },
];

const VOTES = [
  { id:1, question:"Invest KES 50,000 in 91-day Treasury Bills?", yes:9, no:3, total:12, closes:"2 days", myVote:null, type:"Investment" },
  { id:2, question:"Increase monthly contribution to KES 6,000 from July?", yes:6, no:6, total:12, closes:"5 days", myVote:null, type:"Finance" },
  { id:3, question:"Add micro-insurance cover for all members — KES 200/month?", yes:10, no:1, total:12, closes:"1 day", myVote:"yes", type:"Insurance" },
  { id:4, question:"Onboard 2 new members from Nakuru chapter?", yes:8, no:2, total:12, closes:"7 days", myVote:null, type:"Membership" },
];

const DISPUTES = [
  { id:1, raised:"Mary Njoroge",    against:"James Kariuki", issue:"Late payout — March cycle delayed by 12 days.", status:"open",     date:"May 18" },
  { id:2, raised:"David Kipchoge",  against:"Group Admin",   issue:"M-Pesa confirmation not reflected in system for April.", status:"open", date:"May 20" },
  { id:3, raised:"Fatuma Hassan",   against:"Peter Omondi",  issue:"Loan repayment dispute — KES 5,000 balance.", status:"resolved", date:"Apr 12" },
  { id:4, raised:"Samuel Njiru",    against:"Group",         issue:"Minutes from February meeting not shared.", status:"escalated", date:"May 22" },
];

const MINUTES = [
  { date:"May 5, 2026",  title:"Monthly meeting — May 2026",       attendees:11, action_items:4, ai_generated:true },
  { date:"Apr 7, 2026",  title:"Emergency meeting — Investment vote", attendees:9, action_items:2, ai_generated:true },
  { date:"Mar 3, 2026",  title:"Monthly meeting — March 2026",     attendees:12, action_items:6, ai_generated:false },
  { date:"Feb 2, 2026",  title:"AGM — Annual General Meeting 2026", attendees:12, action_items:10, ai_generated:false },
];

const PIE_DATA = [
  { name:"Unit Trust", value:120000, color:"#00A86B" },
  { name:"Real Estate", value:250000, color:"#2D6BE4" },
  { name:"T-Bills", value:80000, color:"#F5A623" },
  { name:"SME Loans", value:60000, color:"#7B61FF" },
];

const CREDIT_FACTORS = [
  { label:"On-time contributions", score:95, weight:"40%" },
  { label:"Loan repayment history", score:100, weight:"30%" },
  { label:"Meeting attendance", score:93, weight:"15%" },
  { label:"Voting participation", score:88, weight:"10%" },
  { label:"Dispute record", score:100, weight:"5%" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmt = (n) => "KES " + n.toLocaleString();
const ScoreRing = ({ score, size = 80, color = theme.green }) => {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const pct = score / 900;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={theme.bg} strokeWidth="8"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${circ * pct} ${circ * (1-pct)}`}
        strokeDashoffset={circ * 0.25} strokeLinecap="round"/>
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="16" fontWeight="700"
        fontFamily="Syne, sans-serif" fill={theme.text}>{score}</text>
    </svg>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip-custom">
      <div style={{fontWeight:600, marginBottom:4}}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{color: p.color || "white"}}>{p.name}: {fmt(p.value)}</div>
      ))}
    </div>
  );
};

// ── PAGES ─────────────────────────────────────────────────────────────────────
const Dashboard = () => (
  <div className="content">
    <div className="alert-banner alert-success">
      <Bell size={15}/> <strong>Wanjiru Kamau</strong> — your merry-go-round payout of <strong>KES 60,000</strong> is scheduled for May 31. 3 members still pending contributions.
    </div>
    <div className="metrics-grid">
      {[
        { label:"Total Pool", value:"KES 420K", change:"+KES 40K this cycle", up:true,  icon:<Wallet size={18}/>, color:"green",  bg:theme.greenLight,  ic:theme.green },
        { label:"Investments",value:"KES 510K",  change:"+12.4% avg return",  up:true,  icon:<TrendingUp size={18}/>, color:"blue", bg:theme.blueLight, ic:theme.blue },
        { label:"This Month", value:"8 / 12",    change:"KES 40K of 60K",     up:false, icon:<RefreshCw size={18}/>, color:"amber",bg:theme.amberLight, ic:theme.amber },
        { label:"Credit Score",value:"782",       change:"Top 15% nationally",up:true,  icon:<Award size={18}/>, color:"purple", bg:theme.purpleLight, ic:theme.purple },
      ].map((m,i) => (
        <div key={i} className={`metric-card ${m.color}`}>
          <div className="metric-icon" style={{background:m.bg}}>
            <span style={{color:m.ic}}>{m.icon}</span>
          </div>
          <div className="metric-label">{m.label}</div>
          <div className="metric-value">{m.value}</div>
          <div className={`metric-change ${m.up ? "change-up":"change-down"}`}>
            {m.up ? <ArrowUpRight size={13}/> : <ArrowDownLeft size={13}/>} {m.change}
          </div>
        </div>
      ))}
    </div>

    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Contribution History</div><div className="card-sub">Last 5 cycles</div></div>
        </div>
        <div className="card-body" style={{padding:"16px 8px 8px"}}>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={CONTRIBUTIONS}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.green} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={theme.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{fontSize:11, fill:theme.textMuted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10, fill:theme.textMuted}} axisLine={false} tickLine={false} tickFormatter={v => v/1000+"K"}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="target" stroke={theme.border} fill="none" strokeDasharray="4 4" name="Target"/>
              <Area type="monotone" dataKey="collected" stroke={theme.green} fill="url(#cg)" strokeWidth={2} name="Collected"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Investment Portfolio</div><div className="card-sub">KES 510,000 total</div></div>
        </div>
        <div className="card-body" style={{display:"flex", gap:12, alignItems:"center"}}>
          <ResponsiveContainer width="50%" height={140}>
            <RechartsPie><Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={3}>
              {PIE_DATA.map((e,i) => <Cell key={i} fill={e.color}/>)}
            </Pie></RechartsPie>
          </ResponsiveContainer>
          <div style={{flex:1}}>
            {PIE_DATA.map((d,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
                <div style={{width:10, height:10, borderRadius:"50%", background:d.color, flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:11, fontWeight:500, color:theme.text}}>{d.name}</div>
                  <div style={{fontSize:10, color:theme.textMuted}}>{fmt(d.value)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="grid-3">
      <div className="card">
        <div className="card-header"><div className="card-title">Next Recipient</div></div>
        <div className="card-body" style={{textAlign:"center", paddingTop:20}}>
          <div style={{width:56, height:56, borderRadius:"50%", background:theme.greenLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px", fontSize:18, fontWeight:700, color:theme.green}}>WK</div>
          <div style={{fontFamily:"Syne", fontWeight:700, fontSize:15}}>Wanjiru Kamau</div>
          <div style={{fontSize:12, color:theme.textMuted, margin:"4px 0 12px"}}>May 31, 2026</div>
          <div style={{background:theme.greenLight, color:theme.greenDark, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600}}>KES 60,000 payout</div>
          <div style={{fontSize:11, color:theme.textMuted, marginTop:8}}>Cycle 5 of 12</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Open Votes</div></div>
        <div className="card-body">
          {VOTES.filter(v=>!v.myVote).slice(0,3).map(v => (
            <div key={v.id} style={{padding:"8px 0", borderBottom:`1px solid ${theme.border}`, fontSize:12}}>
              <div style={{fontWeight:500, color:theme.text, marginBottom:4, lineHeight:1.4}}>{v.question}</div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span className="status-badge badge-amber"><Clock size={10}/> {v.closes}</span>
                <span style={{fontSize:11, color:theme.textMuted}}>{v.yes+v.no}/{v.total} voted</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Recent Activity</div></div>
        <div className="card-body">
          {[
            {icon:<Check size={13}/>, text:"Achieng paid KES 5,000", time:"2h ago", color:theme.green},
            {icon:<Check size={13}/>, text:"James paid KES 5,000", time:"5h ago", color:theme.green},
            {icon:<AlertTriangle size={13}/>, text:"New dispute raised", time:"1d ago", color:theme.amber},
            {icon:<TrendingUp size={13}/>, text:"T-Bill investment approved", time:"2d ago", color:theme.blue},
            {icon:<Users size={13}/>, text:"Diana joined from London", time:"3d ago", color:theme.purple},
          ].map((a,i) => (
            <div key={i} style={{display:"flex", gap:10, padding:"7px 0", borderBottom: i<4?`1px solid ${theme.border}`:"none", alignItems:"center"}}>
              <div style={{width:24, height:24, borderRadius:"50%", background:`${a.color}22`, display:"flex", alignItems:"center", justifyContent:"center", color:a.color, flexShrink:0}}>{a.icon}</div>
              <div style={{flex:1, fontSize:12, color:theme.text}}>{a.text}</div>
              <div style={{fontSize:11, color:theme.textMuted, flexShrink:0}}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MerryGoRound = () => (
  <div className="content">
    <div className="alert-banner alert-info"><Zap size={15}/> Auto-disbursement is ON — Wanjiru will receive KES 60,000 via M-Pesa on May 31 if all contributions are collected.</div>
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">2026 Rotation Schedule</div><div className="card-sub">12 members · KES 60,000/cycle</div></div>
          <button className="btn btn-sm"><Download size={13}/> Export</button>
        </div>
        <div className="card-body">
          {MERRY.map((m,i) => (
            <div key={i} className="table-row">
              <div style={{width:28, height:28, borderRadius:"50%", background: m.status==="received"?theme.greenLight: m.status==="next"?theme.amberLight:theme.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color: m.status==="received"?theme.green: m.status==="next"?theme.amber:theme.textMuted, flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:500, color:theme.text}}>{m.name}</div>
                <div style={{fontSize:11, color:theme.textMuted}}>{m.month}</div>
              </div>
              <div style={{fontSize:13, fontWeight:600, color:theme.textMuted, marginRight:8}}>{fmt(m.amount)}</div>
              <span className={`status-badge ${m.status==="received"?"badge-green": m.status==="next"?"badge-amber":"badge-gray"}`}>
                {m.status==="received"?"✓ Received": m.status==="next"?"Next":"Upcoming"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="card" style={{marginBottom:16}}>
          <div className="card-header"><div className="card-title">May 2026 Contributions</div></div>
          <div className="card-body">
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:theme.textMuted, marginBottom:6}}>
              <span>KES 40,000 collected</span><span>KES 60,000 target</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{width:"67%", background:theme.green}}/></div>
            <div style={{textAlign:"center", fontSize:11, color:theme.textMuted, marginBottom:12}}>8 of 12 members paid</div>
            {MEMBERS.map((m,i) => (
              <div key={i} className="table-row" style={{padding:"6px 0"}}>
                <div className="avatar" style={{width:28, height:28, background:m.colorBg, color:m.color, fontSize:10}}>{m.initials}</div>
                <div style={{flex:1, fontSize:12}}>{m.name} {m.flag !== "🇰🇪" && <span style={{fontSize:12}}>{m.flag}</span>}</div>
                {m.paid
                  ? <span className="status-badge badge-green" style={{fontSize:10}}><Check size={9}/> Paid</span>
                  : <span className="status-badge badge-red" style={{fontSize:10}}>Pending</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Investments = () => (
  <div className="content">
    <div className="grid-2" style={{marginBottom:16}}>
      {[
        {label:"Total Invested", value:"KES 510K", sub:"Across 5 instruments", color:theme.blue},
        {label:"Total Returns", value:"KES 63.2K", sub:"+12.4% blended return", color:theme.green},
      ].map((m,i) => (
        <div key={i} className="card">
          <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div><div style={{fontSize:11, color:theme.textMuted, textTransform:"uppercase", letterSpacing:"0.5px"}}>{m.label}</div>
              <div style={{fontFamily:"Syne", fontSize:28, fontWeight:800, color:m.color, marginTop:4}}>{m.value}</div>
              <div style={{fontSize:12, color:theme.textMuted}}>{m.sub}</div></div>
            <TrendingUp size={40} color={m.color} strokeWidth={1}/>
          </div>
        </div>
      ))}
    </div>
    <div className="card" style={{marginBottom:16}}>
      <div className="card-header">
        <div><div className="card-title">Active Investments</div><div className="card-sub">Group portfolio</div></div>
        <button className="btn btn-primary btn-sm"><Plus size={13}/> New Investment</button>
      </div>
      <div className="card-body">
        {INVESTMENTS.map((inv,i) => (
          <div key={i} className="table-row">
            <div style={{width:36, height:36, borderRadius:10, background: inv.status==="active"?theme.greenLight:theme.amberLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <Landmark size={16} color={inv.status==="active"?theme.green:theme.amber}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, color:theme.text}}>{inv.name}</div>
              <div style={{fontSize:11, color:theme.textMuted, marginTop:2}}>{inv.type} · Risk: <span style={{color: inv.risk==="Low"?theme.green: theme.amber}}>{inv.risk}</span></div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13, fontWeight:600, color:theme.text}}>{fmt(inv.amount)}</div>
              <div style={{fontSize:12, color:theme.green, fontWeight:500}}>+{inv.returns}% p.a.</div>
            </div>
            <span className={`status-badge ${inv.status==="active"?"badge-green":"badge-amber"}`} style={{marginLeft:8}}>{inv.status}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="card">
      <div className="card-header"><div className="card-title">Recommended Opportunities</div><div className="card-sub">Curated for your chama size</div></div>
      <div className="card-body">
        <div className="grid-3" style={{margin:0}}>
          {[
            {name:"Cytonn High Yield", type:"Fixed Income", returns:"17.5%", min:"KES 50K", risk:"Medium"},
            {name:"NSE Listed Bond", type:"Corporate Bond", returns:"13.2%", min:"KES 100K", risk:"Low"},
            {name:"Tilisi Land Plot", type:"Real Estate", returns:"~25%", min:"KES 200K", risk:"Medium"},
          ].map((opp,i) => (
            <div key={i} style={{background:theme.bg, borderRadius:10, padding:"14px 12px", border:`1px solid ${theme.border}`}}>
              <div style={{fontSize:13, fontWeight:600, color:theme.text, marginBottom:4}}>{opp.name}</div>
              <div style={{fontSize:11, color:theme.textMuted, marginBottom:10}}>{opp.type}</div>
              <div style={{fontSize:20, fontFamily:"Syne", fontWeight:700, color:theme.green, marginBottom:4}}>{opp.returns}</div>
              <div style={{fontSize:11, color:theme.textMuted}}>Min: {opp.min}</div>
              <button className="btn btn-primary btn-sm" style={{width:"100%", marginTop:10, justifyContent:"center"}}>Vote to Invest</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const VotingPage = () => {
  const [votes, setVotes] = useState(VOTES);
  const castVote = (id, choice) => setVotes(v => v.map(vt => vt.id===id ? {...vt, myVote:choice, yes: choice==="yes"?vt.yes+1:vt.yes, no: choice==="no"?vt.no+1:vt.no} : vt));
  return (
    <div className="content">
      <div className="alert-banner alert-warning"><Vote size={15}/> You have <strong>3 open votes</strong> requiring your input. Votes close soon.</div>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Active Proposals</div><div className="card-sub">All members must vote</div></div>
          <button className="btn btn-primary btn-sm"><Plus size={13}/> New Proposal</button>
        </div>
        <div className="card-body">
          {votes.map(v => (
            <div key={v.id} style={{padding:"16px 0", borderBottom:`1px solid ${theme.border}`}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:8, flexWrap:"wrap", gap:8}}>
                <span className={`status-badge ${v.type==="Investment"?"badge-green":v.type==="Finance"?"badge-blue":v.type==="Insurance"?"badge-purple":"badge-amber"}`}>{v.type}</span>
                <span style={{fontSize:12, color:theme.textMuted, display:"flex", alignItems:"center", gap:4}}><Clock size={12}/> Closes in {v.closes}</span>
              </div>
              <div style={{fontSize:14, fontWeight:600, color:theme.text, marginBottom:12, lineHeight:1.5}}>{v.question}</div>
              <div style={{marginBottom:10}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:theme.textMuted, marginBottom:4}}>
                  <span>Yes ({v.yes})</span><span>No ({v.no})</span>
                </div>
                <div style={{display:"flex", height:6, borderRadius:4, overflow:"hidden", background:theme.bg}}>
                  <div style={{width:`${(v.yes/v.total)*100}%`, background:theme.green}}/>
                  <div style={{width:`${(v.no/v.total)*100}%`, background:theme.red}}/>
                </div>
                <div style={{fontSize:11, color:theme.textMuted, marginTop:4}}>{v.yes+v.no} of {v.total} members voted</div>
              </div>
              {v.myVote
                ? <div style={{fontSize:12, color:v.myVote==="yes"?theme.green:theme.red, fontWeight:500}}>You voted: {v.myVote==="yes"?"✓ Yes":"✗ No"}</div>
                : <div style={{display:"flex", gap:8}}>
                    <button className="btn btn-primary btn-sm" onClick={() => castVote(v.id,"yes")}><Check size={13}/> Vote Yes</button>
                    <button className="btn btn-sm" style={{borderColor:theme.red, color:theme.red}} onClick={() => castVote(v.id,"no")}><X size={13}/> Vote No</button>
                  </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreditScore = () => (
  <div className="content">
    <div className="grid-2" style={{marginBottom:16}}>
      <div className="card">
        <div className="card-header"><div className="card-title">Your Chama Credit Score</div><div className="card-sub">Updated monthly</div></div>
        <div className="card-body" style={{display:"flex", gap:20, alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <ScoreRing score={782} size={100}/>
            <div style={{fontSize:11, color:theme.textMuted, marginTop:6}}>Excellent · A+</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Syne", fontSize:22, fontWeight:700, color:theme.green, marginBottom:4}}>Excellent</div>
            <div style={{fontSize:12, color:theme.textMuted, marginBottom:12}}>Top 15% of Chama OS members</div>
            {[{label:"KCB M-Pesa", limit:"KES 200K", color:theme.green},{label:"Equity Bank",limit:"KES 150K",color:theme.blue},{label:"Co-op Bank",limit:"KES 100K",color:theme.purple}].map((b,i)=>(
              <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom: i<2?`1px solid ${theme.border}`:"none"}}>
                <div style={{fontSize:12, fontWeight:500, color:theme.text}}>{b.label}</div>
                <div style={{fontSize:12, color:b.color, fontWeight:600}}>Up to {b.limit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Score Breakdown</div></div>
        <div className="card-body">
          {CREDIT_FACTORS.map((f,i) => (
            <div key={i} style={{marginBottom:12}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4}}>
                <span style={{color:theme.text, fontWeight:500}}>{f.label}</span>
                <span style={{color: f.score>=90?theme.green:theme.amber, fontWeight:600}}>{f.score}/100</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width:`${f.score}%`, background: f.score>=90?theme.green:theme.amber}}/>
              </div>
              <div style={{fontSize:10, color:theme.textMuted}}>Weight: {f.weight}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-header"><div className="card-title">Group Credit Scores</div><div className="card-sub">All 12 members</div></div>
      <div className="card-body">
        <div className="member-grid">
          {MEMBERS.map((m,i) => (
            <div key={i} className="member-card">
              <div className="member-avatar-lg" style={{background:m.colorBg, color:m.color}}>{m.initials}</div>
              <div className="member-name">{m.name.split(" ")[0]} {m.flag !== "🇰🇪" && <span>{m.flag}</span>}</div>
              <div style={{fontFamily:"Syne", fontSize:16, fontWeight:700, color: m.score>=750?theme.green: m.score>=700?theme.amber:theme.red, margin:"4px 0"}}>{m.score}</div>
              <div className="trust-bar">
                {[...Array(5)].map((_,j) => <div key={j} className="trust-dot" style={{background: j < Math.floor(m.score/160)?m.color:theme.border}}/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Disputes = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="content">
      <div className="alert-banner alert-warning"><ShieldAlert size={15}/> <strong>2 open disputes</strong> need resolution. Unresolved disputes affect group credit score.</div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Dispute Cases</div><div className="card-sub">4 total · 2 open</div></div>
            <button className="btn btn-sm btn-primary"><Plus size={13}/> Raise Dispute</button>
          </div>
          <div className="card-body">
            {DISPUTES.map((d,i) => (
              <div key={i} className={`dispute-card ${d.status}`} onClick={() => setSelected(d)} style={{cursor:"pointer", transition:"all 0.15s", opacity: selected?.id===d.id?1:0.9}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                  <span className={`status-badge ${d.status==="open"?"badge-amber":d.status==="resolved"?"badge-green":"badge-red"}`} style={{fontSize:10}}>
                    {d.status==="open"?"⏳ Open":d.status==="resolved"?"✓ Resolved":"🔴 Escalated"}
                  </span>
                  <span style={{fontSize:11, color:theme.textMuted}}>{d.date}</span>
                </div>
                <div style={{fontSize:12, fontWeight:600, color:theme.text, marginBottom:4}}>{d.raised} vs {d.against}</div>
                <div style={{fontSize:11, color:theme.textMuted, lineHeight:1.5}}>{d.issue}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">{selected ? "Case Details" : "Resolution Center"}</div></div>
          <div className="card-body">
            {selected ? (
              <>
                <div style={{background:theme.bg, borderRadius:10, padding:14, marginBottom:14}}>
                  <div style={{fontSize:12, color:theme.textMuted}}>Raised by</div>
                  <div style={{fontSize:14, fontWeight:600, color:theme.text, marginBottom:8}}>{selected.raised}</div>
                  <div style={{fontSize:12, color:theme.textMuted}}>Against</div>
                  <div style={{fontSize:14, fontWeight:600, color:theme.text, marginBottom:8}}>{selected.against}</div>
                  <div style={{fontSize:12, color:theme.textMuted}}>Issue</div>
                  <div style={{fontSize:13, color:theme.text, lineHeight:1.6}}>{selected.issue}</div>
                </div>
                {selected.status === "open" && (
                  <>
                    <div style={{fontSize:12, fontWeight:600, color:theme.text, marginBottom:8}}>Resolution Options</div>
                    {["Mediate between parties","Request M-Pesa transaction proof","Escalate to SACCO arbitrator","Community vote to resolve"].map((opt,i) => (
                      <div key={i} style={{padding:"8px 12px", background:theme.bg, borderRadius:8, marginBottom:6, fontSize:12, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        {opt} <ChevronRight size={14} color={theme.textMuted}/>
                      </div>
                    ))}
                  </>
                )}
                {selected.status === "resolved" && <div className="alert-banner alert-success" style={{marginTop:8}}><Check size={14}/> This dispute was resolved on {selected.date}.</div>}
                {selected.status === "escalated" && <div className="alert-banner" style={{background:theme.redLight, borderColor:"#F7C1C1", color:"#C0242D", marginTop:8}}><AlertTriangle size={14}/> This case is with the SACCO arbitration board.</div>}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><ShieldAlert size={22} color={theme.textMuted}/></div>
                <div style={{fontSize:13, fontWeight:500}}>Select a case to view details</div>
                <div style={{fontSize:12, marginTop:6}}>AI-assisted mediation available for open disputes</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiasporaPage = () => (
  <div className="content">
    <div className="alert-banner alert-info"><Globe size={15}/> Diana Oloo (London) contributed £38.50 = <strong>KES 6,012</strong> via Wise on May 23. Auto-reconciled ✓</div>
    <div className="grid-2" style={{marginBottom:16}}>
      <div className="insurance-card">
        <div style={{fontSize:11, color:"rgba(168,196,176,0.8)", marginBottom:4, textTransform:"uppercase", letterSpacing:"1px"}}>Diaspora Members</div>
        <div style={{fontFamily:"Syne", fontSize:36, fontWeight:800, color:"white"}}>1 / 12</div>
        <div style={{fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:4}}>London, UK · Diana Oloo</div>
        <div style={{marginTop:16, display:"flex", gap:12}}>
          {[{label:"GBP",flag:"🇬🇧"},{label:"USD",flag:"🇺🇸"},{label:"EUR",flag:"🇪🇺"}].map((c,i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"6px 12px", fontSize:12, color:"white"}}>{c.flag} {c.label}</div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">FX Conversion Rates</div><div className="card-sub">Live · Updated hourly</div></div>
        <div className="card-body">
          {[{from:"1 GBP",to:"KES 156.20",trend:"+0.3%"},{from:"1 USD",to:"KES 129.40",trend:"-0.1%"},{from:"1 EUR",to:"KES 139.80",trend:"+0.8%"}].map((r,i)=>(
            <div key={i} className="table-row">
              <div style={{fontFamily:"Syne", fontSize:15, fontWeight:700, flex:1}}>{r.from}</div>
              <div style={{fontSize:14, fontWeight:600, color:theme.text}}>{r.to}</div>
              <span className={`status-badge ${r.trend.startsWith("+")?"badge-green":"badge-red"}`}>{r.trend}</span>
            </div>
          ))}
          <div style={{fontSize:11, color:theme.textMuted, marginTop:8}}>Powered by Wise API · Transfers auto-reconcile to M-Pesa</div>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-header"><div className="card-title">How Diaspora Members Contribute</div></div>
      <div className="card-body">
        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          {[
            {step:"1",title:"Receive invite",body:"WhatsApp invite with secure onboarding link. Join without a Kenyan bank account.",icon:<MessageSquare size={20}/>},
            {step:"2",title:"Set up Wise/PayPal",body:"Link your foreign account. Chama OS handles the KES conversion automatically.",icon:<Globe size={20}/>},
            {step:"3",title:"Contribute",body:"Pay in GBP, USD, or EUR. M-Pesa receives KES equivalent within 2 hours.",icon:<Send size={20}/>},
            {step:"4",title:"Full member",body:"Same voting rights, credit score, payout eligibility — no second-class membership.",icon:<UserCheck size={20}/>},
          ].map((s,i) => (
            <div key={i} style={{flex:"1 1 45%", background:theme.bg, borderRadius:10, padding:14}}>
              <div style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                <div style={{width:36, height:36, borderRadius:10, background:theme.greenLight, display:"flex", alignItems:"center", justifyContent:"center", color:theme.green, flexShrink:0}}>{s.icon}</div>
                <div><div style={{fontSize:12, fontWeight:700, color:theme.text, marginBottom:4}}>Step {s.step}: {s.title}</div>
                  <div style={{fontSize:11, color:theme.textMuted, lineHeight:1.6}}>{s.body}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Members = () => (
  <div className="content">
    <div className="card" style={{marginBottom:16}}>
      <div className="card-header">
        <div><div className="card-title">All Members (12)</div><div className="card-sub">Faida Women Group</div></div>
        <div style={{display:"flex", gap:8}}>
          <button className="btn btn-sm"><MessageSquare size={13}/> WhatsApp Invite</button>
          <button className="btn btn-primary btn-sm"><Plus size={13}/> Add Member</button>
        </div>
      </div>
      <div className="card-body">
        {MEMBERS.map((m,i) => (
          <div key={i} className="table-row">
            <div className="avatar" style={{background:m.colorBg, color:m.color}}>{m.initials}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, color:theme.text}}>{m.name} {m.flag !== "🇰🇪" && <span style={{fontSize:14}}>{m.flag}</span>}</div>
              <div style={{fontSize:11, color:theme.textMuted, display:"flex", gap:8, marginTop:2}}>
                <span><MapPin size={10}/> {m.county}</span>
                <span><Phone size={10}/> {m.phone}</span>
              </div>
            </div>
            <div style={{textAlign:"center", marginRight:16}}>
              <div style={{fontFamily:"Syne", fontSize:16, fontWeight:700, color: m.score>=750?theme.green: m.score>=700?theme.amber:theme.red}}>{m.score}</div>
              <div style={{fontSize:10, color:theme.textMuted}}>score</div>
            </div>
            <div style={{textAlign:"center", marginRight:16}}>
              <div style={{fontSize:13, fontWeight:600, color:theme.text}}>{m.months}</div>
              <div style={{fontSize:10, color:theme.textMuted}}>months</div>
            </div>
            <span className={`status-badge ${m.role==="Chair"?"badge-green":m.role==="Treasurer"?"badge-blue":m.role==="Diaspora"?"badge-purple":"badge-gray"}`}>{m.role}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="card">
      <div className="card-header"><div className="card-title">WhatsApp Onboarding</div><div className="card-sub">Send invite links directly via WhatsApp</div></div>
      <div className="card-body">
        <div className="whatsapp-preview">
          <div className="wa-bubble">
            <div style={{fontWeight:600, fontSize:12, color:"#075E54", marginBottom:4}}>Chama OS 🌿</div>
            <div style={{fontSize:12}}>Habari Grace! You've been invited to join <strong>Faida Women Group</strong> on Chama OS.</div>
            <div style={{fontSize:12, marginTop:6}}>📌 Contribution: KES 5,000/month<br/>👥 12 members · Est. 2019<br/>💰 Pool: KES 420,000</div>
            <div style={{marginTop:8, background:"#00A86B", color:"white", borderRadius:6, padding:"6px 12px", fontSize:12, textAlign:"center", cursor:"pointer"}}>Join Chama →</div>
            <div className="wa-time">09:41 ✓✓</div>
          </div>
          <div className="wa-bubble sent">
            <div style={{fontSize:12}}>Nimepokea! Nitajiunga sasa hivi 🙏</div>
            <div className="wa-time">09:43 ✓✓</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MinutesPage = () => (
  <div className="content">
    <div className="card" style={{marginBottom:16}}>
      <div className="card-header">
        <div><div className="card-title">Meeting Minutes</div><div className="card-sub">AI-assisted recording</div></div>
        <button className="btn btn-primary btn-sm"><Plus size={13}/> New Meeting</button>
      </div>
      <div className="card-body">
        {MINUTES.map((m,i) => (
          <div key={i} className="minutes-item">
            <div style={{width:40, height:40, borderRadius:10, background:theme.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <FileText size={18} color={theme.textMuted}/>
            </div>
            <div style={{flex:1}}>
              <div className="minutes-title">{m.title}</div>
              <div className="minutes-meta">{m.date} · {m.attendees} attended · {m.action_items} action items</div>
            </div>
            {m.ai_generated && <span className="status-badge badge-purple" style={{fontSize:10}}><Zap size={9}/> AI</span>}
            <button className="btn btn-ghost btn-sm"><Eye size={13}/> View</button>
          </div>
        ))}
      </div>
    </div>
    <div className="card">
      <div className="card-header"><div className="card-title">AI Meeting Assistant</div><div className="card-sub">Record → Auto-transcribe → Generate minutes</div></div>
      <div className="card-body">
        <div style={{background:theme.bg, borderRadius:10, padding:16, textAlign:"center"}}>
          <div style={{width:56, height:56, borderRadius:"50%", background:theme.greenLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px"}}>
            <Activity size={24} color={theme.green}/>
          </div>
          <div style={{fontSize:14, fontWeight:600, color:theme.text, marginBottom:6}}>Record your next meeting</div>
          <div style={{fontSize:12, color:theme.textMuted, marginBottom:16}}>Speak in Swahili or English. AI generates formal minutes, action items, and voting records automatically.</div>
          <button className="btn btn-primary" style={{margin:"0 auto"}}><Activity size={14}/> Start Recording</button>
        </div>
      </div>
    </div>
  </div>
);

const InsurancePage = () => (
  <div className="content">
    <div className="insurance-card" style={{marginBottom:16}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:11, color:"rgba(168,196,176,0.7)", textTransform:"uppercase", letterSpacing:"1px", marginBottom:8}}>Group Micro-Insurance</div>
          <div style={{fontFamily:"Syne", fontSize:32, fontWeight:800, color:"white", marginBottom:4}}>Active Cover</div>
          <div style={{fontSize:13, color:"rgba(255,255,255,0.7)"}}>12 members covered · KES 200/member/month</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11, color:"rgba(168,196,176,0.7)"}}>Cover expires</div>
          <div style={{fontSize:16, fontWeight:700, color:"white"}}>May 31, 2026</div>
          <span className="status-badge badge-green" style={{marginTop:6, display:"inline-flex"}}>✓ Jubilee Insurance</span>
        </div>
      </div>
    </div>
    <div className="grid-3">
      {[
        {title:"Contribution Protection",desc:"If a member can't pay due to illness or job loss, insurance covers their contribution for up to 3 months.",icon:<Heart size={20}/>,price:"KES 80/mo"},
        {title:"Group Fund Cover",desc:"Protects the entire pool against fraud or cyber theft up to KES 500,000.",icon:<Lock size={20}/>,price:"KES 50/mo"},
        {title:"Payout Guarantee",desc:"If the next recipient faces a family emergency, payout is fast-tracked within 24 hours.",icon:<Zap size={20}/>,price:"KES 70/mo"},
      ].map((ins,i) => (
        <div key={i} className="card">
          <div className="card-body">
            <div style={{width:40, height:40, borderRadius:10, background:theme.greenLight, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, color:theme.green}}>{ins.icon}</div>
            <div style={{fontSize:13, fontWeight:700, color:theme.text, marginBottom:6}}>{ins.title}</div>
            <div style={{fontSize:11, color:theme.textMuted, lineHeight:1.7, marginBottom:12}}>{ins.desc}</div>
            <div style={{fontFamily:"Syne", fontSize:16, fontWeight:700, color:theme.green}}>{ins.price}</div>
            <div style={{fontSize:10, color:theme.textMuted}}>per member</div>
            <span className="status-badge badge-green" style={{marginTop:8, display:"inline-flex", fontSize:10}}>✓ Active</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",   label:"Dashboard",        icon:LayoutDashboard, page:Dashboard },
  { id:"merry",       label:"Merry-go-round",   icon:RefreshCw,       page:MerryGoRound },
  { id:"investments", label:"Investments",       icon:TrendingUp,      page:Investments },
  { id:"voting",      label:"Voting",            icon:Vote,            page:VotingPage, badge:"3" },
  { id:"credit",      label:"Credit Score",      icon:Award,           page:CreditScore },
  { id:"diaspora",    label:"Diaspora Mode",     icon:Globe,           page:DiasporaPage, badgeNew:"NEW" },
  { id:"insurance",   label:"Insurance",         icon:Heart,           page:InsurancePage, badgeNew:"NEW" },
  { id:"minutes",     label:"Meeting Minutes",   icon:FileText,        page:MinutesPage },
  { id:"members",     label:"Members",           icon:Users,           page:Members },
  { id:"disputes",    label:"Disputes",          icon:ShieldAlert,     page:Disputes, badge:"2" },
];

const PAGE_TITLES = {
  dashboard:   { title:"Good morning, Wanjiru 👋", sub:"Faida Women Group · May 2026" },
  merry:       { title:"Merry-go-round",           sub:"12-member rotation tracker" },
  investments: { title:"Investments",              sub:"Group portfolio & opportunities" },
  voting:      { title:"Voting",                   sub:"3 proposals awaiting your vote" },
  credit:      { title:"Credit Score",             sub:"Your Chama OS reputation" },
  diaspora:    { title:"Diaspora Mode",            sub:"Multi-currency contributions" },
  insurance:   { title:"Micro-Insurance",          sub:"Group protection cover" },
  minutes:     { title:"Meeting Minutes",          sub:"AI-assisted records" },
  members:     { title:"Members",                  sub:"12 active members" },
  disputes:    { title:"Dispute Resolution",       sub:"2 open cases" },
};

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("dashboard");
  const current = NAV.find(n => n.id === active);
  const PageComp = current.page;
  const pt = PAGE_TITLES[active];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon"><Home size={16} color="white"/></div>
              <div className="logo-name">Chama OS</div>
            </div>
            <div className="logo-tagline">Pesa yako, nguvu yako</div>
          </div>
          <div className="chama-switcher">
            <div className="chama-switcher-name">Faida Women Group <ChevronDown size={14}/></div>
            <div className="chama-switcher-meta">12 members · Est. 2019 · Nairobi</div>
          </div>
          <div className="nav-section">Main</div>
          {NAV.slice(0,5).map(n => (
            <div key={n.id} className={`nav-item ${active===n.id?"active":""}`} onClick={() => setActive(n.id)}>
              <n.icon size={16}/> {n.label}
              {n.badge && <span className="badge-count">{n.badge}</span>}
            </div>
          ))}
          <div className="nav-section">New Features</div>
          {NAV.slice(5,8).map(n => (
            <div key={n.id} className={`nav-item ${active===n.id?"active":""}`} onClick={() => setActive(n.id)}>
              <n.icon size={16}/> {n.label}
              {n.badgeNew && <span className="badge-new">{n.badgeNew}</span>}
            </div>
          ))}
          <div className="nav-section">Management</div>
          {NAV.slice(8).map(n => (
            <div key={n.id} className={`nav-item ${active===n.id?"active":""}`} onClick={() => setActive(n.id)}>
              <n.icon size={16}/> {n.label}
              {n.badge && <span className="badge-count">{n.badge}</span>}
            </div>
          ))}
          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">WK</div>
              <div><div className="user-name">Wanjiru Kamau</div><div className="user-score">Score 782 · Chair 🇰🇪</div></div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="topbar">
            <div><div className="page-title">{pt.title}</div><div className="page-sub">{pt.sub}</div></div>
            <div className="topbar-actions">
              <button className="btn btn-ghost btn-sm" style={{position:"relative"}}><Bell size={16}/><div className="notification-dot"/></button>
              <button className="btn btn-primary btn-sm"><Plus size={14}/> Contribute</button>
            </div>
          </div>
          <PageComp key={active}/>
        </div>
      </div>
    </>
  );
}
