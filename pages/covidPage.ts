import { Locator, Page, expect } from "@playwright/test";
import { URLs } from "../constants/covid";

export class covidPage {
  private readonly lineChartTab: Locator;

  constructor(private readonly page: Page) {
    this.lineChartTab = page.getByRole("tab", { name: "Line" });
  }
  async clicklineChartTab(): Promise<void> {
    await expect(this.lineChartTab).toBeVisible();
    await this.lineChartTab.click();
    await expect(this.page).toHaveURL(URLs.lineChartTabClicked);
  }
}
