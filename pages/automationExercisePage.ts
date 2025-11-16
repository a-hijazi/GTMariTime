import { Locator, Page, expect } from "@playwright/test";
import {
  requiredProducts,
  URLs,
  emptyMessage,
} from "../constants/automationExercise";

export class automationExercisePage {
  private readonly Cart: Locator;
  private readonly Products: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly hereLinkProduct: Locator;
  readonly productSearchBar: Locator;
  readonly productsearchButton: Locator;
  readonly continueShopping: Locator;

  constructor(private readonly page: Page) {
    this.Cart = page.getByRole("link", { name: "Cart" });
    this.Products = page.getByRole("link", { name: "products" });
    this.emptyCartMessage = page.locator("#empty_cart p.text-center");
    this.hereLinkProduct = page.getByRole("link", { name: "here" });

    this.productSearchBar = page.getByRole("textbox", {
      name: "Search Product",
    });

    this.productsearchButton = page
      .getByRole("button")
      .filter({ has: page.locator(".fa-search") });

    this.continueShopping = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  //-----------------------------------------------------
  // DYNAMIC LOCATORS
  //-----------------------------------------------------

  viewProductFor(productName: string) {
    return this.page
      .locator(".product-image-wrapper", { hasText: productName })
      .getByRole("link", { name: "View Product" });
  }

  productCard(productName: string) {
    return this.page.locator(".product-image-wrapper", {
      hasText: productName,
    });
  }

  productNameElement(productName: string) {
    return this.productCard(productName).locator(".productinfo p");
  }

  addToCartButton(productName: string) {
    return this.productCard(productName)
      .locator(".productinfo")
      .getByText("Add to cart");
  }

  //-----------------------------------------------------
  // ACTIONS
  //-----------------------------------------------------

  async clickCart(): Promise<void> {
    await expect(this.Cart).toBeVisible();
    await this.Cart.click();
    await expect(this.page).toHaveURL(URLs.viewCartURL);
  }

  async verifyTheCartIsEmpty(): Promise<void> {
    const message = this.emptyCartMessage;
    await expect(message).toBeVisible();

    const emptyText = await message.locator("b").innerText();
    expect(emptyText).toBe(emptyMessage);
  }

  async addProductUsingEmptyPageOption(productName: string): Promise<void> {
    // 1. Click "here"
    await expect(this.hereLinkProduct).toBeVisible();
    await this.hereLinkProduct.click();
    await expect(this.page).toHaveURL(URLs.productPage);

    // 2. Search typed dynamically
    await expect(this.productSearchBar).toBeVisible();
    await this.productSearchBar.click();

    const delay = 5000 / productName.length;
    await this.page.keyboard.type(productName, { delay });

    await this.productsearchButton.click();

    // 3. Verify card & product name
    const card = this.productCard(productName);
    await expect(card).toBeVisible();

    const nameElement = this.productNameElement(productName);
    await expect(nameElement).toHaveText(productName);

    // 4. Hover to reveal slider
    await card.hover(); // FIXED: hover card, not name

    // 5. Click Add to cart inside the correct card
    const addButton = this.addToCartButton(productName);
    await addButton.click();

    // 6. Continue shopping
    await expect(this.continueShopping).toBeVisible();
    await this.continueShopping.click();

    // 7. Go to cart
    // await this.Cart.click();
  }
  async addProductUsingProductPageOption(productName: string): Promise<void> {
    // 1. Click "Product"
    await expect(this.Products).toBeVisible();
    await this.Product.click();
    await expect(this.page).toHaveURL(URLs.productPage);

    // 2. Search typed dynamically
    await expect(this.productSearchBar).toBeVisible();
    await this.productSearchBar.click();
    await this.productSearchBar.clear();

    const delay = 5000 / productName.length;
    await this.page.keyboard.type(productName, { delay });

    await this.productsearchButton.click();

    // 3. Verify card & product name
    const card = this.productCard(productName);
    await expect(card).toBeVisible();

    const nameElement = this.productNameElement(productName);
    await expect(nameElement).toHaveText(productName);

    // 4. Hover to reveal slider
    await card.hover(); // FIXED: hover card, not name

    // 5. Click Add to cart inside the correct card
    const addButton = this.addToCartButton(productName);
    await addButton.click();

    // 6. Continue shopping
    await expect(this.continueShopping).toBeVisible();
    await this.continueShopping.click();

    // 7. Go to cart
    // await this.Cart.click();
  }
}
