# Mehrdad Yazdani — Notes & explorations

A static blog with Markdown posts, shared layouts, RSS, and embedded interactive
projects. Published at https://myazdani.github.io/ using the existing `master`
branch. The standalone `/stock-returns/` project keeps its original URL and code.

## Add a post

1. Copy `_posts/2026-11-01-stock-returns.md` to a new dated filename.
2. Edit the JSON metadata between the `---` lines, then write the body in Markdown.
   Use a unique `slug`; the post appears at `/posts/<slug>/`. `preview`,
   `preview_alt`, `subtitle`, and `project` are optional. `tags` is an array.
3. Run `npm ci` (Node 20 or later), then `npm run build`.
4. Commit the Markdown and generated pages and push to `master`.

The build updates the homepage, post pages, RSS feed, and sitemap. GitHub Pages
serves the checked-in HTML directly; `.nojekyll` disables an additional Jekyll
build. No backend or paid service is required. `dist/` is a complete ignored
copy for local preview; generated pages at the repository root are published.

To include an existing project, link to it or copy the `interactive-embed`
block from the first post. Same-origin project frames resize to fit their
contents; the existing stock-returns header is compacted only inside the frame.
The “Open full screen” link always opens the standalone page.

## Edit the design

- Shared HTML: `_templates/base.html`
- Site styling: `assets/blog.css`
- Embed resizing and copy-link button: `assets/blog.js`
- Blog homepage, About page, and output generation: `scripts/build.mjs`
- Writing: `_posts/*.md`

The first post’s chart preview is generated from the original project’s actual
return and CPI data. It is a preview, not a separate financial dataset.
