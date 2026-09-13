import { Eye, EyeOff, ShieldCheck, Users, X } from 'lucide-react';
import React,{ useState } from 'react';
import { api } from '../api';

export function LoginModal({ onClose, onSuccess }) {
  const [username,setUsername]=useState('admin'); const [value,setValue]=useState(''); const [show,setShow]=useState(false); const [busy,setBusy]=useState(false);
  const login=async()=>{ if(!username||!value)return; setBusy(true); try { const data=await api.login(username,value); localStorage.setItem('ganesh_admin_token',data.token); onSuccess(); } catch(e){ alert(e.message||'Incorrect username or password'); } finally {setBusy(false);} };
  return <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={onClose}><X/></button><div className="modal-icon"><ShieldCheck/></div><h2>Admin Login</h2><p>Only the authenticated admin can add, withdraw, edit or delete transactions.</p><label>Username</label><input autoFocus value={username} onChange={e=>setUsername(e.target.value)} placeholder="Admin username"/>
  <label>Password</label><div className="password-input"><input type={show?'text':'password'} value={value} onChange={e=>setValue(e.target.value)} placeholder="Enter admin password" onKeyDown={e=>e.key==='Enter'&&login()}/><button onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div><button className="submit-btn" disabled={busy} onClick={login}>{busy?'Checking...':'Login Securely'}</button></div></div>;
}

export function MemberModal({ onClose, onSave }) {
  const [m,setM]=useState({name:'',role:'Member',phone:''});
  return <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={onClose}><X/></button><div className="modal-icon"><Users/></div><h2>Add Committee Member</h2><label>Name</label><input value={m.name} onChange={e=>setM({...m,name:e.target.value})} placeholder="Full name"/><label>Role</label><input value={m.role} onChange={e=>setM({...m,role:e.target.value})} placeholder="President / Treasurer / Member"/><label>Phone</label><input value={m.phone} onChange={e=>setM({...m,phone:e.target.value})} placeholder="10-digit mobile number"/><button className="submit-btn" onClick={()=>m.name.trim()?onSave(m):alert('Enter member name')}>Add Member</button></div></div>;
}
