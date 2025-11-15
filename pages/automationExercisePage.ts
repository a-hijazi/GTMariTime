import { Locator, Page, expect } from "@playwright/test";
import {
  requiredProducts,
  URLs,
  emptyMessage,
} from "../constants/automationExercise";

export class automationExercisePage {
  private readonly Cart: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly hereLinkProduct: Locator;
  readonly productSearchBar: Locator;
  readonly productsearchButton: Locator;
  readonly addToCartButton: Locator;
  readonly continueShopping: Locator;
  // readonly targetCardViewProduct: Locator;
  // private readonly

  constructor(private readonly page: Page) {
    this.Cart = page.getByRole("link", { name: "Cart" });
    this.emptyCartMessage = page.locator("#empty_cart p.text-center");
    this.hereLinkProduct = page.getByRole("link", { name: "here" });
    this.productSearchBar = page.getByRole("textbox", {
      name: "Search Product",
    });
    this.productsearchButton = page
      .getByRole("button")
      .filter({ has: page.locator(".fa-search") });
    this.addToCartButton = page.getByText("Add to cart");
    this.continueShopping = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }
  viewProductFor(productName: string) {
    return this.page
      .locator(".product-image-wrapper", { hasText: productName })
      .getByRole("link", { name: "View Product" });

    // this.targetCardViewProduct = page
    //   .locator(".product-image-wrapper", { hasText: "Premium Polo T-Shirts" })
    //   .getByRole("link", { name: "View Product" });

    // this.EmptyCart = page.locator('.table-responsive.cart_info]');
  }

  async clickCart(): Promise<void> {
    await expect(this.Cart).toBeVisible();
    await this.Cart.click();
    await expect(this.page).toHaveURL(URLs.viewCartURL);
  }
  async verifyTheCartIsEmpty(): Promise<void> {
    const message = this.emptyCartMessage;
    await expect(message).toBeVisible();

    // 2. Verify text "Cart is empty!"
    const emptyText = await message.locator("b").innerText();
    expect(emptyText).toBe(emptyMessage);
  }
  async addProductUsingEmptyPageOption(productName: string): Promise<void> {
    await expect(this.hereLinkProduct).toBeVisible();
    await this.hereLinkProduct.click();
    await expect(this.page).toHaveURL(URLs.productPage);
    await expect(this.productSearchBar).toBeVisible();
    await this.productSearchBar.click();
    const delay = 5000 / productName.length;
    await this.page.keyboard.type(productName, { delay });
    // await this.productSearchBar.fill(productName);
    await this.productsearchButton.click();
    // await expect(this.targetCardViewProduct).toBeVisible();
    const viewProductButton = this.viewProductFor(productName);
    await expect(viewProductButton).toBeVisible();
    // await viewProductButton.click();
    await this.addToCartButton.nth(1).click();
    await this.continueShopping.click();
    await this.Cart.click();
  }
  async addProductUsingProductOption(str: string): Promise<void> {}
}
