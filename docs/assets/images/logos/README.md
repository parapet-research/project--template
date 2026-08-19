# Institution logos

Optional row of logos under the affiliations. Add them in `_data/authors.yml`:

```yaml
logos:
  - { src: "logos/university.svg", alt: "Your University", url: "https://example.edu" }
  - { src: "logos/institute.png",  alt: "Partner Institute" }
```

Note the `logos/` prefix — paths are relative to `assets/images/`.

- SVG is best; otherwise a PNG with a transparent background, around 300 px tall.
- Logos render at 34 px tall and are inverted in dark mode, which works for the
  usual dark-on-transparent logo. If a logo comes out wrong in dark mode, supply
  a version that is already light-on-transparent and remove the invert rule in
  `assets/css/main.css` (search for `.hero__logos`).
- Delete the `logos:` entries to hide the row.
