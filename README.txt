LOGOS GRAPHOS — SUPER ALGORITHM IS-HF/IS-HS V3.0

Standalone visual page. Tidak memuat artikel atau dashboard riset.

FILES
- index.html
- style.css
- engine/logos-graphos.css
- engine/logos-graphos.js
- assets/logos-graphos-emblem.svg

TEMPORAL DESIGN
- Unix/UTC time menjadi sumber fase absolut.
- requestAnimationFrame hanya merender state yang dihitung dari waktu absolut.
- Saat tab/browser tidak aktif, tidak ada klaim bahwa JavaScript terus berjalan.
- Saat aktif kembali, visual langsung direkonstruksi ke fase waktu saat itu.
- Zona waktu lokal hanya presentation layer.

DEPLOY
Upload seluruh isi folder ini ke root repository atau subfolder GitHub Pages.
