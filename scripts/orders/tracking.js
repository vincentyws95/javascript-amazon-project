import { orders } from "../../data/orders.js";
import { getProductById, loadProductsAsync } from "../../data/products.js";
import { getProductByOrderIdProductId } from "../../data/orders.js";
import { formatToDayMonthDate } from "../utils/dateFormatter.js";

Promise.all([loadProductsAsync()]).then(() => {
  renderTrackingHTML();
});
function renderTrackingHTML() {
  const urlParams = new URLSearchParams(location.search);

  const productId = urlParams.get("productId");
  const orderId = urlParams.get("orderId");
  const product = getProductById(productId);
  const orderProduct = getProductByOrderIdProductId(orderId, productId);

  const trackingHTML = `
          <div class="delivery-date">
          Arriving on ${formatToDayMonthDate(
            orderProduct.estimatedDeliveryTime
          )}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;

  document.querySelector(".order-tracking").innerHTML += trackingHTML;
}
