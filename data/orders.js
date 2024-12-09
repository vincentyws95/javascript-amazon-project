import { formatToMonthDate } from "../scripts/utils/dateFormatter.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { addToCart, getCartQuantity } from "../data/cart.js";
import { loadProductsAsync, getProductById } from "./products.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

Promise.all([loadProductsAsync()]).then(() => {
  renderOrders();
  attachAllEventListner();
  updateCartQuantity();
});

export function addOrder(order) {
  console.log(orders, order);
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function renderOrders() {
  let ordersHTML = "";

  orders.forEach((order) => {
    ordersHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatToMonthDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
          ${renderOrderProductsHTML(order)}
          </div>
          
    </div>
`;
    document.querySelector(".orders-grid").innerHTML = ordersHTML;
  });
}

function renderOrderProductsHTML(order) {
  let orderProductsHTML = "";

  order.products.forEach((orderProduct) => {
    const product = getProductById(orderProduct.productId);
    orderProductsHTML += `
    <div class="product-image-container">
              <img src="${product.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                 ${product.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${formatToMonthDate(
                orderProduct.estimatedDeliveryTime
              )}</div>
              <div class="product-quantity">Quantity: ${
                orderProduct.quantity
              }</div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${
                orderProduct.productId
              }">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${
      orderProduct.productId
    }">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;
  });

  return orderProductsHTML;
}

function attachAllEventListner() {
  attachBuyAgainClick();
}

function attachBuyAgainClick() {
  document.querySelectorAll(".js-buy-again").forEach((el) => {
    el.addEventListener("click", () => {
      addToCart(el.dataset.productId);
      updateCartQuantity();
    });
  });
}

function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerHTML = getCartQuantity();
}

export function getProductByOrderIdProductId(orderId, productId) {
  return orders
    .find((x) => x.id === orderId)
    ?.products.find((x) => x.productId === productId);
}
