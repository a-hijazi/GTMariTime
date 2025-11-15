import { test, expect } from "@playwright/test";
import { techlistic } from "../pages/techlistic";
import { beforeEach } from "node:test";

test.describe("MariTime - Techlistic", () => {
  let tl: techlistic;

  test.beforeEach(async ({ page }) => {
    tl = new techlistic(page);
    await page.goto("https://www.techlistic.com/");
  });
  //test
  test("Extract all Items from Selenium dropdown list", async ({ page }) => {
    await tl.VerifyVisibilityOfSelenium();
    const items = await tl.extractAndPrintItems();
    await tl.assertSeleniumItems(items);
  });
});
