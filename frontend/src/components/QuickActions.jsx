import React from 'react';
import { BarChart3, FileText, MessageCircle } from 'lucide-react';
export default function QuickActions({ onWhatsApp, onReports, onPDF }) {
  return <div className="quick-grid"><button onClick={onWhatsApp}><MessageCircle/>Share Balance on WhatsApp</button><button onClick={onReports}><BarChart3/>Date / Monthly Reports</button><button onClick={onPDF}><FileText/>Generate PDF Receipt</button></div>;
}
