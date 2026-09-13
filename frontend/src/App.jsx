import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { LoginModal, MemberModal } from './components/Modals';
import Dashboard from './pages/Dashboard';
import TransactionForm from './components/TransactionForm';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Members from './pages/Members';
import Share from './pages/Share';
import PDFCenter from './pages/PDFCenter';
import Settings from './pages/Settings';
import { defaultSettings } from './data';
import { api, getToken, logout as apiLogout } from './api';
import { money, today } from './utils';
import './styles.css';

export default function App() {
  const [transactions,setTransactions]=useState([]), [members,setMembers]=useState([]), [settings,setSettings]=useState(defaultSettings);
  const [active,setActive]=useState('home'), [admin,setAdmin]=useState(!!getToken()), [menuOpen,setMenuOpen]=useState(false);
  const [toast,setToast]=useState(''), [editing,setEditing]=useState(null), [showLogin,setShowLogin]=useState(false), [showMember,setShowMember]=useState(false), [loading,setLoading]=useState(true);
  const [reportDate,setReportDate]=useState(today().slice(0,7)), [search,setSearch]=useState('');
  const notify=(msg)=>{setToast(msg);setTimeout(()=>setToast(''),2500)};
  const navigate=(page)=>{setActive(page);setMenuOpen(false);setEditing(null);window.scrollTo({top:0,behavior:'smooth'});};
  const load=async()=>{try{const [tx,m,s]=await Promise.all([api.transactions(),api.members(),api.settings()]);setTransactions(tx);setMembers(m);setSettings(s);}catch(e){notify(`Backend error: ${e.message}`);}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const totals=useMemo(()=>{const added=transactions.filter(t=>t.type==='add').reduce((s,t)=>s+Number(t.amount),0);const withdrawn=transactions.filter(t=>t.type==='withdraw').reduce((s,t)=>s+Number(t.amount),0);return {added,withdrawn,balance:added-withdrawn}},[transactions]);
  const sorted=useMemo(()=>[...transactions].sort((a,b)=>a.id-b.id),[transactions]);
  const balances=useMemo(()=>{let b=0;const map={};sorted.forEach(t=>{b+=t.type==='add'?Number(t.amount):-Number(t.amount);map[t.id]=b});return map},[sorted]);
  const filtered=useMemo(()=>{const q=search.toLowerCase();return sorted.filter(t=>`${t.person} ${t.description} ${t.date} ${t.type}`.toLowerCase().includes(q)).reverse()},[sorted,search]);
  const monthly=useMemo(()=>{const list=transactions.filter(t=>t.date.startsWith(reportDate));const added=list.filter(t=>t.type==='add').reduce((s,t)=>s+Number(t.amount),0);const withdrawn=list.filter(t=>t.type==='withdraw').reduce((s,t)=>s+Number(t.amount),0);return {list,added,withdrawn,balance:added-withdrawn}},[transactions,reportDate]);
  const saveTransaction=async(data)=>{if(!admin)return setShowLogin(true);const amount=Number(data.amount);if(!amount||amount<=0)return notify('Enter a valid amount.');if(data.type==='withdraw'&&amount>totals.balance)return notify('Withdrawal cannot exceed current balance.');const tx={date:data.date||today(),type:data.type,person:data.person?.trim()||(data.type==='add'?'Collection':'Committee'),description:data.description?.trim()||(data.type==='add'?'Donation':'Expense'),amount};try{const saved=editing?await api.updateTransaction(editing.id,tx):await api.addTransaction(tx);setTransactions(p=>editing?p.map(t=>t.id===editing.id?{...saved}:t):[...p,saved]);setEditing(null);notify(editing?'Transaction updated.':'Transaction saved.');navigate('transactions')}catch(e){notify(e.message)}};
  const edit=(t)=>{if(!admin)return setShowLogin(true);setEditing(t);setActive('transaction')};
  const remove=async(id)=>{if(!admin)return setShowLogin(true);if(confirm('Delete this transaction?'))try{await api.deleteTransaction(id);setTransactions(p=>p.filter(t=>t.id!==id));notify('Transaction deleted.')}catch(e){notify(e.message)}};
  const addMember=async(m)=>{try{const saved=await api.addMember(m);setMembers(p=>[...p,saved]);setShowMember(false);notify('Committee member added.')}catch(e){notify(e.message)}};
  const removeMember=async(id)=>{if(!admin)return setShowLogin(true);if(confirm('Remove this member?'))try{await api.deleteMember(id);setMembers(p=>p.filter(m=>m.id!==id));notify('Member removed.')}catch(e){notify(e.message)}};
  const shareWhatsApp=()=>{const text=`${settings.committeeName} – Ganesh Chaturthi Fund\n\nTotal Added: ${money(totals.added)}\nTotal Withdrawn: ${money(totals.withdrawn)}\nCurrent Balance: ${money(totals.balance)}\nTransactions: ${transactions.length}\n\nGanapathi Bappa Morya! 🙏`;window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer')};
  const receipt=(tx)=>{const doc=new jsPDF();doc.setFillColor(143,29,20);doc.rect(0,0,210,30,'F');doc.setTextColor(255,255,255);doc.setFontSize(20);doc.text('Ganesh Chaturthi Fund',105,15,{align:'center'});doc.setFontSize(11);doc.text(settings.committeeName,105,23,{align:'center'});doc.setTextColor(45,27,18);doc.setFontSize(15);doc.text(tx.type==='add'?'DONATION / COLLECTION RECEIPT':'EXPENSE / WITHDRAWAL RECEIPT',105,50,{align:'center'});doc.setFontSize(12);doc.text(`Receipt ID: GCF-${String(tx.id).slice(-8)}`,20,68);doc.text(`Date: ${tx.date}`,20,80);doc.text(`Name: ${tx.person}`,20,92);doc.text(`Description: ${tx.description}`,20,104);doc.text(`Amount: ${money(tx.amount)}`,20,116);doc.text(`Type: ${tx.type==='add'?'Amount Added':'Amount Withdrawn'}`,20,128);doc.text('Ganapathi Bappa Morya!',105,160,{align:'center'});doc.save(`Ganesh-Receipt-${tx.id}.pdf`);notify('PDF receipt generated.')};
  const report=(type)=>{const doc=new jsPDF();const list=type==='monthly'?monthly.list:transactions;const added=list.filter(t=>t.type==='add').reduce((s,t)=>s+Number(t.amount),0);const withdrawn=list.filter(t=>t.type==='withdraw').reduce((s,t)=>s+Number(t.amount),0);doc.setFillColor(143,29,20);doc.rect(0,0,210,30,'F');doc.setTextColor(255,255,255);doc.setFontSize(17);doc.text(settings.committeeName,105,13,{align:'center'});doc.setFontSize(11);doc.text(type==='monthly'?`Monthly Report - ${reportDate}`:'Complete Fund Report',105,22,{align:'center'});doc.setTextColor(40,40,40);doc.setFontSize(10);doc.text(`Added: ${money(added)}    Withdrawn: ${money(withdrawn)}    Net: ${money(added-withdrawn)}`,20,45);let y=58;list.slice().sort((a,b)=>a.date.localeCompare(b.date)).forEach(t=>{if(y>280){doc.addPage();y=20}doc.text(`${t.date} | ${t.type.toUpperCase()} | ${String(t.person).slice(0,16)} | ${String(t.description).slice(0,25)} | ${money(t.amount)}`,12,y);y+=7});doc.save(`Ganesh-Fund-${type}-${reportDate}.pdf`);notify('Report PDF generated.')};
  const reset=async()=>{if(!admin)return setShowLogin(true);if(confirm('Restore demo transactions?'))try{const tx=await api.resetTransactions();setTransactions(tx);notify('Demo data restored.')}catch(e){notify(e.message)}};
  const saveSettings=async(next)=>{try{const saved=await api.updateSettings(next);setSettings(saved);notify('Settings saved.')}catch(e){notify(e.message)}};
  const doLogout=()=>{apiLogout();setAdmin(false);setEditing(null);navigate('home');notify('Admin logged out.')};
  if(loading)return <div className="app"><div className="main"><main className="content"><div className="card"><h2>Connecting to server...</h2><p>Loading Ganesh Fund data from MySQL backend.</p></div></main></div></div>;
  return <div className="app"><Sidebar active={active} navigate={navigate} admin={admin} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/><div className="main"><Header settings={settings} admin={admin} onLogin={()=>admin?doLogout():setShowLogin(true)} onMenu={()=>setMenuOpen(v=>!v)}/><main className="content">
    {active==='home'&&<Dashboard totals={totals} members={members} onAdd={saveTransaction} onNavigate={navigate} onWhatsApp={shareWhatsApp} onReceipt={receipt} onEdit={edit} onDelete={remove} filtered={filtered} balances={balances} search={search} setSearch={setSearch}/>} 
    {active==='transaction'&&admin&&<><div className="page-title"><div><h2>{editing?'Edit Transaction':'Add Transaction'}</h2><p>Record a collection or committee expense.</p></div></div><TransactionForm onSave={saveTransaction} initial={editing}/></>}
    {active==='transactions'&&<Transactions transactions={filtered} balances={balances} search={search} setSearch={setSearch} onEdit={edit} onDelete={remove} onReceipt={receipt}/>} 
    {active==='reports'&&<Reports monthly={monthly} reportDate={reportDate} setReportDate={setReportDate} onReport={report}/>} 
    {active==='members'&&<Members members={members} onAdd={()=>admin?setShowMember(true):setShowLogin(true)} onDelete={removeMember}/>} 
    {active==='share'&&<Share totals={totals} settings={settings} onShare={shareWhatsApp}/>} 
    {active==='pdf'&&<PDFCenter transactions={transactions} onReceipt={receipt} onReport={report}/>} 
    {active==='settings'&&<Settings settings={settings} setSettings={setSettings} admin={admin} onReset={reset} onSave={saveSettings}/>} 
  </main></div>{showLogin&&<LoginModal onClose={()=>setShowLogin(false)} onSuccess={()=>{setAdmin(true);setShowLogin(false);notify('Admin mode enabled.')}}/>}{showMember&&<MemberModal onClose={()=>setShowMember(false)} onSave={addMember}/>} {toast&&<div className="toast">✓ {toast}</div>}</div>;
}
