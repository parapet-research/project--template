---
# -----------------------------------------------------------------------------
#  This front matter holds the structured bits of the page.
#  The prose itself is the markdown below it.
#
#  Co Authored by Claude and Ridma Jayasundara
# -----------------------------------------------------------------------------

# Cards rendered by {% include highlights.html %}
highlights:
  - title: "First card"
    text: "One or two sentences on what is new. Three or four cards works best."
  - title: "Second card"
    text: "Say the thing a reviewer would want to know, not the thing that sounds impressive."
  - title: "Third card"
    text: "Numbers land harder than adjectives. *Markdown* works in here."
  - title: "Fourth card"
    text: "Delete any you do not need — the grid reflows on its own."

# Headline numbers rendered by {% include stats.html %}
stats:
  - value: "0.00"
    label: "Metric on Dataset"
    note: "down from 00.0 clean"
  - value: "4×"
    label: "better than prior best"
  - value: "8"
    label: "models evaluated"
---

## Abstract {#overview}

Paste your abstract here, as one or two paragraphs. Keep it to the version you
submitted — the page is not the place to rewrite the paper, and readers arriving
from a search result want to confirm quickly that they are in the right place.

{% include stats.html %}

## What's new {#highlights}

{% include highlights.html %}

## Method {#method}

Explain the approach in the order a reader needs it, not the order you
discovered it. One figure near the top of this section carries more weight than
three paragraphs before it.

{% include figure.html
   src="figures/method.png"
   alt="Describe the diagram: what goes in, what comes out, what the arrows mean."
   caption="**Method overview.** State the takeaway in the first clause, then explain the parts."
   width="page"
   pad="true" %}

Inline math is written `$\ell_\infty$` and renders as $\ell_\infty$. Display
math goes on its own lines:

$$
\delta^{\star} = \operatorname*{arg\,min}_{\|\delta\|_\infty \le \epsilon} \; \mathcal{L}(x + \delta)
$$

Set `math: false` in `_config.yml` if your page has no equations.

### A subsection

Use `###` for subsections. They pick up an anchor automatically, and you can
give one an explicit id like this: `### Deformable attention {#deformable}`.

## Results {#results}

Markdown tables are styled for you. Right-align numeric columns with `---:` so
the digits line up, and bold the winning entry.

| Method | Venue | Metric ↓ | Other ↑ |
|:-------|:------|---------:|--------:|
| Baseline A | CVPR 2024 | 27.2 | 47.2 |
| Baseline B | ICCV 2025 | 12.7 | 42.3 |
| Strongest prior | NeurIPS 2025 | 4.1 | 7.3 |
| **Ours** | — | **0.97** | **1.44** |

Add a caption on the line right after the table by ending it with `{: .caption}`:

**Table 1.** Comparison against prior work. Lower is better for the third column.
{: .caption}

{% include figure.html
   src="figures/results.png"
   alt="Describe what the reader should see in this figure."
   caption="**Qualitative results.** Point at what to look at — readers will not find it on their own."
   width="wide" %}

## Ablations {#ablations}

Short sections with one table or figure each read far better than a single long
one. Anything you would put in a supplementary can live here too.

{% include figure.html
   src="figures/ablation.png"
   alt="Plot of the metric against the two hyperparameters."
   caption="**Sweeps.** One sentence on the trend, one on why it matters."
   width="text" %}

<div class="callout" markdown="1">
A callout for a caveat, a note about a released checkpoint, or anything you want
set apart from the running text. The `markdown="1"` attribute is what lets you
write markdown inside an HTML block.
</div>
