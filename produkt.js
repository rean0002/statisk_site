const myProduct = new URLSearchParams(window.location.search);
const productId = myProduct.get("id");
let productContainer = document.querySelector(".productContainer");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    // Beregn rabatteret pris
    let discountedPrice = data.price;
    let highlightClass = ""; // Standard uden highlight
    let dealBadge = ""; // Badge for tilbud
    let soldOutBadge = ""; // Badge for udsolgt

    // Check om der er rabat
    if (data.discount) {
      discountedPrice = (data.price * (100 - data.discount)) / 100;
      highlightClass = "highlight"; // Tilføj highlight, hvis produktet er på tilbud
      dealBadge = `<div class="deal_badge">Deal</div>`; // Brug din eksisterende deal_badge
    }

    // Check om produktet er udsolgt
    if (data.stock === 0) {
      soldOutBadge = `<div class="soldout_badge">Sold out</div>`; // Brug din eksisterende soldout_badge
    }

    productContainer.innerHTML = `
      <div class="productContainer_img">
        ${dealBadge}
        ${soldOutBadge}
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="${data.productdisplayname}">
      </div>
      
      <div class="information_container">
        <div class="information">
          <div>
            <p class="brand">${data.brandname} | ${data.articletype}</p>
            <h1>${data.productdisplayname} - ${data.articletype}</h1>
            <h2><span class="${highlightClass}">${discountedPrice.toFixed(2)} kr</span> <span class="moms">inkl. moms</span></h2>
            <p class="${data.discount ? "" : "hide"}">
              Oprindeligt: <span class="cross">${data.price} kr</span> 
              <span class="highlight">-${data.discount}%</span>
            </p>
          </div>
          
          <div class="dropdown">
            <select>
              <option value="" disabled selected>Vælg størrelse</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          <div>
            <p><b>Inventory number</b></p>
            <p>${data.id}</p>
          </div>
        </div>
      </div>
    `;
  });
