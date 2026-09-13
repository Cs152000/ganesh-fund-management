import React from 'react';
import { Lock, LogOut, Menu, Settings } from 'lucide-react';



export default function Header({ settings, onLogin, admin, onMenu }) {
  return <header className="header">
    <button className="hamburger" onClick={onMenu}><Menu/></button>
    <div className="hero"><div className="ganesh-art"><img src="ganeshLogo.png" alt="no image " className='ganeshLogo' /></div><div><h1>Shri Ganesh Utsav Committee</h1><p>Ganesh Chaturthi {settings.festivalYear} • Together for a Bigger Celebration</p></div></div>
    <button className="admin-button" onClick={onLogin}>{admin ? <><LogOut size={18}/> Logout</> : <><Lock size={18}/> Admin Login</>}</button>
  </header>;
}
