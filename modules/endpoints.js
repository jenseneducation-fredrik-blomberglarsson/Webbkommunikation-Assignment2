const database = require("./database-operations");

module.exports = app => {
  app.get("/api/products", (request, response) => {
    const data = database.getProducts();
    response.send(data);
  });

  app.get("/cart", (request, response) => {
    response.send();
  });

  app.get("/api/cart", (request, response) => {
    const data = database.getShoppingCart();
    response.send(data);
  });

  app.post("/api/product/cart", (request, response) => {
    const name = request.query.name;

    const res = database.insertProduct(name);
    response.send(res);
  });

  app.delete("/api/cart/product", (request, response) => {
    console.log(request.url);
    const name = request.query.name;

    const res = database.removeProduct(name);
    response.send(res);
  });
};
