import { Page, expect } from "@playwright/test";
import { COVID_URL, SELECTORS, COUNTRIES, LIMITS } from "../constants/covid";

export class CovidPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(COVID_URL);
  }

  async selectIndicator() {
    await this.page
      .getByRole("button", { name: SELECTORS.indicatorButton })
      .click();
    await this.page
      .getByRole("option", {
        name: SELECTORS.indicatorOptionConfirmed,
        exact: true,
      })
      .click();
  }

  async switchToLineChart() {
    await this.page.getByRole("tab", { name: SELECTORS.tabLineChart }).click();
  }

  async clearSelection() {
    await this.page.getByText(SELECTORS.clearSelection).click();
    await this.page.getByText(SELECTORS.clearSelection).click();
  }

  async selectUK() {
    const input = this.page.getByRole("textbox", {
      name: SELECTORS.countryInputLabel,
    });
    await input.click();
    await input.fill(COUNTRIES.uk);
    await input.press("Enter");
  }

  async playTimelapse() {
    await this.page.getByText(SELECTORS.playButton).click();
    await this.page.waitForTimeout(LIMITS.waitingSlider);
    await this.page.getByText(SELECTORS.pauseButton).click();
  }

  async getUKCircles() {
    const circles = this.page.locator("g#datapoints__United-Kingdom circle");
    await circles.first().waitFor();
    return circles;
  }

  async extractTooltip(
    circleIndex: number,
    circlesLocator: ReturnType<Page["locator"]>
  ) {
    const c = circlesLocator.nth(circleIndex);
    await c.hover();

    const tooltip = this.page.locator(SELECTORS.tooltipRoot);
    await expect(tooltip).toBeVisible();

    const title =
      (await tooltip.locator(SELECTORS.tooltipTitle).textContent())?.trim() ??
      "";
    const subtitle =
      (
        await tooltip.locator(SELECTORS.tooltipSubtitle).textContent()
      )?.trim() ?? "";
    const seriesName =
      (
        await tooltip.locator(SELECTORS.tooltipSeriesName).textContent()
      )?.trim() ?? "";
    const seriesValue =
      (
        await tooltip.locator(SELECTORS.tooltipSeriesValue).textContent()
      )?.trim() ?? "";

    return `${title} | ${subtitle} | ${seriesName} | ${seriesValue}`;
  }
}
