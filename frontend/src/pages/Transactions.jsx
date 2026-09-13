
import React  from 'react';


import TransactionsTable from '../components/TransactionsTable';
export default function Transactions({ ...props }) { return <><div className="page-title"><div><h2>Transactions</h2><p>Search, edit, download receipts or delete entries.</p></div></div><TransactionsTable {...props}/></>; }
