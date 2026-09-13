import { Lock } from 'lucide-react';
import { useState } from 'react';
export default function Settings({ settings, setSettings, admin, onReset, onSave }) {
  const [local,setLocal]=useState(settings);
  return <><div className="page-title"><div><h2>Settings</h2><p>Committee and admin configuration.</p></div></div><section className="card settings-card">{!admin&&<div className="locked-banner"><Lock size={18}/> Login as admin to change settings.</div>}
    <label>Committee Name</label><input disabled={!admin} value={local.committeeName} onChange={e=>setLocal({...local,committeeName:e.target.value})}/>
    <label>Festival Year</label><input disabled={!admin} value={local.festivalYear} onChange={e=>setLocal({...local,festivalYear:e.target.value})}/>
    <label>Admin Password</label><input disabled={!admin} type="password" value={local.adminPassword} onChange={e=>setLocal({...local,adminPassword:e.target.value})}/>
    <div className="settings-actions"><button className="primary" disabled={!admin} onClick={()=>{setSettings(local);onSave()}}>Save Settings</button><button className="danger" disabled={!admin} onClick={onReset}>Restore Demo Data</button></div>
  </section></>;
}
