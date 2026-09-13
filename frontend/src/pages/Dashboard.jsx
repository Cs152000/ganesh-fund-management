import React from 'react';
import { BarChart3, FileText, MessageCircle, Plus, Users } from 'lucide-react';
import Stats from '../components/Stats';
import TransactionForm from '../components/TransactionForm';
import TransactionsTable from '../components/TransactionsTable';
import QuickActions from '../components/QuickActions';
import { initials } from '../utils';

export default function Dashboard({ totals, members, onAdd, onNavigate, onWhatsApp, onReceipt, onEdit, onDelete, filtered, balances, search, setSearch }) {
  return <>
    <div className="page-title"><div><h2>Dashboard</h2><p>Manage collections, expenses and committee funds.</p></div><button className="primary" onClick={()=>onNavigate('transaction')}><Plus size={18}/> Add Transaction</button></div>
    <Stats totals={totals}/>
    <div className="dashboard-grid"><TransactionForm onSave={onAdd}/><div className="card mini-card"><div className="card-title"><h3><Users size={19}/> Committee Members</h3><button className="link-btn" onClick={()=>onNavigate('members')}>View all</button></div>{members.slice(0,5).map(m=><div className="member-row" key={m.id}><div className="avatar">{initials(m.name)}</div><div><b>{m.name}</b><small>{m.role}</small></div></div>)}</div></div>
    <QuickActions onWhatsApp={onWhatsApp} onReports={()=>onNavigate('reports')} onPDF={()=>onNavigate('pdf')}/>
    <TransactionsTable transactions={filtered} balances={balances} search={search} setSearch={setSearch} onEdit={onEdit} onDelete={onDelete} onReceipt={onReceipt} compact/>
  </>;
}
