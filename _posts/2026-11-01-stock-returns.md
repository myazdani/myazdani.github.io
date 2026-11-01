---
{
  "title": "Time in the market",
  "subtitle": "Historical stock returns, adjusted for inflation",
  "description": "Explore how US stock returns vary with the holding period, using 98 years of annual returns, reinvested dividends, and an inflation adjustment.",
  "date": "2026-11-01",
  "slug": "stock-returns",
  "tags": ["Markets", "Interactive"],
  "project": "/stock-returns/",
  "preview": "/assets/stock-returns-preview.svg",
  "preview_alt": "Ten-, twenty-, and thirty-year annualized real stock returns, plotted by ending year using the existing 1928–2025 dataset."
}
---

A single year of market returns can look very different from a decade. This analysis lets you explore that difference: choose a holding period, inspect the historical windows, and compare returns in dollars with returns in purchasing power.

The underlying project covers **1928–2025**, includes reinvested dividends, and defaults to inflation-adjusted returns. The interactive version below is the same analysis available on the [standalone project page](/stock-returns/).

## Explore the analysis

Start with the **return basis** selector. “Inflation-adjusted” shows changes in purchasing power; “nominal” shows dollar returns before the inflation adjustment. Each chart groups three holding periods. Toggle the lines and use the year sliders to inspect individual windows.

<div class="interactive-embed" id="interactive-analysis">
  <div class="embed-toolbar"><span><span class="status-dot" aria-hidden="true"></span>Interactive analysis</span><a href="/stock-returns/" target="_blank" rel="noopener">Open full screen <span aria-hidden="true">↗</span></a></div>
  <iframe class="interactive-frame" src="/stock-returns/" title="Historical stock returns: interactive charts, return-basis selector, historical ranges, and methodology" loading="lazy" data-project="stock-returns" height="2700"></iframe>
  <noscript><p class="embed-fallback">The charts use JavaScript. <a href="/stock-returns/">Open the standalone analysis</a> for its static summary and methodology.</p></noscript>
</div>

## What each point means

A point labeled **2009** on the **10-year** line represents January 2000 through December 2009. It compounds the annual returns across that interval and expresses the result as an equivalent annual growth rate.

The next point moves the window forward one year. That means adjacent points overlap: they are different investment windows, but they share much of the same history.

The inflation adjustment uses December CPI values immediately before and at the end of each window. It divides out the cumulative price change rather than subtracting a single inflation rate from the annualized return.

## Questions to explore

- **How much does the historical range change as the holding period grows?** Compare the short, medium, and long holding-period panels.
- **How different are nominal and real returns?** Switch the return basis while inspecting the same period.
- **How much does the ending year matter?** Move a year slider rather than looking only at the latest observation.

The worst/best table summarizes the observed extremes for every holding period. The CSV download buttons let you inspect the annual data and summary calculations separately.

## Data and boundaries

The return series comes from [Aswath Damodaran’s historical returns dataset at NYU Stern](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html), using the S&P 500 series including dividends. Earlier years use historical predecessor data. Inflation comes from the [BLS historical CPI-U table for December 2025](https://www.bls.gov/cpi/tables/supplemental-files/historical-cpi-u-202512.xlsx).

This is a fixed snapshot of complete calendar years through 2025. It assumes reinvested dividends and no contributions or withdrawals during a window. Taxes, fees, and trading costs are excluded; monthly starting dates could give different extremes. The embedded analysis contains the full methodology and retrieval dates.

These are historical windows, with substantial overlap between them. They describe this dataset; they do not establish probabilities for future outcomes or guarantee a return.
