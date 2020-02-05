const productB = document.querySelector("#productButton");
const cartURL = "http://localhost:8000/api/cart";
const removeCartUrl = "http://localhost:8000/api/cart/product";
const displayProductsInCart = document.querySelector(".cart");

fetch(cartURL, { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    displayCart(data);
  });

const removeProductFromCart = name => {
  const url = removeCartUrl + "?name=" + name;

  fetch(url, { method: "DELETE" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
};

const displayCart = products => {
  for (let i = 0; i < products.length; i++) {
    let nameElem = document.createElement("p");
    nameElem.className = "productName";
    let priceElem = document.createElement("p");
    priceElem.className = "productPrice";
    let imgElem = document.createElement("img");
    imgElem.setAttribute("src", products[i].img);
    removeButtonElem = document.createElement("BUTTON");
    removeButtonElem.className = "productButton";

    removeButtonElem.innerHTML = "Ta bort från varukorgen";

    nameElem.innerHTML = products[i].name;
    priceElem.innerHTML = products[i].price;
    imgElem.innerHTML = products[i].img;

    displayProductsInCart.append(nameElem);
    displayProductsInCart.append(priceElem);
    displayProductsInCart.append(imgElem);
    displayProductsInCart.append(removeButtonElem);

    const name = products[i].name;
    removeButtonElem.addEventListener("click", () => {
      removeProductFromCart(name);
    });
  }
};

function productPage() {
  window.location = "http://localhost:8000/";
}

productB.addEventListener("click", productPage);
