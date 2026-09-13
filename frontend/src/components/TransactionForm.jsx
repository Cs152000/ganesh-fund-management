import React from 'react';
import { Minus, Plus, ReceiptText } from 'lucide-react';
import { today } from '../utils';
import { useEffect, useState } from 'react';

export default function TransactionForm({ onSave, initial }) {
  const [type, setType] = useState(initial?.type || 'add');
  const [person, setPerson] = useState(initial?.person || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [amount, setAmount] = useState(initial?.amount || '');
  const [date, setDate] = useState(initial?.date || today());

  useEffect(() => {
    if (initial) {
      setType(initial.type); setPerson(initial.person); setDescription(initial.description);
      setAmount(initial.amount); setDate(initial.date);
    }
  }, [initial]);

  const submit = () => onSave({ type, person, description, amount, date });

  return <div className="card form-card">
    <div className="card-title"><h3><ReceiptText size={21}/> {initial ? 'Edit Transaction' : 'Add / Withdraw Amount'}</h3></div>
    <label>Transaction Type</label>
    <div className="type-switch">
      <button className={type === 'add' ? 'selected add-type' : ''} onClick={() => setType('add')}><Plus/> Add (Collection)</button>
      <button className={type === 'withdraw' ? 'selected out-type' : ''} onClick={() => setType('withdraw')}><Minus/> Withdraw (Expense)</button>
    </div>
    <div className="form-grid"><div><label>Name</label><input value={person} onChange={e=>setPerson(e.target.value)} placeholder="Donor / committee member"/></div><div><label>Amount (₹)</label><input type="number" min="1" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount"/></div></div>
    <div className="form-grid"><div><label>Description</label><input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Donation, decoration, pooja items..."/></div><div><label>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></div></div>
    <button className="submit-btn" onClick={submit}>{initial ? 'Update Transaction' : 'Save Transaction'}</button>
  </div>;
}
