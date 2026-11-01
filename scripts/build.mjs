import { readFile, writeFile, mkdir, readdir, cp } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://myazdani.github.io';
const name = 'Mehrdad Yazdani';
const description = 'Interactive notes on markets, machine learning, and data.';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const template = await readFile(resolve(root, '_templates/base.html'), 'utf8');
const formatDate = date => new Intl.DateTimeFormat('en-US', { month:'long', day:'numeric', year:'numeric', timeZone:'UTC' }).format(new Date(date + 'T12:00:00Z'));
const posts = [];
for (const file of (await readdir(resolve(root, '_posts'))).sort()) {
  if (!file.endsWith('.md')) continue;
  const raw = await readFile(resolve(root, '_posts', file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: use JSON front matter between --- lines.`);
  const meta = JSON.parse(match[1]);
  for (const key of ['title', 'description', 'date', 'slug', 'tags']) if (!meta[key]) throw new Error(`${file}: missing ${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)) throw new Error(`${file}: invalid slug`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date))) throw new Error(`${file}: invalid date`);
  if (posts.some(p => p.slug === meta.slug)) throw new Error(`Duplicate slug: ${meta.slug}`);
  const words = match[2].replace(/<[^>]*>/g, '').split(/\s+/).length;
  const post = { ...meta, markdown:match[2], html:marked.parse(match[2], { gfm:true }), url:`/posts/${meta.slug}/`, minutes:Math.max(2, Math.ceil(words / 210)) };
  posts.push(post);
}
posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
const render = (body, { title='Notes & explorations — Mehrdad Yazdani', desc=description, path='/', type='website', extra='', active='notes' }={}) => {
  const values = { page_title:escape(title), description:escape(desc), canonical:escape(base + path), og_type:type, extra_head:extra, body, active_notes:active==='notes'?'aria-current="page"':'', active_about:active==='about'?'aria-current="page"':'' };
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => { if (!(key in values)) throw new Error(`Unknown template key: ${key}`); return values[key]; }).replace(/[ \t]+$/gm, '');
};
const outputs = new Map();
const output = (path, content) => outputs.set(path, content);
const tags = post => post.tags.map(tag => `<span class="tag">${escape(tag)}</span>`).join(' ');
const cards = posts.map(post => `<article class="post-card${post.preview?'':' post-card-text'}">
  <div class="post-card-copy">
    <div class="post-meta"><time datetime="${post.date}">${formatDate(post.date)}</time><span class="meta-divider" aria-hidden="true"></span><span>${post.minutes} min read</span></div>
    <h3><a href="${post.url}">${escape(post.title)}</a></h3>
    ${post.subtitle?`<p class="card-subtitle">${escape(post.subtitle)}</p>`:''}
    <p class="card-description">${escape(post.description)}</p>
    <a class="read-link" href="${post.url}">Read the post <span aria-hidden="true">→</span><span class="visually-hidden">: ${escape(post.title)}</span></a>
  </div>
  ${post.preview?`<a class="post-card-visual" href="${post.url}" aria-label="Read ${escape(post.title)}"><img src="${escape(post.preview)}" alt="${escape(post.preview_alt || post.title)}" width="600" height="350" fetchpriority="high"></a>`:''}
</article>`).join('\n');
output('index.html', render(`<section class="home-intro" aria-labelledby="home-title"><div class="eyebrow">A personal notebook</div><h1 id="home-title">Notes &amp; explorations.</h1><p>Working through questions about markets, machine learning, and data. With charts you can explore for yourself.</p></section>
<section aria-labelledby="latest-title"><div class="section-label"><h2 id="latest-title">Latest writing</h2><span>${posts.length} ${posts.length===1?'post':'posts'}</span></div><div class="post-list">${cards}</div></section>
<div class="home-note"><p>Part essay, part experiment. Each post brings the explanation and the interactive work together.</p><a href="/about/">About this notebook <span aria-hidden="true">↗</span></a></div>`));

