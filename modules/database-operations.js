const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

exports.initiateDatabase = () => {
  const databaseInitiated = database.has("products", "shoppingCart").value();

  if (!databaseInitiated) {
    database.defaults({ shoppingCart: [], Products: [] }).write();
  }
};

exports.insertProduct = name => {
  let message = "";
  const findProduct = database
    .get("products")
    .find({ name: name })
    .write();

  const findProductInCart = database
    .get("shoppingCart")
    .find({ name: name })
    .write();

  if (typeof findProduct == "undefined") {
    // Felmeddelande om produkten inte finns i "products"
    message = {
      success: false,
      message: "You can't add a product to cart that does not exist"
    };
  } else if (typeof findProductInCart !== "undefined") {
    // Felmeddelande om produkten redan finns i varukorgen
    message = {
      success: false,
      message: "You can't add an exisisting product to cart"
    };
  } else {
    // annars skapas en produkt i varukorgen
    database
      .get("shoppingCart")
      .push(findProduct)
      .write();

    message = {
      success: true,
      message: "Product added to cart"
    };
  }

  return message;
};

exports.removeProduct = name => {
  let message = "";
  const findProductInCart = database
    .get("shoppingCart")
    .find({ name: name })
    .write();

  if (typeof findProductInCart == "undefined") {
    // Felmeddelande om man försöker ta bort en produkt som inte finns i varukogen.
    message = {
      success: false,
      message: "You can't remove a product that does not exist in cart"
    };
  } else {
    // annars tar den bort en produkt från
    database
      .get("shoppingCart")
      .remove(findProductInCart)
      .write();

    message = {
      success: true,
      message: "Removed product from cart"
    };
  }
  return message;
};

exports.getProducts = () => {
  return database.get("products");
};

exports.getShoppingCart = () => {
  return database.get("shoppingCart");
};
