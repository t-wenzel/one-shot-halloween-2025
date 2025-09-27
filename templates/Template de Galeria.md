<%*
/*
  Robust gallery Templater:
  - emits src = shortest local relative path (for Obsidian preview)
  - emits data-site candidates and a script that tries them on the published site
  - edit `parentFolder` logic if your structure is different
*/
const parentFolder = tp.file.folder(true);        // folder containing this note
const baseName = tp.file.title;                   // note title (basename)
const folder = `${parentFolder}/${baseName} Imagens`; // images folder
const cols = 3;

// helpers
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
  let i=0; while(i<a.length && i<b.length && a[i]===b[i]) i++;
  const up = a.length - i; const parts = [];
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
    const parts = normalizedFolder.split("/");
    const basename = parts[parts.length - 1];
    const siteFolderKebab = kebabify(basename); // e.g. "Grand-Est-Imagens"

    let rows = [];
    for (let i=0;i<images.length;i+=cols){
      const slice = images.slice(i, i+cols);
      let row = "  <tr>\n";
      for (const f of slice){
        const vaultPath = f.path.replace(/\\/g,"/");                // e.g. "content/.../Grand Est Imagens/..."
        const filename = vaultPath.split("/").slice(-1)[0];        // file name
        // candidate site paths (common patterns)
        const candidate1 = siteFolderKebab + "/" + filename;               // "Grand-Est-Imagens/file.jpg"
        const candidate2 = "/" + candidate1;                               // "/Grand-Est-Imagens/file.jpg"
        const candidate3 = vaultPath.replace(/^content\//,"");             // "Localizações/..../file.jpg" (no leading content/)
        const candidate4 = candidate3.replace(/^\/+/,"");                  // same without leading slash if any
        const candidate5 = "./" + candidate1;                              // relative candidate
        // local shortest path for Obsidian preview
        const localRel = noteDir ? relativePath(noteDir, vaultPath) : vaultPath;
        const safeLocal = encodePath(localRel);
        // put candidates into JSON string to embed in data attribute
        const candidatesArr = [candidate1, candidate2, candidate3, candidate4, candidate5].map(encodePath);
        const dataCandidates = JSON.stringify(candidatesArr);

        row += `    <td style="padding:8px; text-align:center;"><img class="templater-gallery-img" src="${safeLocal}" data-candidates='${dataCandidates}' alt="${f.name}" style="max-width:100%; height:auto; border-radius:8px;"></td>\n`;
      }
      row += "  </tr>";
      rows.push(row);
    }

    const tableHtml = "<table style=\"width:100%; border-collapse:collapse;\">\n" + rows.join("\n") + "\n</table>";

    // script: on published site (non-file:) try the candidates in order; use Image() preloader to check
    const loaderScript = `<script>
(function(){
  try {
    if (location.protocol === 'file:') return; // don't run in Obsidian preview
    function trySet(img, candidates, idx){
      if (!candidates || idx >= candidates.length) return;
      var test = new Image();
      test.onload = function(){ img.src = candidates[idx]; };
      test.onerror = function(){ trySet(img, candidates, idx+1); };
      test.src = candidates[idx];
    }
    document.querySelectorAll('.templater-gallery-img').forEach(function(img){
      var raw = img.getAttribute('data-candidates');
      if (!raw) return;
      try {
        var candidates = JSON.parse(raw);
        // remove duplicates & falsy
        candidates = candidates.filter(function(x,i,a){ return x && a.indexOf(x)===i; });
        trySet(img, candidates, 0);
      } catch(e){}
    });
  } catch(e){}
})();
</script>`;

    tR = tableHtml + "\n" + loaderScript;
  }
} catch(err) {
  tR = `<!-- Templater: error generating gallery: ${String(err)} -->`;
}
%>
