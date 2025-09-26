---
title: Grand Est
gallery:
---

---
Some text about Grand Est.

---
```dataviewjs
const folder = "content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"; // relative to your vault root
const files = app.vault.getAbstractFileByPath(folder)?.children ?? [];

let cols = 3;
let html = "<table><tr>";

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  if (!f.path.match(/\.(jpg|jpeg|png|gif)$/i)) continue;

  html += `<td><img src="${f.path}" alt="${f.name}" style="max-width:100%;height:auto;"></td>`;

  if ((i + 1) % cols === 0) html += "</tr><tr>";
}

html += "</tr></table>";
dv.el("div", html);
```
---
