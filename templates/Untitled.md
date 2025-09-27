<%*
/*
  Templater: gallery generator that outputs local src (for Obsidian preview)
  and data-site (for published site). The inline script swaps to data-site
  when running in a normal browser (not file://). This avoids needing to change Quartz.
*/
const folder = "content/Localizações/Sever/Corveille/Saint Orlac/Bommarin/Grand Est/Grand Est Imagens"; // set exactly as in File Explorer
const cols = 3;

// helper encode for URLs
function encodePath(p){ return encodeURI(p).replace(/#/g,"%23"); }

// compute shortest relative path from noteDir to vaultPath
function relativePath(fromDir, toPath){
  const a = fromDir.replace(/\\/g,"/").replace(/\/+$/,"").split("/");
  const b = toPath.replace(/\\/g,"/").split("/");
  let i=0;
  while(i<a.length && i<b.length && a[i]===b[i]) i++;
  const up = a.length - i;
  const parts = [];
  for(let j=0;j<up;j++) parts.push("..");
  for(let j=i;j<b.length;j++) parts.push(b[j]);
  return parts.join("/") || "./";
}

try {
  const allFiles = app.vault.getFiles();
  const normalizedFolder = String(folder).replace(/^\/+|\/+$/g, "");
  const active = app.workspace.getActiveFile();
  const noteDir = active ? active.path.replace(/\\/g,"/").replace(/\/[^\/]*$/,"") : "";

  const images = allFiles
    .filter(f=> {
      const p = f.path.replace(/\\/g,"/");
      return p.startsWith(normalizedFolder + "/") && /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name);
    })
    .sort((a,b)=> a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  if (!images || images.length === 0) {
    tR = `<!-- Templater: No images found in folder '${normalizedFolder}'. -->`;
  } else {
    let rows = [];
    for (let i=0;i<images.length;i+=cols){
      const slice = images.slice(i, i+cols);
      let row = "  <tr>\n";
      for (const f of slice){
        const vaultPath = f.path.replace(/\\/g,"/");                       // e.g. "content/Localizações/..."
        const sitePath = "/" + vaultPath.replace(/^content\//, "");       // e.g. "/Localizações/..." <- published site path
        const localRel = noteDir ? relativePath(noteDir, vaultPath) : vaultPath; // shortest relative for Obsidian
        const safeSite = encodePath(sitePath);
        const safeLocal = encodePath(localRel);
        row += `    <td style="padding:8px; text-align:center;"><img class="templater-gallery-img" src="${safeLocal}" data-site="${safeSite}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
      }
      row += "  </tr>";
      rows.push(row);
    }

    const tableHtml = "<table style=\"width:100%; border-collapse:collapse;\">\n" + rows.join("\n") + "\n</table>";

    // script: swap to data-site ONLY if not running under file:// (i.e. on the published site)
    const script = `<script>
(function(){
  try {
    if (location.protocol !== 'file:') {
      document.querySelectorAll('.templater-gallery-img').forEach(function(img){
        const site = img.getAttribute('data-site');
        if (site) img.src = site;
      });
    }
  } catch(e){}
})();
</script>`;

    tR = tableHtml + "\\n" + script;
  }
} catch(err) {
  tR = `<!-- Templater: error generating gallery: ${String(err)} -->`;
}
%>
