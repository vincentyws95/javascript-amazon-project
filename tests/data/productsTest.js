import { Clothing, Appliance } from "../../data/products.js";

describe("clothing products on home page renders extra info HTML", () => {
  beforeEach(() => {});
  const clothing = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  });

  it("size chart link", () => {
    expect(clothing.extraInfoHTML()).toContain(
      "images/clothing-size-chart.png"
    );
  });
});

describe("appliance products on home page renders extra info HTML", () => {
  const appliance = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197,
    },
    priceCents: 1899,
    type: "appliance",
    keywords: ["toaster", "kitchen", "appliances"],
  });

  it("shows Instructions and Warranty link", () => {
    expect(appliance.extraInfoHTML()).toContain("Instructions");

    expect(appliance.extraInfoHTML()).toContain("Warranty");
  });
});