for (const post of posts) {
  const schema = { '@context':'https://schema.org', '@type':'BlogPosting', headline:post.title, description:post.description, datePublished:post.date, author:{ '@type':'Person', name, url:base + '/about/' }, mainEntityOfPage:base + post.url };
  const extra = `<meta property="article:published_time" content="${post.date}T12:00:00-08:00"><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
  output(`posts/${post.slug}/index.html`, render(`<a class="back-link" href="/"><span aria-hidden="true">←</span> All notes</a>
<article><header class="article-header"><div class="eyebrow">${escape(post.tags.filter(t=>t!=='Interactive').join(' / '))}${post.tags.includes('Interactive')?' · An interactive essay':''}</div><h1>${escape(post.title)}</h1>${post.subtitle?`<p class="article-subtitle">${escape(post.subtitle)}</p>`:''}<div class="article-meta"><span>By ${name}</span><span class="meta-divider" aria-hidden="true"></span><time datetime="${post.date}">${formatDate(post.date)}</time><span class="meta-divider" aria-hidden="true"></span><span>${post.minutes} min read${post.project?' + interactive':''}</span></div><div class="post-meta">${tags(post)}</div></header>
<div class="article-body">${post.html}<div class="article-end"><a href="/">← Back to all notes</a><button class="copy-link" type="button" data-copy-link>Copy link</button></div><span class="copy-status" role="status" aria-live="polite"></span></div></article>`, { title:`${post.title} — ${name}`, desc:post.description, path:post.url, type:'article', extra }));
}

output('about/index.html', render(`<article class="about"><div class="eyebrow">About this notebook</div><h1>A place to work<br>through a question.</h1><p>I’m Mehrdad Yazdani. This is a collection of notes and interactive explorations about markets, machine learning, and data.</p><p>The goal is to keep the explanation close to the work. A post can include a chart you can inspect, a small experiment, or a link to the underlying code. Sources and assumptions belong alongside the result.</p><p>Existing projects also have standalone pages, so you can open an analysis on its own when you want more room.</p><p><a href="/">Browse the notes →</a><br><a href="https://github.com/myazdani">Find me on GitHub ↗</a><br><a href="/feed.xml">Follow new posts with RSS ↗</a></p></article>`, { title:`About — ${name}`, path:'/about/', active:'about' }));
output('404.html', render(`<section class="empty-page"><div class="eyebrow">404 / Page not found</div><h1>This page wandered off.</h1><p>You can find the latest notes and interactive projects on the homepage.</p><a href="/">Back to all notes →</a></section>`, { title:`Page not found — ${name}`, path:'/404.html', active:'' }));

const feedItems = posts.map(post => `<item><title>${escape(post.title)}</title><link>${base}${post.url}</link><guid isPermaLink="true">${base}${post.url}</guid><pubDate>${new Date(post.date+'T20:00:00Z').toUTCString()}</pubDate><description>${escape(post.description)}</description>${post.tags.map(tag=>`<category>${escape(tag)}</category>`).join('')}</item>`).join('\n');
output('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${name} — Notes</title><link>${base}/</link><description>${escape(description)}</description><language>en-us</language><atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>${feedItems}</channel></rss>\n`);
const sitemapPaths = [...new Set(['/','/about/',...posts.map(post=>post.project).filter(path=>path?.startsWith('/')),...posts.map(post=>post.url)])];
output('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapPaths.map(path=>`<url><loc>${base}${path}</loc></url>`).join('')}</urlset>\n`);
output('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);

// Create a real, data-derived preview from the existing project. It uses the
// same annual return and CPI series; no sample or invented chart data.
const project = await readFile(resolve(root, 'stock-returns/index.html'), 'utf8');
const annual = JSON.parse(project.match(/const annual=(\[.*?\]);/s)[1]);
const cpi = JSON.parse(project.match(/const cpiDecember=(\{.*?\});/s)[1]);
const chartSeries = [10,20,30].map(n=>({n,values:annual.slice(n-1).map((_,j)=>({ year:annual[j+n-1][0], value:Math.expm1((annual.slice(j,j+n).reduce((sum,v)=>sum+Math.log1p(v[1]),0)+Math.log(cpi[annual[j][0]-1]/cpi[annual[j+n-1][0]]))/n) }))}));
const x = year => 43+(year-1937)/88*535;
const y = value => 262-(value+.08)/.26*190;
const colors = ['#a7b9ce','#dfcfb1','#a9c9b6'];
let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" role="img" aria-labelledby="title desc"><title id="title">Time in the market</title><desc id="desc">Ten-, twenty-, and thirty-year real annualized US stock returns, plotted by ending year using the project’s 1928–2025 data.</desc><style>text{font-family:system-ui,sans-serif;fill:#b3b2ad;font-size:13px}.title{fill:#f0ede6;font-size:16px;font-weight:500}.label{font-size:12px}</style><text x="4" y="25" class="title">A longer view of market returns</text><text x="4" y="49" class="label">Annualized real returns · dividends reinvested</text>';
for (const v of [-.05,0,.05,.1,.15]) svg += `<line x1="43" x2="578" y1="${y(v)}" y2="${y(v)}" stroke="${v===0?'#72766f':'#3b3d3e'}" ${v===0?'stroke-dasharray="3 5"':''}/><text x="33" y="${y(v)+4}" text-anchor="end" class="label">${Math.round(v*100)}%</text>`;
chartSeries.forEach((s,i)=>{svg+=`<path d="${s.values.map((v,j)=>`${j?'L':'M'}${x(v.year).toFixed(2)},${y(v.value).toFixed(2)}`).join(' ')}" fill="none" stroke="${colors[i]}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;});
for (const year of [1940,1960,1980,2000,2025]) svg += `<text x="${x(year)}" y="287" text-anchor="${year===2025?'end':'middle'}" class="label">${year}</text>`;
chartSeries.forEach((s,i)=>{const lx=78+i*160;svg+=`<line x1="${lx}" x2="${lx+20}" y1="325" y2="325" stroke="${colors[i]}" stroke-width="2"/><text x="${lx+29}" y="329" class="label">${s.n} years</text>`;});
svg += '</svg>\n';
output('assets/stock-returns-preview.svg', svg);

// Commit generated pages so native GitHub Pages can publish immediately.
// dist/ is an ignored, complete copy used only for local preview.
for (const [path, content] of outputs) {
  for (const target of [resolve(root,path),resolve(root,'dist',path)]) {
    await mkdir(dirname(target),{recursive:true});
    await writeFile(target,content);
  }
}
await cp(resolve(root,'assets'),resolve(root,'dist/assets'),{recursive:true});
await cp(resolve(root,'stock-returns'),resolve(root,'dist/stock-returns'),{recursive:true});
console.log(`Built ${posts.length} post${posts.length===1?'':'s'} and ${outputs.size} static files.`);
