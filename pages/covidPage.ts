import { Locator, Page, expect } from "@playwright/test";
import * as covidConstants from "../constants/covid";

export class CovidPage {
  private readonly lineTab: Locator;
  private readonly clearSelectionBtn: Locator;
  private readonly emptyMapMessage: Locator;
  private readonly countrySearchInput: Locator;

  constructor(private readonly page: Page) {
    this.lineTab = page.getByRole("tab", { name: "Line" });
    this.clearSelectionBtn = page.getByText("Clear selection");
    this.emptyMapMessage = page.locator("#no-data-message");
    this.countrySearchInput = page.getByPlaceholder(
      "Type to add a country or region..."
    );
  }

  async goToLineChart(): Promise<void> {
    await expect(this.lineTab).toBeVisible();
    await this.lineTab.click();
  }

  async clearCountries(): Promise<void> {
    await expect(this.clearSelectionBtn).toBeVisible();
    await this.clearSelectionBtn.click();
    await this.clearSelectionBtn.click();

    await expect(this.emptyMapMessage).toBeVisible();
    const text = await this.emptyMapMessage.textContent();
    expect(text).toBe(covidConstants.messages.emptyMapMessage);
  }

  async searchAndSelectCountry(country: string): Promise<void> {
    await expect(this.countrySearchInput).toBeVisible();
    await this.countrySearchInput.click();
    await this.countrySearchInput.fill(country);
    await this.page.keyboard.press("Enter");

    // Wait for the option to appear (with <mark> or label)
    // const countryOption = this.page.locator("label.EntityPickerOption", {
    //   hasText: country,
    // });
    // await expect(countryOption).toBeVisible();
    // await countryOption.click();

    // Validate checkbox is checked
    // const checkbox = countryOption.locator('input[type="checkbox"]');
    // await expect(checkbox).toBeChecked();
  }

  async waitForChartPoints(): Promise<void> {
    // adjust the selector depending on actual DOM
    await this.page.waitForSelector("svg g.points circle", { timeout: 10_000 });
  }

  async extractTooltips(): Promise<string[]> {
    const points = this.page.locator("svg g.points circle");
    const count = await points.count();
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
      const point = points.nth(i);
      await point.hover();

      // Tooltip DOM / selector needs to be verified
      const tooltip = this.page.locator(
        ".Popover__Content, .Tooltip, .chart-tooltip"
      );
      await expect(tooltip).toBeVisible({ timeout: 2000 });

      const text = await tooltip.innerText();
      console.log(`Point ${i + 1}: ${text}`);
      result.push(text);
    }

    return result;
  }
}
