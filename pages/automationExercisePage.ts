import { Locator, Page, expect } from "@playwright/test";
import { URLs, emptyMessage } from "../constants/automationExercise";

export class automationExercisePage {
  private readonly Cart: Locator;
  private readonly Products: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly hereLinkProduct: Locator;
  private readonly checkOutButton: Locator;
  readonly productSearchBar: Locator;
  readonly productsearchButton: Locator;
  readonly continueShopping: Locator;

  constructor(private readonly page: Page) {
    this.Cart = page.getByRole("link", { name: "Cart" });
    this.Products = page.getByRole("link", { name: "products" });
    this.emptyCartMessage = page.locator("#empty_cart p.text-center");
    this.hereLinkProduct = page.getByRole("link", { name: "here" });
    this.checkOutButton = page.getByText("Proceed To Checkout");
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

  private productCard(productName: string) {
    return this.page.locator(".product-image-wrapper", {
      hasText: productName,
    });
  }

  private productNameElement(productName: string) {
    return this.productCard(productName).locator(".productinfo p");
  }

  private addToCartButton(productName: string) {
    return this.productCard(productName)
      .locator(".productinfo")
      .getByText("Add to cart");
  }

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

  private async navigateToProductPage(fromEmptyPage: boolean): Promise<void> {
    if (fromEmptyPage) {
      await expect(this.hereLinkProduct).toBeVisible();
      await this.hereLinkProduct.click();
    } else {
      await expect(this.Products).toBeVisible();
      await this.Products.click();
    }
    await expect(this.page).toHaveURL(URLs.productPage);
  }

  private async searchProduct(productName: string): Promise<void> {
    await expect(this.productSearchBar).toBeVisible();
    await this.productSearchBar.click();
    await this.productSearchBar.clear();
    const delay = 5000 / productName.length;
    await this.page.keyboard.type(productName, { delay });
    await this.productsearchButton.click();
  }

  private async validateProductCard(productName: string): Promise<void> {
    const card = this.productCard(productName);
    await expect(card).toBeVisible();
    const name = this.productNameElement(productName);
    await expect(name).toHaveText(productName);
    await card.hover();
  }

  private async addToCart(productName: string): Promise<void> {
    const addButton = this.addToCartButton(productName);
    await addButton.click();
    await expect(this.continueShopping).toBeVisible();
    await this.continueShopping.click();
  }

  async addProduct(productName: string, isFirst: boolean): Promise<void> {
    await this.navigateToProductPage(isFirst);
    await this.searchProduct(productName);
    await this.validateProductCard(productName);
    await this.addToCart(productName);
  }

  async checkOutProducts(): Promise<void> {
    await expect(this.checkOutButton).toBeVisible();
    await this.checkOutButton.click();
  }
}
