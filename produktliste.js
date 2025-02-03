const mycategory = new URLSearchParams(window.location.search).get("category");
const productContainer = document.querySelector(".product_list_container");

const overskrift = document.querySelector("h1");
overskrift.innerHTML = mycategory;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${mycategory}`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(data) {
  const markup = data
    .map(
      (product) =>
        ` <a class="produkt" href="produkt.html">

                    <div class="image-container">
                        <img class="produkt_billede" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                            alt="${product.productdisplayname}">
                    </div>
                    <p>${product.brandname} | ${product.articletype} </p>
                    <p> <b>${product.productdisplayname}</b></p>
                    <div class="price">
                        <p>${product.price} kr</p>
                    </div>
                </a>`
    )
    .join("");
  productContainer.innerHTML = markup;
}
