import {
  deleteCartItem,
  getCartFromStorage,
  getCartQuantity,
  updateCartItemQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const cart = getCartFromStorage();
renderCartItems(cart, products);

function renderCartItems(cart, products) {
  let cartItemHTML = "";

  cart.forEach((cartItem, index) => {
    const product = products.find((y) => y.id === cartItem.productId);

    cartItemHTML += `
        <div class="cart-item-container js-cart-item-container-${
          cartItem.productId
        }">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>
        <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${product.image}"
              />

        <div class="cart-item-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-price">$${formatCurrency(product.priceCents)}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label js-quantity-label-${
            cartItem.productId
          }">${cartItem.quantity}</span> </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
            cartItem.productId
          }" >
            Update
          </span>

          <input class="quantity-input js-quantity-input-${
            cartItem.productId
          }"/>

          <span class="save-quantity-link link-primary quantity-input" data-product-id="${
            cartItem.productId
          }">
          Save
          </span>

          <span class="delete-quantity-link link-primary js-delete-cartItem" data-product-id="${
            cartItem.productId
          }">
            Delete
          </span>
        </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${index}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${index}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div> 
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${index}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
  });

  document.querySelector(".order-summary").innerHTML = cartItemHTML;

  addDeleteEventListener();
  addUpdateEventListener();
  attachSaveEventListener();
  updateCheckoutHeader();
}

function updateCheckoutHeader() {
  const cartQuantity = getCartQuantity();

  document.querySelector(".js-home-link").textContent =
    cartQuantity > 0 ? `${cartQuantity} items` : "";
}

function addDeleteEventListener() {
  document.querySelectorAll(".js-delete-cartItem").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      deleteCartItem(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateCheckoutHeader();
    });
  });
}

function addUpdateEventListener() {
  document.querySelectorAll(".js-update-quantity-link").forEach((element) => {
    const productId = element.dataset.productId;
    element.addEventListener("click", () => {
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });
}

function attachSaveEventListener() {
  document.querySelectorAll(".save-quantity-link").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const newQuantity = document.querySelector(
        `.js-quantity-input-${productId}`
      ).value;

      //update cart quantity
      updateCartItemQuantity(productId, newQuantity);

      //update item quantity
      document.querySelector(`.js-quantity-label-${productId}`).textContent =
        newQuantity;

      //remove is-editing-quantity from container to hide the input and save button.
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-editing-quantity");
    });
  });
}
function renderOrderSummary() {
  let html = `
    <div class="payment-summary">
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;
}
