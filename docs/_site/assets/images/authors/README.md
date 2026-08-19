# Author photos

Drop headshots here and point at them from `_data/authors.yml`:

```yaml
- name: "Jane Doe"
  photo: "jane-doe.jpg"
```

- **Square images.** They are cropped to a circle and displayed at 44 px, so
  anything above ~200×200 is plenty. Keep each file under ~100 KB.
- **Optional.** Leave `photo: ""` and the page draws a circle with the author's
  initials, which looks deliberate rather than broken.
- Set `show_photos: false` in `_data/authors.yml` to drop photos entirely and
  use the compact text-only author line instead.

Resize a batch on macOS or Linux with ImageMagick:

```bash
mogrify -resize 400x400^ -gravity center -extent 400x400 -quality 85 *.jpg
```
