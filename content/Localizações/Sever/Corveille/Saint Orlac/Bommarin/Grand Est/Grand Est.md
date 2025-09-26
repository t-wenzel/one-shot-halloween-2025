---
tags:
---
---
Grand Est é um bairro localizado a leste de [[Bommarin]], sendo um dos mais populosos e com menor renda per capita de [[Saint Orlac]].

```dataviewjs
const folder = "content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"  // adjust to your folder path inside vault
const files = dv.page("").file
  .vault
  .getFiles()
  .filter(f => f.path.startsWith(folder) && /\.(jpe?g|png|gif|webp)$/i.test(f.name))

// Show images in a grid
let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">`
for (let f of files) {
  html += `<div><img src="${f.path}" style="width: 100%; height: auto; object-fit: cover;" alt="${f.name}"></div>`
}
html += `</div>`

dv.paragraph(html)

