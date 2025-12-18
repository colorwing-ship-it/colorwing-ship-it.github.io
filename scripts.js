fetch("/products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-list");
    if (!container) return;

    data.products.forEach(product => {
      const card = document.createElement("a");
      card.href = `products/${product.id}.html`;
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = `../images/${product.folder}/${product.folder}_001.jpg`;
      img.alt = product.name_en;

      const title = document.createElement("div");
      title.className = "product-title";
      title.innerHTML = `<strong>${product.name_zh}</strong><br><span>${product.name_en}</span>`;

      card.appendChild(img);
      card.appendChild(title);
      container.appendChild(card);
    });
  });
