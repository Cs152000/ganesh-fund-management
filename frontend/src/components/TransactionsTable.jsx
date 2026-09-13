import React from 'react';
import { Download, Pencil, Search, Trash2 } from 'lucide-react';
import { money } from '../utils';

export default function TransactionsTable({ transactions, balances, search, setSearch, onEdit, onDelete, onReceipt, compact=false }) {
  return <section className={`card table-card ${compact ? 'compact' : ''}`}>
    <div className="card-title"><div><h3>Transactions</h3>{!compact && <small>All collection and withdrawal entries</small>}</div>
      <div className="table-tools"><div className="search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or description..."/></div></div>
    </div>
    <div className="table-wrap"><table><thead><tr><th>#</th><th>Date</th><th>Type</th><th>Name / Description</th><th>Amount</th><th>Balance</th><th>Actions</th></tr></thead>
      <tbody>{transactions.length === 0 ? <tr><td colSpan="7" className="empty">No transactions found.</td></tr> : transactions.map((t,i)=><tr key={t.id}>
        <td>{i+1}</td><td>{t.date}</td><td><span className={`badge ${t.type}`}>{t.type === 'add' ? 'Added' : 'Withdrawn'}</span></td>
        <td><b>{t.person}</b><small>{t.description}</small></td><td className={t.type === 'add' ? 'positive' : 'negative'}>{t.type === 'add' ? '+' : '−'} {money(t.amount)}</td>
        <td className="balance-cell">{money(balances[t.id])}</td><td><div className="actions"><button title="Receipt" onClick={()=>onReceipt(t)}><Download size={16}/></button><button title="Edit" onClick={()=>onEdit(t)}><Pencil size={16}/></button><button title="Delete" onClick={()=>onDelete(t.id)}><Trash2 size={16}/></button></div></td>
      </tr>)}</tbody></table></div>
  </section>;
}
