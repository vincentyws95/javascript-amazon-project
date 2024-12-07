import { addToCart, cart, loadCartFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("add new product into cart", () => {
    //prevent saving to localStorage
    spyOn(localStorage, "setItem");

    //fake the default quantity select
    spyOn(document, "querySelector").and.callFake(() => {
      return {
        value: 1,
      };
    });

    loadCartFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });

  it("add existing product into cart", () => {
    //prevent saving to localStorage
    spyOn(localStorage, "setItem");

    //fake default cart with 1 existing product
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: 1,
        },
      ]);
    });
    //fake the default quantity select
    spyOn(document, "querySelector").and.callFake(() => {
      return {
        value: 1,
      };
    });

    loadCartFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });
});
