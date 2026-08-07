// Virorah Situation Room — Shared Sidebar Enhancements + PWA

(function() {

  // ── MERIDIAN PROFILE LINK INJECTION ──────────────────────
  var sections = document.querySelectorAll('.nav-section');
  var accountSection = null;
  sections.forEach(function(el) {
    if (el.innerText.trim() === 'Account') accountSection = el;
  });

  if (accountSection) {
    var meridianLink = document.createElement('a');
    meridianLink.href = 'onboarding.html';
    meridianLink.className = 'nav-item';
    meridianLink.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;transition:all .2s;border:1px solid transparent;text-decoration:none;color:rgba(255,255,255,0.45);font-size:13px;font-family:Plus Jakarta Sans,sans-serif;margin-bottom:2px';
    meridianLink.innerHTML = '<span style="font-size:16px;flex-shrink:0">🧭</span> MERIDIAN Profile';
    if (window.location.pathname.includes('onboarding')) {
      meridianLink.style.background = 'rgba(0,229,195,0.10)';
      meridianLink.style.borderColor = 'rgba(0,229,195,0.25)';
      meridianLink.style.color = '#00E5C3';
      meridianLink.style.fontWeight = '500';
    }
    accountSection.parentNode.insertBefore(meridianLink, accountSection.nextSibling);
  }

  // ── PWA META TAGS ─────────────────────────────────────────
  function addMeta(name, content) {
    if (!document.querySelector('meta[name="' + name + '"]')) {
      var m = document.createElement('meta');
      m.name = name; m.content = content;
      document.head.appendChild(m);
    }
  }

  function addLink(rel, href) {
    if (!document.querySelector('link[rel="' + rel + '"]')) {
      var l = document.createElement('link');
      l.rel = rel; l.href = href;
      document.head.appendChild(l);
    }
  }

  addLink('manifest', '/situation-room/manifest.json');
  addMeta('theme-color', '#060B18');
  addMeta('apple-mobile-web-app-capable', 'yes');
  addMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
  addMeta('apple-mobile-web-app-title', 'Situation Room');
  addLink('apple-touch-icon', '/situation-room/icon-192.png');
  addMeta('mobile-web-app-capable', 'yes');
  addMeta('application-name', 'Situation Room');

  // ── SERVICE WORKER REGISTRATION ───────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/situation-room/sw.js')
        .then(function(reg) { console.log('SW registered:', reg.scope); })
        .catch(function(err) { console.log('SW failed:', err); });
    });
  }

  // ── PWA INSTALL PROMPT ────────────────────────────────────
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    if (sessionStorage.getItem('pwa_dismissed')) return;
    setTimeout(showInstallBanner, 3000);
  });

  function showInstallBanner() {
    if (document.getElementById('pwa-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'pwa-banner';
    banner.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0D1526;border:1px solid rgba(0,229,195,0.3);border-radius:14px;padding:16px 20px;display:flex;align-items:center;gap:14px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.4);max-width:380px;width:calc(100% - 48px)';
    banner.innerHTML = '<div style="font-size:28px;flex-shrink:0">📱</div>' +
      '<div style="flex:1"><div style="font-family:Bricolage Grotesque,sans-serif;font-weight:700;font-size:14px;color:#fff;margin-bottom:3px">Install Situation Room</div>' +
      '<div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.4">Add to home screen for instant access — works offline too.</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">' +
      '<button onclick="installPWA()" style="padding:8px 14px;background:#00E5C3;color:#060B18;font-family:Bricolage Grotesque,sans-serif;font-weight:700;font-size:12px;border:none;border-radius:7px;cursor:pointer">Install</button>' +
      '<button onclick="dismissPWA()" style="padding:6px 14px;background:transparent;color:rgba(255,255,255,0.35);font-size:11px;border:none;cursor:pointer">Not now</button>' +
      '</div>';
    document.body.appendChild(banner);
  }

  window.installPWA = function() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(r) {
      deferredPrompt = null;
      var b = document.getElementById('pwa-banner');
      if (b) b.remove();
    });
  };

  window.dismissPWA = function() {
    sessionStorage.setItem('pwa_dismissed', '1');
    var b = document.getElementById('pwa-banner');
    if (b) b.remove();
  };

// ── VIRORAH ATTRIBUTION ───────────────────────────────────   var sidebar = document.querySelector('.sidebar');   if (sidebar) {     var attribution = document.createElement('div');     attribution.style.cssText = 'padding:14px 14px 8px;text-align:center;border-top:1px solid rgba(255,255,255,0.04);margin-top:12px';     attribution.innerHTML = '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.15)">A Virorah Product</div>';     sidebar.appendChild(attribution);   }  })();
