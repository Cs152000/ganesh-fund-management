import { Download, FileText } from 'lucide-react';
import { money } from '../utils';
export default function Reports({ monthly, reportDate, setReportDate, onReport }) {
  return <><div className="page-title"><div><h2>Reports</h2><p>View date-wise and month-wise fund activity.</p></div><button className="primary" onClick={()=>onReport('monthly')}><Download size={18}/> Download Monthly PDF</button></div>
    <div className="report-controls card"><div><label>Select Month</label><input type="month" value={reportDate} onChange={e=>setReportDate(e.target.value)}/></div><button className="secondary" onClick={()=>onReport('all')}><FileText size={18}/> Complete Report</button></div>
    <div className="report-summary"><div className="report-box"><small>Month Added</small><b>{money(monthly.added)}</b></div><div className="report-box"><small>Month Withdrawn</small><b>{money(monthly.withdrawn)}</b></div><div className="report-box"><small>Month Net</small><b>{money(monthly.balance)}</b></div></div>
    <section className="card table-card"><div className="card-title"><h3>{reportDate} Transactions</h3><span>{monthly.list.length} entries</span></div><div className="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>Name</th><th>Description</th><th>Amount</th></tr></thead><tbody>{monthly.list.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(t=><tr key={t.id}><td>{t.date}</td><td>{t.type}</td><td>{t.person}</td><td>{t.description}</td><td className={t.type==='add'?'positive':'negative'}>{money(t.amount)}</td></tr>)}</tbody></table></div></section>
  </>;
}
