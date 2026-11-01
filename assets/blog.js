// Existing projects stay independent. Same-origin embeds can expand to fit the
// full analysis and use a compact header only while displayed inside a post.
for (const frame of document.querySelectorAll('.interactive-frame')) {
  let observer;
  const fit = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      if (['stock-returns', 'revenue-per-employee'].includes(frame.dataset.project) && !doc.getElementById('blog-embed-style')) {
        const style = doc.createElement('style');
        style.id = 'blog-embed-style';
        style.textContent = frame.dataset.project === 'stock-returns'
          ? 'html,body{min-height:0!important}main{padding:22px 24px 30px!important;max-width:none!important}main>.topbar,main>header{display:none!important}@media(max-width:700px){main{padding:18px 12px 24px!important}}'
          : 'html,body{min-height:0!important}.masthead,.intro{display:none!important}.page{padding:20px 24px!important}@media(max-width:700px){.page{padding:16px 12px!important}}';
        doc.head.append(style);
      }
      const height = Math.ceil(doc.body.getBoundingClientRect().height) + 2;
      if (height > 100 && Math.abs(height - frame.height) > 2) frame.height = String(height);
      if (!observer) {
        observer = new ResizeObserver(() => requestAnimationFrame(fit));
        observer.observe(doc.body);
      }
    } catch {
      // Cross-origin projects retain a scrollable frame and full-screen link.
    }
  };
  frame.addEventListener('load', fit);
  if (frame.contentDocument?.readyState === 'complete') fit();
}

const copyButton = document.querySelector('[data-copy-link]');
if (copyButton) {
  copyButton.hidden = !navigator.clipboard?.writeText;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(document.querySelector('link[rel="canonical"]').href);
      status.textContent = 'Post link copied.';
    } catch {
      status.textContent = 'Could not copy the link. You can copy it from your address bar.';
    }
  });
}
