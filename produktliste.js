const mycategory = new URLSearchParams(window.location.search).get("category");
const productContainer = document.querySelector(".product_list_container");

const overskrift = document.querySelector("h1");
overskrift.innerHTML = mycategory;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${mycategory}`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(data) {
  let markup = "";

  data.forEach((product) => {
    let discountedPrice = product.price;

    if (product.discount) {
      discountedPrice = (product.price * (100 - product.discount)) / 100;
    }

    // Tjek om produktet er udsolgt og tilføj soldout-klassen til billedet
    const soldOutClass = product.soldout ? "soldout" : "";

    markup += `
      <a class="smallproduct" href="produkt.html?id=${product.id}">
        <div class="image-container ${soldOutClass}">
          <img class="product_billede" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
            alt="${product.productdisplayname}">
          <div class="${product.discount && "deal_badge"} ${!product.discount && "hide"}">Deal</div>
          <div class="${product.soldout && "soldout_badge"} ${!product.soldout && "hide"}">Sold out</div>
        </div>
        <p>${product.brandname} | ${product.articletype}</p>
        <p><b>${product.productdisplayname}</b></p>
        <div class="price">
          <p>${discountedPrice.toFixed(2)} kr</p>
          <p class="${product.discount && "highlight"} ${!product.discount && "hide"}">
            <span class="grey">Oprindeligt:</span> <span class="cross">${product.price} kr</span>
            <span class="highlight">-${product.discount}%</span>
          </p>
        </div>
      </a>`;
  });

  productContainer.innerHTML = markup;
}
