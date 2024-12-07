import {
  cart,
  deleteCartItem,
  getCartQuantity,
  updateCartItemQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import deliveryOptions from "../../data/deliveryOptions.js";
import { renderOrderSummary } from "../checkout/paymentSummary.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderCartItems() {
  let cartItemHTML = "";

  cart.forEach((cartItem) => {
    const product = products.find((y) => y.id === cartItem.productId);

    const deliveryOption = deliveryOptions.find(
      (x) => x.id === cartItem.deliveryOptionId
    );

    const deliveryDayFormat = dayjs()
      .add(deliveryOption.deliveryDays, "d")
      .format("dddd, MMMM DD");

    cartItemHTML += `
          <div class="cart-item-container js-cart-item-container-${
            cartItem.productId
          }">
              <div class="delivery-date js-delivery-date-${
                cartItem.productId
              }">Delivery date: ${deliveryDayFormat}</div>
          <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${product.image}"
                />
  
          <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">$${(
            product.getPrice() * cartItem.quantity
          ).toFixed(2)}</div>
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
  
            <span class="delete-quantity-link link-primary js-delete-cartItem js-delete-cartItem-${
              cartItem.productId
            }" data-product-id="${cartItem.productId}">
              Delete
            </span>
          </div>
          </div>
          <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
            ${renderDeliveryOptions(cartItem)}
          </div>
          </div>
        </div>
          `;
  });

  document.querySelector(".order-summary").innerHTML = cartItemHTML;

  attachEventListener();
  updateCheckoutHeader();
}

function attachEventListener() {
  addDeleteEventListener();
  addUpdateEventListener();
  attachSaveEventListener();
  attachDeliveryOptionListener();
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
      updateCheckoutHeader();
      renderCartItems();
      renderOrderSummary();
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

      //re-render the view
      renderCartItems();
      renderOrderSummary();
    });
  });
}

function renderDeliveryOptions(cartItem) {
  let deliveryOptionsHTML = "";
  const today = dayjs();

  deliveryOptions.forEach((opt) => {
    const deliveryDayFormat = today
      .add(opt.deliveryDays, "d")
      .format("dddd, MMMM DD");
    const deliveryCostString = opt.priceCents
      ? `$${formatCurrency(opt.priceCents)} - Shipping`
      : "FREE Shipping";

    const isChecked = opt.id === cartItem.deliveryOptionId;
    deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option" data-product-id=${
        cartItem.productId
      } data-delivery-option-id=${opt.id}>
        <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}"
        />
        <div>
          <div class="delivery-option-date">${deliveryDayFormat}</div>
          <div class="delivery-option-price">${deliveryCostString}</div>
        </div>
      </div>
      `;
  });

  return deliveryOptionsHTML;
}
function attachDeliveryOptionListener() {
  document.querySelectorAll(".js-delivery-option").forEach((el) => {
    el.addEventListener("click", (event) => {
      const { productId, deliveryOptionId } = el.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartItems();
      renderOrderSummary();
    });
  });
}
