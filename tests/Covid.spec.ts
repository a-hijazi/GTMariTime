import { test } from "@playwright/test";
import { covidPage } from "../pages/covidPage";
// import { automationExercisePage } from "../pages/automationExercisePage";
import { URLs } from "../constants/covid";

test.describe("GTMariTime - Covid Line Chart - UK country", () => {
  let covid: covidPage;

  test.beforeEach(async ({ page }) => {
    covid = new covidPage(page);
    await page.goto(URLs.covidURL);
  });

  test("Check Covid LineChart for UK only", async () => {
    await covid.clicklineChartTab();
  });
});
