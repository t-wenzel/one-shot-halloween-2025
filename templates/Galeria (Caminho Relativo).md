<%*
/*
  Templater: shortest-site-path gallery generator
  - Set `folder` to the vault folder that contains the note.
  - Only collects images that are directly inside the child folder "<basename> Imagens".
*/
const path = tp.file.path(true); // e.g. "content/.../Saint Orlac/note.md"
const folder = path.substring(0, path.lastIndexOf("/"));
const cols = 3;

function kebabify(s){
  s = String(s).replace(/^\/+|\/+$/g, "");
  s = s.normalize('NFD').replace(/\p{Diacritic}/gu, "");
  s = s.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g,'');
  return s;
}

function encodePath(p){ return encodeURI(p).replace(/#/g,'%23'); }

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
  const parts = normalizedFolder.split("/");
  const basename = parts[parts.length - 1];                     // "Saint Orlac"
  const imagesChildFolder = normalizedFolder + "/" + (basename + " Imagens"); // "Saint Orlac/Saint Orlac Imagens"

  const active = app.workspace.getActiveFile();
  const noteDir = active ? active.path.replace(/\\/g,"/").replace(/\/[^\/]*$/,"") : "";

  const images = allFiles
    .filter(f=> {
      const p = f.path.replace(/\\/g,"/");                         // full path, e.g. "Saint Orlac/Saint Orlac Imagens/foo.jpg"
      const parent = p.split("/").slice(0,-1).join("/");          // parent folder of this file
      // only accept images whose parent folder is exactly the imagesChildFolder
      return parent === imagesChildFolder && /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name);
    })
    .sort((a,b)=> a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  if (!images || images.length === 0) {
    tR = `<!-- Templater: No images found in folder '${imagesChildFolder}'. -->`;
  } else {
    const siteFolder = kebabify(basename) + "-Imagens"; // same naming you used before

    let rows = [];
    for (let i=0;i<images.length;i+=cols){
      const slice = images.slice(i, i+cols);
      let row = `  <tr style="display: grid;grid-template-columns: repeat(${cols},1fr);">\n`;
      for (const f of slice){
        const vaultPath = f.path.replace(/\\/g,"/");
        const filename = vaultPath.split("/").slice(-1)[0];
        const sitePathShort = siteFolder + "/" + filename;
        const localRel = noteDir ? relativePath(noteDir, vaultPath) : vaultPath;
        const safeSite = encodePath(sitePathShort);
        const safeLocal = encodePath(localRel);
        row += `    <td style="padding:8px; text-align:center; place-content: center;"><img class="templater-gallery-img" src="${safeLocal}" data-site="${safeSite}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
      }
      row += "  </tr>";
      rows.push(row);
    }

    const tableHtml = "<table style=\"border-collapse:collapse;\">\n" + rows.join("\n") + "\n</table>";

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

    tR = tableHtml + script;
  }
} catch(err) {
  tR = `<!-- Templater: error generating gallery: ${String(err)} -->`;
}
%>