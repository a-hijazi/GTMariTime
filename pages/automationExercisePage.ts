import { Locator, Page, expect } from "@playwright/test";
import {
  requiredProducts,
  viewCartURL,
  emptyMessage,
} from "../constants/automationExercise";

export class automationExercisePage {
  private readonly Cart: Locator;
  private readonly emptyCartMessage: Locator;
  // private readonly

  constructor(private readonly page: Page) {
    this.Cart = page.getByRole("link", { name: "Cart" });
    this.emptyCartMessage = page.locator("#empty_cart p.text-center");
    // this.EmptyCart = page.locator('.table-responsive.cart_info]');
  }

  async clickCart(): Promise<void> {
    await expect(this.Cart).toBeVisible();
    await this.Cart.click();
    await expect(this.page).toHaveURL(viewCartURL);
  }
  async verifyTheCartIsEmpty(): Promise<void> {
    const message = this.emptyCartMessage;
    await expect(message).toBeVisible();

    // 2. Verify text "Cart is empty!"
    const emptyText = await message.locator("b").innerText();
    expect(emptyText).toBe(emptyMessage);
  }
}
