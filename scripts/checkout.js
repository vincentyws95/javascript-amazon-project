import { loadProducts } from "../data/products.js";
import { renderCartItems } from "./checkout/orderSummary.js";
import { renderOrderSummary } from "./checkout/paymentSummary.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
// import "./exercise/ex-17.js";
// import "../data/backend-practice.js";

//load promise all at once,

Promise.all([
  new Promise((resolve) => {
    loadProducts(resolve);
  }),
  new Promise((resolve) => {
    loadCart(resolve);
  }),
]).then(() => {
  renderCartItems();
  renderOrderSummary();
});

//promise chaining 1 by 1
/*
new Promise((resolve) => {
  loadProducts(resolve);
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(resolve);
    });
  })

  .then(() => {
    renderCartItems();
    renderOrderSummary();
  });
*/
