// FINAL LOCKED VERSION
// buildGallery loads images sequentially by folder naming rule
function buildGallery(containerId, category, maxCount = 200) {
  const cont = document.getElementById(containerId);
  if (!cont) return;

  let i = 1;
  let miss = 0;

  function tryLoad() {
    const num = String(i).padStart(3, '0');
    const src = `../images/${category}/${category}_${num}.jpg`;
    const img = new Image();

    img.onload = function () {
      miss = 0;
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${src}" alt="">
        <p style="margin-top:8px">${category}_${num}</p>
      `;
      cont.appendChild(div);
      i++;
      if (i <= maxCount) tryLoad();
    };

    img.onerror = function () {
      miss++;
      i++;
      if (miss < 5 && i <= maxCount) tryLoad();
    };

    img.src = src;
  }

  tryLoad();
}
