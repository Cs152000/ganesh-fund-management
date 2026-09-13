import React from 'react';
import { Minus, Plus, Wallet } from 'lucide-react';
import { money } from '../utils';

export default function Stats({ totals }) {
  return <div className="stats">
    <div className="stat-card add"><div className="stat-icon"><Plus/></div><small>Total Added</small><strong>{money(totals.added)}</strong></div>
    <div className="stat-card out"><div className="stat-icon"><Minus/></div><small>Total Withdrawn</small><strong>{money(totals.withdrawn)}</strong></div>
    <div className="stat-card balance"><div className="stat-icon"><Wallet/></div><small>Current Balance</small><strong>{money(totals.balance)}</strong></div>
  </div>;
}
