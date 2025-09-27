<%*
/*
  Templater: shortest-site-path gallery generator
  - Set `folder` to the vault folder that contains images (exactly as shown in Obsidian).
  - Emits src = shortest local relative path (for Obsidian) and data-site = "kebab-folder-name/filename" (for Quartz).
*/
const parentFolder = tp.file.folder(true);
// Get the current file’s basename (filename without extension)
const baseName = tp.file.title;  
// Build the image folder path by appending " Imagens"
const folder = `${parentFolder}/${baseName} Imagens`; // edit to match your vault
const cols = 3;

// remove diacritics + convert spaces to hyphens (kebab-case-ish)
function kebabify(s){
  // remove leading/trailing slashes
  s = String(s).replace(/^\/+|\/+$/g, "");
  // normalize and remove diacritics
  s = s.normalize('NFD').replace(/\p{Diacritic}/gu, "");
  // replace spaces and repeated non-alnum with hyphens
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
    // compute folder basename (last segment) and kebabify it
    const parts = normalizedFolder.split("/");
    const basename = parts[parts.length - 1];
    const siteFolder = kebabify(basename); // e.g. "Grand-Est-Imagens"

    let rows = [];
    for (let i=0;i<images.length;i+=cols){
      const slice = images.slice(i, i+cols);
      let row = "  <tr>\n";
      for (const f of slice){
        const vaultPath = f.path.replace(/\\/g,"/");                    // e.g. "content/.../Grand Est Imagens/..."
        const filename = vaultPath.split("/").slice(-1)[0];
        const sitePathShort = siteFolder + "/" + filename;             // "Grand-Est-Imagens/0c3....jpg"
        const localRel = noteDir ? relativePath(noteDir, vaultPath) : vaultPath;
        const safeSite = encodePath(sitePathShort);
        const safeLocal = encodePath(localRel);
        row += `    <td style="padding:8px; text-align:center;"><img class="templater-gallery-img" src="${safeLocal}" data-site="${safeSite}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
      }
      row += "  </tr>";
      rows.push(row);
    }

    const tableHtml = "<table style=\"border-collapse:collapse;\">" + rows.join("\n") + "\n</table>";

    // swap script: runs on site (non-file) to switch src -> data-site
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
