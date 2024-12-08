import { cart, addToCart, getCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

function renderProductsHTML() {
  products.forEach((product) => {
    productsHTML += `
              <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${product.image}"
              />
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img
                class="product-rating-stars"
                src="${product.getStarsUrl()}"/>
              <div class="product-rating-count link-primary">${
                product.rating.count
              }</div>
            </div>
  
            <div class="product-price">$${product.getPrice()}</div>
  
            <div class="product-quantity-container ">
              <select class="js-product-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
              
            ${product.extraInfoHTML()}
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-${product.id}">
              <img src="images/icons/checkmark.png" />
              Added
            </div>
  
            <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>
      `;
  });

  const productsGridElement = document.querySelector(".products-grid");
  productsGridElement.innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId } = btn.dataset;
      addToCart(productId);
      updateCartQuantity();
      displayAdded(productId);
    });
  });
}

function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerHTML = getCartQuantity();
}

let timeoutId;
let isAdding = false;

function displayAdded(productId) {
  const addedElement = document.querySelector(`.js-added-${productId}`);
  addedElement.classList.add("js-added-to-cart");

  isAdding && clearTimeout(timeoutId);

  isAdding = true;

  timeoutId = setTimeout(() => {
    addedElement.classList.remove("js-added-to-cart");
    isAdding = false;
  }, 2000);
}

renderProductsHTML();
updateCartQuantity();
