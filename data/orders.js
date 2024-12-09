import { formatToDate } from "../scripts/utils/dateFormatter.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { products, loadProductsAsync, getProductById } from "./products.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

Promise.all([loadProductsAsync()]).then(() => {
  renderOrders();
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
    console.log(order);
    ordersHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatToDate(order.orderTime)}</div>
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
          ${renderOrderProductsHTML(order.products)}
          </div>
          
    </div>
`;
    document.querySelector(".orders-grid").innerHTML = ordersHTML;
  });
}

function renderOrderProductsHTML(orderProducts) {
  let orderProductsHTML = "";

  orderProducts.forEach((orderProduct) => {
    const product = getProductById(orderProduct.productId);
    console.log(product);
    orderProductsHTML += `
    <div class="product-image-container">
              <img src="${product.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                 ${product.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${formatToDate(
                orderProduct.estimatedDeliveryTime
              )}</div>
              <div class="product-quantity">Quantity: ${
                orderProduct.quantity
              }</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;
  });

  return orderProductsHTML;
}
