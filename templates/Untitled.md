<%_
/_
Templater gallery generator (robust)

- Set `folder` to the folder path as shown in Obsidian file explorer (relative to vault root).
- Produces a <table> with images (cols per row controlled by `cols`).
- Falls back safely if folder not found or no images present.
  \*/
  const folder = "../content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"; // <-- edit this if needed
  const cols = 3; // images per row

try {
// get all files in the vault and filter by prefix (safer than relying on folder.children in some environments)
const allFiles = app.vault.getFiles();
// Normalize folder string (no leading or trailing slash)
const normalizedFolder = String(folder).replace(/^\/+|\/+$/g, "");

// gather image files whose path starts with the folder path (allow nested)
const images = allFiles
.filter(f => {
// ensure path uses forward slashes
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
let row = " <tr>\n";
for (const f of slice) {
const p = f.path.replace(/\\/g, "/");
// you can adjust inline styles here if you want thumbnails / object-fit, etc.
row += `    <td style="padding:8px; text-align:center;"><img src="${p}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
}
row += " </tr>";
rows.push(row);
}
tR = "<table style=\"width:100%; border-collapse:collapse;\">\n" + rows.join("\n") + "\n</table>";
}
} catch (err) {
tR = `<!-- Templater: error generating gallery: ${String(err)} -->`;
}
%>
