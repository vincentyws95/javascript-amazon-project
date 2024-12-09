import { cart, loadCartFromStorage } from "../../../data/cart.js";
import { renderCartItems } from "../../../scripts/checkout/orderSummary.js";
import { loadProductsAsync } from "../../../data/products.js";

describe("test suite: renderCartItems", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(async () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });

    await loadProductsAsync();
    loadCartFromStorage();
    document.querySelector(".js-test-container").innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
            <a class="return-to-home-link js-home-link" href="amazon.html"></a>
            `;

    renderCartItems();
  });

  afterEach(() => {
    //cleanup
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("display the cart", () => {
    expect(document.querySelectorAll(`.cart-item-container`).length).toEqual(2);
    expect(document.querySelector(`.js-home-link`).textContent).toEqual(
      "3 items"
    );
    expect(
      document.querySelector(`.js-quantity-label-${productId1}`).innerText
    ).toContain("1");
    expect(
      document.querySelector(`.js-quantity-label-${productId2}`).innerText
    ).toContain("2");
  });

  it("delete cart item should display and update to cart", () => {
    document.querySelector(`.js-delete-cartItem-${productId1}`).click();
    //validate deleted item
    expect(document.querySelectorAll(`.cart-item-container`).length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart[0].productId).toEqual(productId2);
  });
});
