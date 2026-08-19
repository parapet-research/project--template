# Research project page template

> **New here? Read [GUIDE.md](GUIDE.md)**, which is a a step-by-step walkthrough from
> copying this folder to a published page, written for people who have never
> touched a website before. 
>
> This README is the shorter reference version

---

Everything you need to change lives in **three files**: `_config.yml`,
`_data/authors.yml`, and `index.md`.

---

## 1. Get the files in place

You can either create a new git repo using this as repo as the template OR copy this `docs` folder into your repository. Keep the name as it is (`docs`):

```bash
cp -R docs /path/to/your-repo/docs
cd /path/to/your-repo
```

`docs/` is the folder name GitHub Pages can serve directly, which is why the
template targets it. 

## 2. Fill in your content

**`_config.yml`** — the page's frame. Title, venue, tagline, the buttons under
the authors, the top-bar navigation, the teaser figure, and the BibTeX block.
Set `url` and `baseurl` correctly or your CSS and images will 404 once deployed:

| Where the site lives | `url` parameter in _config.yml | `baseurl` parameter in _config.yml |
|:---|:---|:---|
| `https://you.github.io/your-project-repo-name/` | `https://you.github.io` | `/your-project-repo-name` |

**`_data/authors.yml`** — the author list and affiliations. Each author's
`affil` is a list of keys defined under `affiliations`, so someone with two
institutions gets both. 

**`index.md`** — the body of the page, in markdown. The front matter at the top
holds the highlight cards and the headline stats.

## 3. Add your figures

Drop them in `assets/figures/` and reference them from `index.md`:

```liquid
{% include figure.html
   src="figures/method.png"
   alt="What the figure shows, for screen readers."
   caption="**Method overview.** Markdown and $math$ both work here."
   width="page"
   pad="true" %}
```

| Parameter | What it does |
|:---|:---|
| `src` | Path inside `assets/`. An `.mp4` or `.webm` is embedded as a looping muted video. |
| `alt` | Screen-reader description. Leave `""` only for decorative images. |
| `caption` | Optional. Markdown and KaTeX both work. |
| `width` | `page` (default) lines up with the tables and text · `text` narrower, for small diagrams · `wide` reclaims the heading column. |
| `pad` | `"true"` adds breathing room inside the frame — use for vector diagrams and anything with a transparent background. |
| `plain` | `"true"` removes the frame entirely — use for photos that already fill it. |
| `zoom` | `"false"` disables click-to-enlarge. |

Some practical notes on figures:

- **Resize photographs before committing them.** Anything wider than about
  2000 px is wasted on a web page and slows the first load. A 5 MB PNG
  screenshot is usually a 400 KB JPEG.

## 4. Publish it

Push, then in your repository: **Settings → Pages → Build and deployment**, set
*Source* to **Deploy from a branch**, and pick your branch with folder
**`/docs`**. Wait a minute and the site is at
`https://<user>.github.io/<repo>/`.

> If the page loads but has no styling, `baseurl` is wrong. It must be
> `/<repo-name>`, with the leading slash and no trailing slash.

## 5. Optional: preview locally

Not required — pushing to GitHub is a perfectly good preview loop — but useful
when you are iterating on layout:

```bash
bundle install
bundle exec jekyll serve --livereload
# http://127.0.0.1:4000/<your-baseurl>/
```

Edits to `index.md` reload automatically; edits to `_config.yml` need a restart.

---

## Components

Beyond figures, four things you can drop into `index.md`:

**Highlight cards** — define `highlights:` in the front matter, then
`{% include highlights.html %}`.

**Headline stats** — define `stats:` in the front matter, then
`{% include stats.html %}`.

**Tables** — write plain markdown tables. Right-align numeric columns with
`---:`, bold the best result, and add a caption on the following line ending in
`{: .caption}`. Tables scroll sideways on phones instead of breaking the layout.
For a table markdown can't express (spanning headers, multi-level columns),
write raw `<table>` HTML — it picks up the same styling. Add `class="t-ours"` to
a `<tr>` to tint your own method's row.

**Callouts** — a bordered aside:

```html
<div class="callout" markdown="1">
Text, with **markdown** enabled by that `markdown="1"` attribute.
</div>
```

## One gotcha with inline math

Display math in `$$ ... $$` blocks is passed through to KaTeX untouched — paste
LaTeX straight from your paper and it will render.

**Inline** `$ ... $` math is different. Markdown processes that text first, and
it strips a backslash that comes before punctuation. So `\{`, `\}` and `\!`
silently lose their backslash before KaTeX ever sees them, and
`$\mathcal{O} = \{ t : \dots \}$` renders without its braces.

Inside inline math, use the named commands instead:

| Instead of | Write |
|:---|:---|
| `\{` `\}` | `\lbrace` `\rbrace` |
| `\!` | drop it, or move the expression into a `$$` block |
| `\|` | `\vert` |

Letter commands like `\ell`, `\infty`, `\theta` and `\mathcal` are unaffected.
When in doubt, put the expression in a `$$` block.