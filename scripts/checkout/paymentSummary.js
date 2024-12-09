import { cart, getCartQuantity, getCartTotalPrice } from "../../data/cart.js";

import { products, getProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderOrderSummary() {
  const cartTotalCost = cart.reduce(
    (total, cartItem) =>
      total + getProductById(cartItem.productId).priceCents * cartItem.quantity,
    0
  );

  const cartTotalShippingFees = cart.reduce(
    (total, cartItem) =>
      total + getDeliveryOptionById(cartItem.deliveryOptionId).priceCents,
    0
  );
  const cartCostIncludingShipping = cartTotalCost + cartTotalShippingFees;

  const estimatedTax = cartCostIncludingShipping * 0.1;
  const finalTotal = cartCostIncludingShipping + estimatedTax;

  const paymentHTML = `
      <div class="payment-summary">
            <div class="payment-summary-title">Order Summary</div>
  
            <div class="payment-summary-row">
              <div>Items (${getCartQuantity()}):</div>
              <div class="payment-summary-money">$${formatCurrency(
                cartTotalCost
              )}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatCurrency(
                cartTotalShippingFees
              )}</div>
            </div>
  
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatCurrency(
                cartCostIncludingShipping
              )}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatCurrency(
                estimatedTax
              )}</div>
            </div>
  
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatCurrency(
                finalTotal
              )}</div>
            </div>
  
            <button class="place-order-button button-primary js-place-order">
              Place your order
            </button>
          </div>
      `;

  document.querySelector(".payment-summary").innerHTML = paymentHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log(`Something went wrong when placing order. ${error}`);
      }

      window.location.href = "orders.html";
    });
}
