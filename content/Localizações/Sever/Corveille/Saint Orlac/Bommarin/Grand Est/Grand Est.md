---
title: Grand Est
tags:
gallery:
  - "[[images/picture1.jpg]]"
  - "[[images/picture2.jpg]]"
---
---
Some text

```dataviewjs
const imgs = dv.current().gallery;
if (!imgs) {
  dv.paragraph("No images found in gallery field.");
} else {
  let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap:8px;">`;
  for (let img of imgs) {
    let linkObj = dv.fileLink(img);
    let path = app.vault.getResourcePath(linkObj.path);
    html += `<div><img src="${path}" style="width:100%; height:auto; object-fit:cover;" alt="${linkObj.path}"></div>`;
  }
  html += `</div>`;
  dv.paragraph(html);
}
