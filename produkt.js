let productId = 1164;
let productContainer = document.querySelector(".productContainer");
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
     <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="Trøje">
            <div class="information_container">
                <div class="information">
                    <div>
                        <p class="brand"> ${data.brandname} | ${data.articletype}</p>
                        <h1>${data.productdisplayname} - ${data.articletype} </h1>
                        <h2><span class="highlight"> ${data.price} kr</span> <span class="moms">inkl. moms</span></h2>
                        <p>Oprindeligt: <span class="cross">  ${data.price}  kr</span> <span class="highlight">-${data.discount}%</span></p>
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
