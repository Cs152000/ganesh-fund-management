import React from 'react';
import { Trash2, UserPlus } from 'lucide-react';
import { initials } from '../utils';
export default function Members({ members, onAdd, onDelete }) {
  return <><div className="page-title"><div><h2>Committee Members</h2><p>Manage your Ganesh Chaturthi committee.</p></div><button className="primary" onClick={onAdd}><UserPlus size={18}/> Add Member</button></div>
    <div className="member-grid">{members.map(m=><div className="card member-card" key={m.id}><div className="large-avatar">{initials(m.name)}</div><h3>{m.name}</h3><span>{m.role}</span><a href={`tel:${m.phone}`}>{m.phone}</a><button className="delete-member" onClick={()=>onDelete(m.id)}><Trash2 size={15}/> Remove</button></div>)}</div>
  </>;
}
