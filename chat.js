/* M&O Roofing — FAQ Chatbot. Rule-based, no API, free forever. */
(function () {
  const CFG = {
    name: 'M&O Roofing',
    phone: '(951) 701-9764',
    tel: 'tel:+19517019764',
    license: '#1089842',
    hours: 'Mon–Sat, 7AM–7PM',
    cities: 'Riverside, Corona, Moreno Valley, Perris, Norco, Eastvale, Chino, Ontario, Fontana, San Bernardino, Redlands & Colton',
    quote: '#hero'
  };

  const R = {
    greeting: `Hi there! 👋 I'm the M&O Roofing assistant. Ask me anything or pick a topic below.`,
    services: `We offer:<br>✓ Roof Installation<br>✓ Roof Repair & Replacement<br>✓ Roof Inspections<br>✓ Flat Roof Coating<br>✓ Emergency Repairs<br><br>Call for a free estimate: <a href="${CFG.tel}">${CFG.phone}</a>`,
    pricing: `General pricing guide:<br><br>• Repair: $300–$800<br>• Full replacement: $8,000–$15,000+<br><br>Every roof is different. Get your FREE on-site estimate: <a href="${CFG.tel}">${CFG.phone}</a>`,
    estimate: `We offer <strong>FREE estimates</strong> — no obligation.<br><br>📞 Call: <a href="${CFG.tel}">${CFG.phone}</a><br>📋 Or <a href="${CFG.quote}">fill out our quote form</a> and we'll respond same day.`,
    area: `We serve:<br>${CFG.cities}.<br><br>Not sure if we cover your area? Call us: <a href="${CFG.tel}">${CFG.phone}</a>`,
    hours: `We're available <strong>${CFG.hours}</strong>.<br><br>For emergencies, call us anytime: <a href="${CFG.tel}">${CFG.phone}</a>`,
    license: `Yes — fully licensed & insured.<br><br>CA Contractor License <strong>${CFG.license}</strong><br>Full liability coverage on every single job.`,
    contact: `📞 Call or text: <a href="${CFG.tel}">${CFG.phone}</a><br>📋 Or <a href="${CFG.quote}">request a free estimate</a> on this page.<br><br>We respond same day.`,
    emergency: `🚨 <strong>Roofing emergency?</strong><br><br>Call us NOW — we respond fast:<br><a href="${CFG.tel}" style="font-size:1.15rem;font-weight:700;color:#c9a84c">${CFG.phone}</a><br><br>Available 7 days a week for urgent calls.`,
    fallback: `Good question! For the most accurate answer, reach us at <a href="${CFG.tel}">${CFG.phone}</a> or <a href="${CFG.quote}">request a free estimate</a> — we reply same day.`
  };

  const RULES = [
    { keys: ['service', 'offer', 'what do you', 'what can', 'type of', 'kind of', 'do you do', 'work'], r: 'services' },
    { keys: ['price', 'cost', 'how much', 'pricing', 'charge', 'expensive', 'cheap', 'afford', 'rate'], r: 'pricing' },
    { keys: ['estimate', 'quote', 'free', 'consultation', 'no obligation'], r: 'estimate' },
    { keys: ['area', 'serve', 'cover', 'city', 'cities', 'location', 'near me', 'riverside', 'corona', 'moreno', 'fontana', 'ontario', 'san bernardino', 'chino', 'norco', 'redlands', 'colton', 'eastvale', 'perris'], r: 'area' },
    { keys: ['hour', 'open', 'schedule', 'available', 'when', 'time', 'weekend', 'saturday', 'sunday'], r: 'hours' },
    { keys: ['licens', 'insur', 'certif', 'legit', 'trust', 'bonded', 'credential'], r: 'license' },
    { keys: ['contact', 'phone', 'call', 'number', 'text', 'email', 'reach', 'talk', 'speak'], r: 'contact' },
    { keys: ['emergency', 'urgent', 'leak', 'leaking', 'flood', 'damage', 'storm', 'asap', 'now', 'today'], r: 'emergency' }
  ];

  const QR = [
    { label: 'Services', key: 'services' },
    { label: 'Free Estimate', key: 'estimate' },
    { label: 'Pricing', key: 'pricing' },
    { label: 'Service Area', key: 'area' },
    { label: 'Hours', key: 'hours' }
  ];

  function match(text) {
    const t = text.toLowerCase();
    for (const rule of RULES) {
      if (rule.keys.some(k => t.includes(k))) return R[rule.r];
    }
    return R.fallback;
  }

  function addMsg(msgs, html, who) {
    const d = document.createElement('div');
    d.className = `moc-msg moc-msg--${who}`;
    d.innerHTML = html;
    msgs.appendChild(d);
    requestAnimationFrame(() => { msgs.scrollTop = msgs.scrollHeight; });
  }

  function renderQR(qrEl, msgs) {
    qrEl.innerHTML = '';
    QR.forEach(({ label, key }) => {
      const b = document.createElement('button');
      b.className = 'moc-qr';
      b.textContent = label;
      b.addEventListener('click', () => {
        qrEl.innerHTML = '';
        addMsg(msgs, label, 'user');
        setTimeout(() => { addMsg(msgs, R[key], 'bot'); renderQR(qrEl, msgs); }, 420);
      });
      qrEl.appendChild(b);
    });
  }

  function build() {
    const el = document.createElement('div');
    el.id = 'moc';
    el.innerHTML = `
      <button class="moc-fab" id="moc-fab" aria-label="Chat with M&amp;O Roofing" aria-expanded="false">
        <svg class="moc-fab__ico moc-fab__ico--chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg class="moc-fab__ico moc-fab__ico--x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span class="moc-badge" id="moc-badge">1</span>
      </button>
      <div class="moc-win" id="moc-win" role="dialog" aria-label="Chat with M&amp;O Roofing" aria-hidden="true">
        <div class="moc-hdr">
          <div class="moc-avatar">M&amp;O</div>
          <div class="moc-hdr__info">
            <div class="moc-hdr__name">M&amp;O Roofing Support</div>
            <div class="moc-hdr__status"><span class="moc-dot"></span>Replies instantly</div>
          </div>
          <button class="moc-hdr__close" id="moc-close" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="moc-msgs" id="moc-msgs"></div>
        <div class="moc-qrs" id="moc-qrs"></div>
        <div class="moc-foot">
          <input class="moc-input" id="moc-input" type="text" placeholder="Ask a question…" autocomplete="off" aria-label="Chat message">
          <button class="moc-send" id="moc-send" aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>`;
    document.body.appendChild(el);

    const fab = el.querySelector('#moc-fab');
    const win = el.querySelector('#moc-win');
    const badge = el.querySelector('#moc-badge');
    const msgs = el.querySelector('#moc-msgs');
    const qrs = el.querySelector('#moc-qrs');
    const input = el.querySelector('#moc-input');

    function open() {
      win.classList.add('moc-win--open');
      win.setAttribute('aria-hidden', 'false');
      fab.setAttribute('aria-expanded', 'true');
      fab.classList.add('moc-fab--open');
      badge.style.display = 'none';
      input.focus();
    }
    function close() {
      win.classList.remove('moc-win--open');
      win.setAttribute('aria-hidden', 'true');
      fab.setAttribute('aria-expanded', 'false');
      fab.classList.remove('moc-fab--open');
    }
    function send() {
      const t = input.value.trim();
      if (!t) return;
      input.value = '';
      qrs.innerHTML = '';
      addMsg(msgs, t, 'user');
      setTimeout(() => { addMsg(msgs, match(t), 'bot'); renderQR(qrs, msgs); }, 500);
    }

    fab.addEventListener('click', () => win.classList.contains('moc-win--open') ? close() : open());
    el.querySelector('#moc-close').addEventListener('click', close);
    el.querySelector('#moc-send').addEventListener('click', send);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

    setTimeout(() => { addMsg(msgs, R.greeting, 'bot'); renderQR(qrs, msgs); }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
