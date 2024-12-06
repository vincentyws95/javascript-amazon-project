export let cart = getCartFromStorage();

export function addToCart(productId) {
  const addedQuantity = Number(
    document.querySelector(`.js-product-quantity-${productId}`).value
  );

  const product =
    cart.find((x) => x.productId === productId) ||
    cart[cart.push({ productId, quantity: 0, deliveryOptionId: "1" }) - 1];

  product.quantity += addedQuantity;

  saveCartToStorage();
  /*
    if(product){
      product.quantity++
    }
    else
      cart.push({ productName, quantity: 1 }); */
}

export function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartFromStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function deleteCartItem(productId) {
  cart = cart.filter((x) => x.productId !== productId);
  saveCartToStorage();
}

export function getCartQuantity() {
  return cart.reduce((total, item) => (total += item.quantity), 0);
}

export function getCartTotalPrice() {
  return (
    cart.reduce(
      (total, item) => (total += item.quantity * item.priceCents),
      0
    ) / 100
  );
}

export function updateCartItemQuantity(productId, newQuantity) {
  cart.forEach((x) => {
    if (x.productId === productId) x.quantity = Number(newQuantity);
  });

  saveCartToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach((x) => {
    if (x.productId === productId) x.deliveryOptionId = deliveryOptionId;
  });

  saveCartToStorage();
}
