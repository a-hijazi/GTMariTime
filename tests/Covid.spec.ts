import { test, expect } from "@playwright/test";
import { CovidPage } from "../pages/covidPage";
import * as covidConstants from "../constants/covid";

test.describe("Covid Explorer - Line Chart - UK", () => {
  let covid: CovidPage;

  test.beforeEach(async ({ page }) => {
    covid = new CovidPage(page);
    await page.goto("https://ourworldindata.org/explorers/covid");
  });

  test("Select UK only and log chart tooltips", async () => {
    await covid.goToLineChart();
    await covid.clearCountries();
    await covid.searchAndSelectCountry(covidConstants.country);

    await covid.waitForChartPoints();
    const tooltips = await covid.extractTooltips();

    // Optional: assertion
    expect(tooltips.length).toBeGreaterThan(0);
    expect(
      tooltips.some((t) => t.includes(covidConstants.country))
    ).toBeTruthy();
  });
});
