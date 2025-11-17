import { Locator, Page, expect } from "@playwright/test";
import { expectedSeleniumItems } from "../constants/techlisticSeleniumItems";

export class techlistic {
  private readonly navBarSelenium: Locator;
  private readonly seleniumItemsList: Locator;

  constructor(private readonly page: Page) {
    this.navBarSelenium = page.getByRole("link", { name: "Selenium" }).first();
    this.seleniumItemsList = page.locator(
      'li.overflowable-item:has(a.dropbtn:text("Selenium")) .dropdown-content a'
    );
  }

  async VerifyVisibilityOfSelenium(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.navBarSelenium).toBeVisible();
    await this.navBarSelenium.hover();
  }

  async extractAndPrintItems(): Promise<string[]> {
    await expect(this.seleniumItemsList.first()).toBeVisible();
    const items = await this.seleniumItemsList.allInnerTexts();
    console.log("Dropdown items:", items);
    return items;
  }
  async assertSeleniumItems(items: string[]): Promise<void> {
    await expect(items.length).toBeGreaterThan(0);
    for (const expected of expectedSeleniumItems)
      expect(items).toContain(expected);
  }
}
