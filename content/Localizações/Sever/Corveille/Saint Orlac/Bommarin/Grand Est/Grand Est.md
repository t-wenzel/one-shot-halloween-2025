---
title: Grand Est
gallery:
---
---

Some text about Grand Est.


---

```dataviewjs
const folder = "content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"; // folder path inside vault
const cols = 3;

const files = app.vault.getFiles()
  .filter(f => f.path.startsWith(folder + "/") && /\.(png|jpe?g|gif|webp)$/i.test(f.path))
  .sort((a,b) => a.name.localeCompare(b.name));

let md = "";
// empty header
for (let i=0;i<cols;i++) md += "| ";
md += "|\n";
// separator
for (let i=0;i<cols;i++) md += "|---";
md += "|\n";

// rows
for (let i=0;i<files.length;i++) {
  if (i % cols === 0) md += "|";
  md += ` ![[${files[i].path}]] |`;
  if (i % cols === cols-1) md += "\n";
}
if (files.length % cols !== 0) md += "\n";

dv.paragraph(md);
```

---