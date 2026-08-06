// Virorah Situation Room — Shared Sidebar Enhancements
(function() {
  // Find the Account nav section and inject MERIDIAN Profile link after it
  var sections = document.querySelectorAll('.nav-section');
  var accountSection = null;
  sections.forEach(function(el) {
    if (el.innerText.trim() === 'Account') accountSection = el;
  });

  if (accountSection) {
    // Create MERIDIAN Profile link
    var meridianLink = document.createElement('a');
    meridianLink.href = 'onboarding.html';
    meridianLink.className = 'nav-item';
    meridianLink.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;transition:all .2s;border:1px solid transparent;text-decoration:none;color:rgba(255,255,255,0.45);font-size:13px;font-family:DM Sans,sans-serif;margin-bottom:2px';
    meridianLink.innerHTML = '<span style="font-size:16px;flex-shrink:0">🧭</span> MERIDIAN Profile';

    // Highlight if current page is onboarding
    if (window.location.pathname.includes('onboarding')) {
      meridianLink.style.background = 'rgba(0,229,195,0.10)';
      meridianLink.style.borderColor = 'rgba(0,229,195,0.25)';
      meridianLink.style.color = '#00E5C3';
      meridianLink.style.fontWeight = '500';
    }

    // Insert right after the Account section heading
    accountSection.parentNode.insertBefore(meridianLink, accountSection.nextSibling);
  }
})();
