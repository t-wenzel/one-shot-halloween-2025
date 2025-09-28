<%*
/*
  Templater: shortest-site-path gallery generator (table layout)
  - Uses absolute vault paths for img src (leading slash).
  - src = /Vault/Folder/filename (absolute within vault).
  - data-site = "kebab-folder/filename" (no leading slash).
  - On site, script replaces src with data-site (works for reloads and SPA).
*/
const path = tp.file.path(true);
const folder = path.substring(0, path.lastIndexOf("/"));
const cols = 3;

function kebabify(s){
  s = String(s).replace(/^\/+|\/+$/g, "");
  s = s.normalize('NFD').replace(/\p{Diacritic}/gu, "");
  s = s.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g,'');
  return s;
}
function encodePath(p){ return encodeURI(p).replace(/#/g,'%23'); }
// Return an absolute vault path (leading slash) and URI-encode it
function absoluteVaultPath(p){
  const cleaned = String(p).replace(/\\/g,"/").replace(/^\/+|\/+$/g,"");
  return "/" + encodePath(cleaned);
}

try {
  const allFiles = app.vault.getFiles();
  const normalizedFolder = String(folder).replace(/^\/+|\/+$/g, "");

  const images = allFiles
    .filter(f => {
      const p = f.path.replace(/\\/g,"/");
      return p.startsWith(normalizedFolder + "/") && /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name);
    })
    .sort((a,b)=> a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  if (!images || images.length === 0) {
    tR = `<!-- Templater: No images found in folder '${normalizedFolder}'. -->`;
  } else {
    const parts = normalizedFolder.split("/");
    const basename = parts[parts.length - 1];
    const siteFolder = kebabify(basename);

    let rows = [];
    for (let i=0;i<images.length;i+=cols){
      const slice = images.slice(i, i+cols);
      let row = "  <tr>\n";
      for (const f of slice){
        const vaultPath = f.path.replace(/\\/g,"/");
        const filename = vaultPath.split("/").slice(-1)[0];
        const sitePathShort = siteFolder + "/" + filename;

        // Use absolute vault path for src (leading slash)
        const safeLocal = absoluteVaultPath(vaultPath);
        // data-site remains vault-relative short path (no leading slash)
        const safeSite = encodePath(sitePathShort).replace(/^\/+/,"");

        row += `    <td style="padding:8px; text-align:center; place-content:center;">` +
               `<img class="templater-gallery-img" src="${safeLocal}" data-site="${safeSite}" alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;">` +
               `</td>\n`;
      }
      row += "  </tr>";
      rows.push(row);
    }

    const tableHtml = "<table style=\"width:100%; border-collapse:collapse;\">\n" + rows.join("\n") + "\n</table>";

    const script = `<script>
(function(){
  if (location.protocol === 'file:') return;
  document.querySelectorAll('.templater-gallery-img').forEach(function(img){
    const site = img.getAttribute('data-site');
    if (site) img.src = site;
  });
})();
</script>`;

    tR = tableHtml + "\\n" + script;
  }
} catch(err) {
  tR = `<!-- Templater: error generating gallery: ${String(err)} -->`;
}
%>
