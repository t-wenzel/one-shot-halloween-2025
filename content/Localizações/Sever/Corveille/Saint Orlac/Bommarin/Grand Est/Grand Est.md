---
title: Grand Est
gallery:
---

---
Some text about Grand Est.

---
<%*
/*
  Templater gallery generator (robust)
  - Set `folder` to the folder path as shown in Obsidian file explorer (relative to vault root).
  - Produces a <table> with images (cols per row controlled by `cols`).
  - Falls back safely if folder not found or no images present.
*/
const folder = "content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"; // <-- set this to the exact path in your vault
const cols = 3; // images per row

try {
  // get all files in the vault and filter by prefix
  const allFiles = app.vault.getFiles();
  // Normalize folder string (no leading or trailing slash)
  const normalizedFolder = String(folder).replace(/^\/+|\/+$/g, "");

  // gather image files whose path starts with the folder path (allow nested)
  const images = allFiles
    .filter(f => {
      const p = f.path.replace(/\\/g, "/");
      return p.startsWith(normalizedFolder + "/") && /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name);
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  if (!images || images.length === 0) {
    tR = `<!-- Templater: No images found in folder '${normalizedFolder}'. -->`;
  } else {
    let rows = [];
    for (let i = 0; i < images.length; i += cols) {
      const slice = images.slice(i, i + cols);
      let row = "  <tr>\n";
      for (const f of slice) {
        const p = f.path.replace(/\\/g, "/");
        row += `    <td style="padding:8px; text-align:center;"><img src="${p}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
      }
      row += "  </tr>";
      rows.push(row);
    }
    tR = "<table style=\"width:100%; border-collapse:collapse;\">\n" + rows.join("\n") + "\n</table>";
  }
} catch (err) {
  tR = `<!-- Templater: error generating gallery: ${String(err)} -->`;
}
%>

































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
