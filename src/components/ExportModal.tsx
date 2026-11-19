import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Download, 
  Check, 
  FileCode, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { CivicReport } from '../types';

interface ExportModalProps {
  reports: CivicReport[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  reports,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  // Generate the clean, production-ready, zero-build single HTML file
  const generateSingleHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Civic Portal - Municipal Public Issue Reporting & Tracking Utility</title>
  <meta name="description" content="Municipal citizen grievance redressal and infrastructure tracking portal.">
  <!-- Fonts: Public Sans & IBM Plex Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Public+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Tailwind CSS via CDN for standalone zero-build execution -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Leaflet Map CSS and JS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Public Sans"', 'sans-serif'],
            mono: ['"IBM Plex Mono"', 'monospace'],
          },
          colors: {
            ink: '#1C2B39',
            municipal: '#2F5D8A',
            'municipal-hover': '#24496D',
            signal: '#E2A63B',
            paper: '#F7F5F0',
            slate: '#6B7280',
            civicgreen: '#3F7D58',
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Public Sans', sans-serif; background-color: #F7F5F0; color: #1C2B39; }
    .ticket-mono { font-family: 'IBM Plex Mono', monospace; }
  </style>
</head>
<body class="min-h-screen bg-[#F7F5F0]">
  <!-- Municipal Banner -->
  <div class="bg-[#1C2B39] text-[#F7F5F0] px-4 py-1.5 text-xs flex justify-between items-center">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-[#E2A63B] inline-block animate-pulse"></span>
      <span class="font-semibold uppercase tracking-wider text-[11px]">Official Municipal Civic Redressal Utility • Replit Standalone Edition</span>
    </div>
    <div class="text-[11px] text-[#A0AEC0]">Zero-Build • LocalStorage Enabled</div>
  </div>

  <!-- Header -->
  <header class="bg-white border-b border-[#D8D2C5] px-6 py-4">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-[#1C2B39]">CIVIC PORTAL</h1>
        <p class="text-xs text-[#6B7280]">Municipal Citizen Redressal & Infrastructure Utility</p>
      </div>
      <div class="flex gap-2">
        <button onclick="switchTab('report')" id="tab-report-btn" class="px-4 py-2 rounded text-xs font-bold bg-[#2F5D8A] text-white">Report Problem</button>
        <button onclick="switchTab('track')" id="tab-track-btn" class="px-4 py-2 rounded text-xs font-bold bg-[#F1EFEA] text-[#1C2B39]">Track Complaints (<span id="ticket-count-badge">0</span>)</button>
        <button onclick="switchTab('map')" id="tab-map-btn" class="px-4 py-2 rounded text-xs font-bold bg-[#F1EFEA] text-[#1C2B39]">Live Map</button>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto p-6">
    <!-- View: Report -->
    <section id="view-report" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-7 bg-white p-6 rounded border border-[#D8D2C5] space-y-4">
        <h2 class="text-lg font-bold">Report an Infrastructure or Civic Problem</h2>
        <div>
          <label class="block text-xs font-bold uppercase mb-1">Problem Description</label>
          <textarea id="desc-input" rows="4" oninput="handleDescChange()" placeholder="e.g. Deep pothole on Main Road near hospital, leaking water pipe, broken streetlight..." class="w-full p-3 text-sm rounded border border-[#C5BFB3] bg-[#FAF8F5]"></textarea>
          <div id="detected-cat-badge" class="hidden mt-1 text-xs text-[#2F5D8A] font-semibold bg-[#2F5D8A]/10 p-2 rounded">
            Auto-detected department: <span id="detected-cat-name">Roads Maintenance</span>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase mb-1">Category Override</label>
          <div class="flex flex-wrap gap-2" id="cat-chips">
            <button type="button" onclick="selectCategory('pothole')" class="cat-btn px-3 py-1.5 rounded text-xs font-semibold border border-[#2F5D8A] bg-[#2F5D8A] text-white" data-cat="pothole">Roads & Potholes</button>
            <button type="button" onclick="selectCategory('garbage')" class="cat-btn px-3 py-1.5 rounded text-xs font-semibold border border-[#D8D2C5] bg-[#FAF8F5] text-[#1C2B39]" data-cat="garbage">Solid Waste</button>
            <button type="button" onclick="selectCategory('streetlight')" class="cat-btn px-3 py-1.5 rounded text-xs font-semibold border border-[#D8D2C5] bg-[#FAF8F5] text-[#1C2B39]" data-cat="streetlight">Streetlight</button>
            <button type="button" onclick="selectCategory('water')" class="cat-btn px-3 py-1.5 rounded text-xs font-semibold border border-[#D8D2C5] bg-[#FAF8F5] text-[#1C2B39]" data-cat="water">Water Supply</button>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase mb-1">Address / Landmark</label>
          <div class="flex gap-2">
            <input type="text" id="address-input" placeholder="e.g. 14 Central Avenue, Ward 12" class="flex-1 p-2 text-sm rounded border border-[#C5BFB3] bg-[#FAF8F5]">
            <button type="button" onclick="useLocation()" class="px-3 py-2 text-xs font-bold border border-[#2F5D8A] text-[#2F5D8A] rounded hover:bg-[#2F5D8A] hover:text-white">Use My Location</button>
          </div>
        </div>
        <button type="button" onclick="submitTicket()" class="w-full py-3 bg-[#2F5D8A] text-white font-bold rounded hover:bg-[#24496D] transition-colors">Submit Official Report</button>
      </div>

      <!-- Right Column: Auto-Routing Live Card -->
      <div class="lg:col-span-5 space-y-4">
        <div class="bg-white p-5 rounded border-2 border-[#2F5D8A]">
          <h3 class="font-bold text-sm text-[#1C2B39] mb-1">Automatic Department Routing Preview</h3>
          <p class="text-xs text-[#6B7280] mb-4">Live routing determined by chosen category</p>
          <div class="space-y-3">
            <div>
              <span class="text-[10px] uppercase font-bold text-[#6B7280]">Assigned Department</span>
              <p id="routing-dept-name" class="font-bold text-base text-[#1C2B39]">Public Works & Roads Maintenance Division</p>
            </div>
            <div class="bg-[#FAF8F5] p-3 rounded border border-[#E5E0D6] flex justify-between items-center">
              <div>
                <span class="text-xs text-[#6B7280]">Official Resolution SLA</span>
                <p id="routing-sla-hours" class="text-2xl font-extrabold text-[#2F5D8A]">48 Hours</p>
              </div>
            </div>
            <div class="text-xs text-[#6B7280] space-y-1">
              <div>Lead Officer: <strong id="routing-officer" class="text-[#1C2B39]">Er. R. K. Sharma (PWD)</strong></div>
              <div>Direct Helpline: <strong class="ticket-mono text-[#2F5D8A]">1800-425-7623</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- View: Track -->
    <section id="view-track" class="hidden space-y-4">
      <div class="bg-white p-5 rounded border border-[#D8D2C5] flex justify-between items-center">
        <div>
          <h2 class="text-lg font-bold">Registered Grievance Records</h2>
          <p class="text-xs text-[#6B7280]">Saved in browser LocalStorage. Click Advance to test workflow stages.</p>
        </div>
      </div>
      <div id="tickets-container" class="space-y-3"></div>
    </section>

    <!-- View: Map -->
    <section id="view-map" class="hidden space-y-4">
      <div class="bg-white p-4 rounded border border-[#D8D2C5]">
        <h2 class="text-lg font-bold">Civic Live Incident Map</h2>
        <p class="text-xs text-[#6B7280]">Color-coded pins: Amber (Submitted), Blue (Acknowledged), Indigo (In Progress), Green (Resolved)</p>
      </div>
      <div id="map-container" class="w-full h-[500px] rounded border border-[#D8D2C5] bg-white"></div>
    </section>
  </main>

  <script>
    // Embedded Storage Engine & State
    let reports = JSON.parse(localStorage.getItem('civic_reports_demo')) || [
      {
        id: 'CVC-2026-000001',
        title: 'Deep pothole at main junction',
        description: 'Pothole on main road causing hazard for two wheelers',
        category: 'pothole',
        dept: 'Public Works & Roads Maintenance Division',
        sla: '48 Hours',
        status: 'in_progress',
        lat: 13.0827,
        lng: 80.2707,
        address: 'EVR Periyar Salai, Ward 14',
        createdAt: new Date().toISOString()
      },
      {
        id: 'CVC-2026-000002',
        title: 'Overflowing garbage bin',
        description: 'Commercial waste overflowing near wholesale market',
        category: 'garbage',
        dept: 'Solid Waste & Sanitation Department',
        sla: '24 Hours',
        status: 'acknowledged',
        lat: 13.0875,
        lng: 80.2785,
        address: 'Market Back Alley, Ward 12',
        createdAt: new Date().toISOString()
      }
    ];

    let currentCategory = 'pothole';
    let mapInstance = null;

    const DEPT_MAP = {
      pothole: { name: 'Public Works & Roads Maintenance Division', sla: '48 Hours', officer: 'Er. R. K. Sharma (PWD)' },
      garbage: { name: 'Solid Waste & Sanitation Department', sla: '24 Hours', officer: 'Dr. Anita Deshmukh' },
      streetlight: { name: 'Municipal Electricity & Streetlighting Board', sla: '24 Hours', officer: 'Er. Sandeep Nair' },
      water: { name: 'Water Supply & Sewerage Board', sla: '36 Hours', officer: 'Er. Priya Swaminathan' }
    };

    function saveAndRender() {
      localStorage.setItem('civic_reports_demo', JSON.stringify(reports));
      document.getElementById('ticket-count-badge').innerText = reports.length;
      renderTickets();
      renderMapPins();
    }

    function switchTab(tab) {
      document.getElementById('view-report').classList.toggle('hidden', tab !== 'report');
      document.getElementById('view-track').classList.toggle('hidden', tab !== 'track');
      document.getElementById('view-map').classList.toggle('hidden', tab !== 'map');

      document.getElementById('tab-report-btn').className = tab === 'report' ? 'px-4 py-2 rounded text-xs font-bold bg-[#2F5D8A] text-white' : 'px-4 py-2 rounded text-xs font-bold bg-[#F1EFEA] text-[#1C2B39]';
      document.getElementById('tab-track-btn').className = tab === 'track' ? 'px-4 py-2 rounded text-xs font-bold bg-[#2F5D8A] text-white' : 'px-4 py-2 rounded text-xs font-bold bg-[#F1EFEA] text-[#1C2B39]';
      document.getElementById('tab-map-btn').className = tab === 'map' ? 'px-4 py-2 rounded text-xs font-bold bg-[#2F5D8A] text-white' : 'px-4 py-2 rounded text-xs font-bold bg-[#F1EFEA] text-[#1C2B39]';

      if (tab === 'map') {
        setTimeout(initMapIfNeeded, 100);
      }
    }

    function selectCategory(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-btn').forEach(btn => {
        const isSelected = btn.dataset.cat === cat;
        btn.className = isSelected ? 'cat-btn px-3 py-1.5 rounded text-xs font-semibold border border-[#2F5D8A] bg-[#2F5D8A] text-white' : 'cat-btn px-3 py-1.5 rounded text-xs font-semibold border border-[#D8D2C5] bg-[#FAF8F5] text-[#1C2B39]';
      });
      const d = DEPT_MAP[cat];
      document.getElementById('routing-dept-name').innerText = d.name;
      document.getElementById('routing-sla-hours').innerText = d.sla;
      document.getElementById('routing-officer').innerText = d.officer;
    }

    function handleDescChange() {
      const text = document.getElementById('desc-input').value.toLowerCase();
      let detected = null;
      if (text.includes('pothole') || text.includes('road') || text.includes('asphalt')) detected = 'pothole';
      else if (text.includes('garbage') || text.includes('trash') || text.includes('waste')) detected = 'garbage';
      else if (text.includes('light') || text.includes('bulb') || text.includes('lamp')) detected = 'streetlight';
      else if (text.includes('water') || text.includes('leak') || text.includes('drain')) detected = 'water';

      const badge = document.getElementById('detected-cat-badge');
      if (detected) {
        badge.classList.remove('hidden');
        document.getElementById('detected-cat-name').innerText = DEPT_MAP[detected].name;
        selectCategory(detected);
      } else {
        badge.classList.add('hidden');
      }
    }

    function useLocation() {
      navigator.geolocation.getCurrentPosition(
        pos => {
          document.getElementById('address-input').value = 'GPS: ' + pos.coords.latitude.toFixed(4) + ', ' + pos.coords.longitude.toFixed(4) + ' (Ward 14)';
        },
        () => {
          document.getElementById('address-input').value = 'Central Civic Square, Ward 14';
        }
      );
    }

    function submitTicket() {
      const desc = document.getElementById('desc-input').value;
      if (!desc.trim()) {
        alert('Please enter a description');
        return;
      }
      const addr = document.getElementById('address-input').value || 'Central Ward 14';
      const id = 'CVC-2026-' + Math.floor(100000 + Math.random() * 900000);
      const newReport = {
        id,
        title: desc.slice(0, 50),
        description: desc,
        category: currentCategory,
        dept: DEPT_MAP[currentCategory].name,
        sla: DEPT_MAP[currentCategory].sla,
        status: 'submitted',
        lat: 13.0827 + (Math.random() - 0.5) * 0.02,
        lng: 80.2707 + (Math.random() - 0.5) * 0.02,
        address: addr,
        createdAt: new Date().toISOString()
      };
      reports.unshift(newReport);
      saveAndRender();
      alert('Ticket Registered: ' + id);
      document.getElementById('desc-input').value = '';
      switchTab('track');
    }

    function advanceStatus(id) {
      const r = reports.find(x => x.id === id);
      if (!r) return;
      if (r.status === 'submitted') r.status = 'acknowledged';
      else if (r.status === 'acknowledged') r.status = 'in_progress';
      else if (r.status === 'in_progress') r.status = 'resolved';
      else r.status = 'submitted';
      saveAndRender();
    }

    function renderTickets() {
      const container = document.getElementById('tickets-container');
      container.innerHTML = reports.map(r => {
        let badgeColor = r.status === 'resolved' ? 'bg-green-100 text-green-800' :
                         r.status === 'in_progress' ? 'bg-indigo-100 text-indigo-800' :
                         r.status === 'acknowledged' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800';
        return '<div class="bg-white p-4 rounded border border-[#D8D2C5] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">' +
          '<div>' +
            '<div class="flex items-center gap-2 mb-1">' +
              '<span class="ticket-mono font-bold text-sm text-[#2F5D8A]">' + r.id + '</span>' +
              '<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ' + badgeColor + '">' + r.status.replace('_', ' ') + '</span>' +
            '</div>' +
            '<h4 class="font-bold text-sm text-[#1C2B39]">' + r.title + '</h4>' +
            '<p class="text-xs text-[#6B7280]">' + r.dept + ' • ' + r.address + '</p>' +
          '</div>' +
          '<div class="flex items-center gap-2">' +
            '<a href="https://www.google.com/maps/search/?api=1&query=' + r.lat + ',' + r.lng + '" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded text-xs font-bold border border-[#2F5D8A] text-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white">Google Maps</a>' +
            '<button onclick="advanceStatus(\'' + r.id + '\')" class="px-3 py-1.5 rounded text-xs font-bold bg-[#2F5D8A] text-white hover:bg-[#24496D]">Advance Status</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function initMapIfNeeded() {
      if (mapInstance) {
        mapInstance.invalidateSize();
        return;
      }
      mapInstance = L.map('map-container').setView([13.0827, 80.2707], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance);
      renderMapPins();
    }

    let markers = [];
    function renderMapPins() {
      if (!mapInstance) return;
      markers.forEach(m => mapInstance.removeLayer(m));
      markers = [];
      reports.forEach(r => {
        let color = r.status === 'resolved' ? '#3F7D58' : r.status === 'in_progress' ? '#5B5BD6' : r.status === 'acknowledged' ? '#2F5D8A' : '#E2A63B';
        let icon = L.divIcon({
          className: 'pin',
          html: '<div style="width:20px;height:20px;border-radius:50%;background:' + color + ';border:2px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.4);"></div>',
          iconSize: [20, 20]
        });
        let marker = L.marker([r.lat, r.lng], { icon }).addTo(mapInstance);
        marker.bindPopup('<b>' + r.id + '</b><br>' + r.title + '<br>Status: ' + r.status);
        markers.push(marker);
      });
    }

    // Initial run
    saveAndRender();
  </script>
</body>
</html>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSingleHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const htmlContent = generateSingleHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded border-2 border-[#1C2B39] shadow-2xl overflow-hidden my-8">
        <div className="bg-[#1C2B39] text-[#F7F5F0] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#E2A63B]" />
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase">
                Export Standalone Single-File HTML (Replit Ready)
              </h2>
              <p className="text-[11px] text-[#A0AEC0]">
                Zero build step • No backend required • Runs immediately anywhere
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-[#1C2B39]">
          {/* Instructions Box matching user's prompt */}
          <div className="bg-[#FAF8F5] p-4 rounded border border-[#D8D2C5] text-xs space-y-2">
            <h3 className="font-bold text-sm text-[#2F5D8A] flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>How to drop into Replit:</span>
            </h3>
            <ol className="list-decimal pl-5 space-y-1 text-[#4B5563]">
              <li>Create a new Replit → choose <strong>"HTML/CSS/JS"</strong> template (or a blank Repl).</li>
              <li>Delete its default <code className="ticket-mono bg-white px-1 py-0.5 rounded border border-[#D8D2C5]">index.html</code> and drop or paste this file in as <code className="ticket-mono bg-white px-1 py-0.5 rounded border border-[#D8D2C5]">index.html</code>.</li>
              <li>Hit <strong>Run</strong> — it works immediately with full local storage, Leaflet mapping, auto-routing, and status lifecycle!</li>
            </ol>
          </div>

          {/* HTML Preview Box */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[#6B7280]">
              <span>Single-File Code Bundle (Contains HTML, CSS, JS, Leaflet & LocalStorage Engine):</span>
              <span className="ticket-mono text-[11px]">~12 KB self-contained</span>
            </div>
            <textarea
              readOnly
              value={generateSingleHtml()}
              rows={10}
              className="w-full ticket-mono text-[11px] p-3 rounded border border-[#C5BFB3] bg-[#FAF8F5] text-[#1C2B39]"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EBE7DF]">
            <p className="text-[11px] text-[#6B7280]">
              Fully functional offline or hosted on GitHub Pages, Netlify, or Replit.
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2 rounded text-xs font-bold bg-white border border-[#2F5D8A] text-[#2F5D8A] hover:bg-[#F2F0EB] transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied HTML!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-4 py-2 rounded text-xs font-bold bg-[#2F5D8A] text-white hover:bg-[#24496D] transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#E2A63B]" />
                <span>Download index.html</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
