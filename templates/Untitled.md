<%*
const folder = "Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"; // vault path WITHOUT leading content/
const cols = 3;

try {
  const allFiles = app.vault.getFiles();
  const normalizedFolder = String(folder).replace(/^\/+|\/+$/g, "");

  const images = allFiles
    .filter(f => {
      const p = f.path.replace(/\\/g, "/");
      return p.startsWith(normalizedFolder + "/") && /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name);
    })
    .sort((a,b)=> a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  if (!images || images.length === 0) {
    tR = `<!-- Templater: No images found in folder '${normalizedFolder}'. -->`;
  } else {
    let rows = [];
    for (let i = 0; i < images.length; i += cols) {
      const slice = images.slice(i, i + cols);
      let row = "  <tr>\n";
      for (const f of slice) {
        const vaultPath = f.path.replace(/\\/g, "/");               // e.g. "content/Localizações/..."
        const sitePath = "/" + vaultPath.replace(/^content\//, ""); // e.g. "/Localizações/..."
        const safePath = encodeURI(sitePath);                      // encode accents/spaces for URLs
        row += `    <td style="padding:8px; text-align:center;"><img src="${safePath}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
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
