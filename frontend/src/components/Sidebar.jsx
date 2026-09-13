import React from 'react';
import { BarChart3, FileText, Home, Lock, MessageCircle, Plus, Settings, Wallet, Users, X } from 'lucide-react';

export default function Sidebar({ active, navigate, admin, menuOpen, setMenuOpen }) {
  const items = [
    ['home', 'Home', Home], ['transaction', 'Add Transaction', Plus],
    ['transactions', 'Transactions', Wallet], ['reports', 'Reports', BarChart3],
    ['share', 'WhatsApp Share', MessageCircle], ['pdf', 'Generate PDF', FileText],
    ['members', 'Committee Members', Users], ['settings', 'Settings', Settings]
  ];
  return <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
    <div className="brand"><div className="brand-icon">ॐ</div><strong>Ganesh Chaturthi</strong><span>Fund Tracker</span></div>
    <button className="mobile-close" onClick={() => setMenuOpen(false)}><X /></button>
    <nav>{items.filter(([id]) => id !== 'transaction' || admin).map(([id, label, Icon]) => <button key={id} className={active === id ? 'nav active' : 'nav'} onClick={() => navigate(id)}><Icon size={19}/><span>{label}</span></button>)}</nav>
    <div className="sidebar-quote">“May Lord Ganesha remove all obstacles and bring prosperity to our efforts.”<br/><b>🙏</b></div>
    <div className="side-admin">{admin ? <><span>✓</span> Admin Active</> : <><Lock size={17}/> Admin Required for editing</>}</div>
  </aside>;
}
