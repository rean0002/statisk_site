const listContainer = document.querySelector(".product_list_container");

fetch(`https://kea-alt-del.dk/t7/api/products/`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  let markup = "";
  products
    .map((product) => {
      markup += ` <a class="produkt" href="produkt.html">

                    <div class="image-container">
                        <img class="produkt_billede" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                            alt="${product.productdisplayname}">
                    </div>
                    <p>${product.brandname} | ${product.articletype} </p>
                    <p> <b>${product.productdisplayname}</b></p>
                    <div class="price">
                        <p>${product.price} kr</p>
                    </div>
                </a>`;
    })
    .join("");
  console.log(markup);
  listContainer.innerHTML = markup;
}
