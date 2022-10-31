import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.get("/count", (req, res) => {
  const count = +req.cookies.count || 0;
  res.cookie("count", count + 1);
  res.send("count: " + count);
});

const products = {
  1: { title: "The history of web 1" },
  2: { title: "new web" },
};
app.get("/products", (req, res) => {
  const output = Object.keys(products)
    .map(
      (key) => `
      <li>
        <a href="/cart/${key}">${products[key].title}</a>
      </li>`
    )
    .join("");
  // let output = "";
  // for (const key in products) {
  //   output += `
  //     <li>
  //       <a href="/cart/${key}">${products[key].title}</a>
  //     </li>
  //   `;
  // }
  res.send(`
    <h1>Products</h1>
    <ul>
      ${output}
    </ul>
    <a href="/cart">Cart</a>
  `);
});
/**
 * cart = {
 *  1: 2,
 *  2: 1
 * }
 */
app.get("/cart/:id", (req, res) => {
  const id = req.params.id;
  const cart = req.cookies.cart || {};
  cart[id] = (+cart[id] || 0) + 1;
  res.cookie("cart", cart);
  res.redirect("/cart");
});
app.get("/cart", (req, res) => {
  const cart = req.cookies.cart;
  if (!cart) {
    res.send("Empty");
  }
  const output = Object.keys(cart)
    .map(
      (key) => `
      <li>
        ${products[key].title} (${cart[key]})
      </li>`
    )
    .join("");
  res.send(`
    <h1>Cart</h1>
    <ul>
      ${output}
    </ul>
    <a href="/products">Products</a>`);
});

app.listen(3003, () => console.log("server on 3003"));
