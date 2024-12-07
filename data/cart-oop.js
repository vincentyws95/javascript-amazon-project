function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    addToCart(productId) {
      const element = document.querySelector(
        `.js-product-quantity-${productId}`
      );
      const addedQuantity = Number(element?.value) || 1;

      const product =
        this.cartItems.find((x) => x.productId === productId) ||
        this.cartItems[
          this.cartItems.push({
            productId,
            quantity: 0,
            deliveryOptionId: "1",
          }) - 1
        ];

      product.quantity += addedQuantity;

      this.saveCartToStorage();
    },
    saveCartToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    loadCartFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
    deleteCartItem(productId) {
      this.cartItems = this.cartItems.filter((x) => x.productId !== productId);
      this.saveCartToStorage();
    },
    getCartQuantity() {
      return this.cartItems.reduce(
        (total, item) => (total += item.quantity),
        0
      );
    },
    getCartTotalPrice() {
      return (
        this.cartItems.reduce(
          (total, item) => (total += item.quantity * item.priceCents),
          0
        ) / 100
      );
    },
    updateCartItemQuantity(productId, newQuantity) {
      this.cartItems.forEach((x) => {
        if (x.productId === productId) x.quantity = Number(newQuantity);
      });

      this.saveCartToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      this.cartItems.forEach((x) => {
        if (x.productId === productId) x.deliveryOptionId = deliveryOptionId;
      });

      this.saveCartToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
cart.loadCartFromStorage();
console.log(cart);

const businessCart = Cart("businessCart-oop");
businessCart.loadCartFromStorage();
businessCart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");

console.log(businessCart);
