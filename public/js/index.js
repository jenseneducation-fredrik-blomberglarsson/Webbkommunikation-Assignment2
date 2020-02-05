const cartB = document.querySelector("#cartButton");
const displayCartInProducts = document.querySelector(".cartInProducts");
const displayProducts = document.querySelector(".products");
const productURL = "http://localhost:8000/api/products";
const cartURL = "http://localhost:8000/api/cart";
const addProductURL = "http://localhost:8000/api/product/cart";

fetch(productURL, { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    displayProduct(data);
  });

fetch(cartURL, { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    displayCart(data);
  });

const addProductToCart = name => {
  const url = addProductURL + "?name=" + name;

  fetch(url, { method: "POST" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
};

const displayProduct = products => {
  for (let i = 0; i < products.length; i++) {
    let nameElem = document.createElement("p");
    nameElem.className = "productName";
    let priceElem = document.createElement("p");
    priceElem.className = "productPrice";
    let imgElem = document.createElement("img");
    imgElem.setAttribute("src", products[i].img);
    addButtonElem = document.createElement("BUTTON");
    addButtonElem.className = "productButton";
    addButtonElem.innerHTML = "Lägg till i varukorgen";

    nameElem.innerHTML = products[i].name;
    priceElem.innerHTML = products[i].price;
    imgElem.innerHTML = products[i].img;

    displayProducts.append(nameElem);
    displayProducts.append(priceElem);
    displayProducts.append(imgElem);
    displayProducts.append(addButtonElem);

    const name = products[i].name;
    addButtonElem.addEventListener("click", () => {
      addProductToCart(name);
    });
  }
};

const displayCart = products => {
  for (let i = 0; i < products.length; i++) {
    let nameElem = document.createElement("p");
    nameElem.className = "productName";
    let priceElem = document.createElement("p");
    priceElem.className = "productPrice";
    let imgElem = document.createElement("img");
    imgElem.setAttribute("src", products[i].img);

    nameElem.innerHTML = products[i].name;
    priceElem.innerHTML = products[i].price;
    imgElem.innerHTML = products[i].img;

    displayCartInProducts.append(nameElem);
    displayCartInProducts.append(priceElem);
    displayCartInProducts.append(imgElem);
  }
};

function cartPage() {
  window.location = "http://localhost:8000/cart";
}

cartB.addEventListener("click", cartPage);
