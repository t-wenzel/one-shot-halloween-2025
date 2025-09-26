---
title: Grand Est
gallery:
---

---
Some text about Grand Est.

---
<%\*
// Templater gallery generator
// Edit the `folder` variable below to the folder path inside your vault (as shown in Obsidian file explorer).
const folder = "../content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens";

// get folder children
const folderNode = app.vault.getAbstractFileByPath(folder);
const files = (folderNode && folderNode.children) ? folderNode.children : [];

// filter image files
const imgs = files.filter(f => /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name));

// you can change columns
const cols = 3;

if (imgs.length === 0) {
tR = "<!-- No images found in folder: " + folder + " -->";
} else {
let rows = [];
for (let i = 0; i < imgs.length; i += cols) {
let slice = imgs.slice(i, i + cols);
let row = " <tr>\n";
for (const f of slice) {
const p = f.path.replace(/\\/g, "/");
row += `    <td><img src="${p}" alt="${f.name}" style="max-width:100%;height:auto;border-radius:8px;"></td>\n`;
}
row += " </tr>";
rows.push(row);
}
tR = "<table>\n" + rows.join("\n") + "\n</table>";
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
