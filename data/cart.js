export const cart = [];

export function addToCart(productId) {
  const addedQuantity = Number(
    document.querySelector(`.js-product-quantity-${productId}`).value
  );
  const product =
    cart.find((x) => x.productId === productId) ||
    cart[cart.push({ productId, quantity: 0 }) - 1];

  product.quantity += addedQuantity;

  /*
    if(product){
      product.quantity++
    }
    else
      cart.push({ productName, quantity: 1 }); */
}

export default cart;
