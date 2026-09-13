const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export function getToken(){ return localStorage.getItem('ganesh_admin_token'); }
export function isAdmin(){ return !!getToken(); }
export function logout(){ localStorage.removeItem('ganesh_admin_token'); }

async function request(path, options={}) {
  const headers = { 'Content-Type':'application/json', ...(options.headers||{}) };
  const token=getToken();
  if(token) headers.Authorization=`Bearer ${token}`;
  const res=await fetch(`${API_BASE}${path}`, {...options, headers});
  if(res.status===204) return null;
  const text=await res.text();
  let body; try { body=text?JSON.parse(text):null; } catch { body=text; }
  if(!res.ok) throw new Error(body?.message || body || `Request failed (${res.status})`);
  return body;
}
export const api={
  login:(username,password)=>request('/auth/login',{method:'POST',body:JSON.stringify({username,password})}),
  transactions:()=>request('/transactions'),
  addTransaction:(tx)=>request('/transactions',{method:'POST',body:JSON.stringify(tx)}),
  updateTransaction:(id,tx)=>request(`/transactions/${id}`,{method:'PUT',body:JSON.stringify(tx)}),
  deleteTransaction:(id)=>request(`/transactions/${id}`,{method:'DELETE'}),
  resetTransactions:()=>request('/transactions/reset-demo',{method:'POST'}),
  members:()=>request('/members'),
  addMember:(m)=>request('/members',{method:'POST',body:JSON.stringify(m)}),
  deleteMember:(id)=>request(`/members/${id}`,{method:'DELETE'}),
  settings:()=>request('/settings'),
  updateSettings:(s)=>request('/settings',{method:'PUT',body:JSON.stringify(s)})
};
