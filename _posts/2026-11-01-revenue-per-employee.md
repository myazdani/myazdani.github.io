---
{
  "title": "Revenue per employee",
  "subtitle": "Company scale, headcount, and revenue over time",
  "description": "Explore revenue and workforce size across 57 technology, streaming, and media companies, with an interactive timeline and company-level sources.",
  "date": "2026-11-01",
  "slug": "revenue-per-employee",
  "tags": ["Business", "Interactive"],
  "project": "/revenue-per-employee/",
  "preview": "/assets/revenue-per-employee-preview.svg",
  "preview_alt": "A bubble chart of the project's 2026 company comparisons: workforce size on a logarithmic horizontal axis, revenue per employee vertically, and bubble area proportional to revenue."
}
---

How does a company's revenue change relative to the size of its workforce? This interactive analysis brings both quantities into one view, then lets you follow them through time.

The project covers **57 technology, streaming, and media companies** across a **2019–2026** view. It builds on [Derrick Ongchin’s original research](https://www.derrickongchin.com/analysis/ai-efficiency-era), with additional streaming and media comparisons and links to the underlying sources.

## Explore the companies

Each bubble represents a company. Move through the timeline, filter a group, or select a company to inspect its revenue, workforce size, historical path, and source notes. The [standalone analysis](/revenue-per-employee/) provides more room for the chart.

<div class="interactive-embed" id="interactive-analysis">
  <div class="embed-toolbar"><span><span class="status-dot" aria-hidden="true"></span>Interactive analysis</span><a href="/revenue-per-employee/" target="_blank" rel="noopener">Open full screen <span aria-hidden="true">↗</span></a></div>
  <iframe class="interactive-frame" src="/revenue-per-employee/" title="Revenue per employee: interactive company bubble chart, timeline, rankings, and source notes" loading="lazy" data-project="revenue-per-employee" height="3400"></iframe>
  <noscript><p class="embed-fallback">The chart uses JavaScript. <a href="/revenue-per-employee/">Open the standalone analysis</a> to read its methodology and source links.</p></noscript>
</div>

## How to read the chart

- **Horizontal position** shows workforce size on a logarithmic scale. Equal horizontal distances represent equal multiples of headcount.
- **Vertical position** shows revenue per employee: revenue divided by the stated workforce count.
- **Bubble area** represents revenue. A larger company can have a lower ratio than a much smaller company.
- **The timeline and trails** show changes across the available years. Playback between annual rows is a visual interpolation, rather than an additional observation.

Selecting a company brings its individual history and measurement notes into focus. The ranking is another way to explore the same comparisons, with status labels distinguishing reported figures, estimates, and projections.

## What the ratio leaves out

Revenue per employee is a narrow measure. It does not capture profitability, capital requirements, compute costs, contractor labor, outsourcing, or product quality. It can rise because revenue grows, because the workforce shrinks, or because both change together.

The figures also mix business models and reporting conventions. Retail sales, software subscriptions, advertising, and marketplace revenue do not represent interchangeable kinds of activity. Changes in the ratio alone cannot establish that AI caused an efficiency gain.

## Comparing streaming and media

The streaming and media view includes consolidated companies as well as service-level comparisons. Disney's figures describe the whole company; they are not a standalone Disney+ measure. Tubi is also included within its parent Fox, so those rows should not be added together.

Some comparisons use different observation dates, carried-forward figures, or pro forma estimates. Workforce definitions also vary, including employees, full-time equivalents, and approximate team sizes. The company details and methodology explain these distinctions.

The 2026 view includes reported fiscal years, estimates, and projections. Check each company's period and source status before treating two bubbles as a direct comparison.

## Sources and reproducibility

The [original analysis](https://www.derrickongchin.com/analysis/ai-efficiency-era), source CSVs, supplementary streaming and media data, and company-specific source links are available in the interactive project. The implementation is also available in the [GitHub repository](https://github.com/myazdani/revenue-per-employee).
