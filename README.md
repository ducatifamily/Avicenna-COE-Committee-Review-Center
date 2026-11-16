# Avicenna COE Accreditation Committee Review Center

Static GitHub/Render site generated from the AAHI accreditation evidence folder supplied for committee review.

## Purpose
This site is an evidence-navigation layer. It does **not** duplicate the source documents and does not certify compliance with COE requirements. Source files remain in Google Drive and are the controlling records.

## Inventory snapshot
- Inventory date: November 16, 2026
- Source folder: https://drive.google.com/drive/folders/1wDTleQ8Xjl-dsqNaOFEFrA9wowxsJoUG
- Approximately 572 visible items indexed across the supplied evidence collection.
- 13 program-guide records / specialty collections represented.
- 12 instructor guides.
- 12 student guides.
- 11 certification pathway matrices.
- 49 visible competency-related items.
- 129 lesson-plan files.
- 44 visible syllabus-related items.
- 244 Articulate / instructional-resource items.
- 53 live-skills items.
- 3 fully-online Palliative Care guide variants.
- 2 institutional / cross-program reference files.

Counts are a working inventory snapshot and may include duplicates, system files, image-based artifacts, or working files. They are not a claim of unique exhibits or COE compliance.

## Files
- `index.html`
- `styles.css`
- `app.js`
- `source-index.json`
- `inventory.csv`
- `render.yaml`
- `README.md`

## Deploy on Render
1. Create or update a GitHub repository.
2. Upload the files in this package to the repository root.
3. Connect the repository to Render as a Static Site.
4. `render.yaml` is included for Blueprint deployment.
5. Source document permissions remain controlled by Google Drive. Committee reviewers must have permission to open linked evidence.

## Maintenance
Update `source-index.json` when evidence is added, moved, or replaced. The site reads its committee-facing program/evidence structure from that file through `app.js`.
