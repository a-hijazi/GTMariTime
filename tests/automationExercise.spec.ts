import { test, expect } from "@playwright/test";
import { automationExercisePage } from "../pages/automationExercisePage";
import {
  requiredProducts,
  URLs,
  emptyMessage,
} from "../constants/automationExercise";
// import { beforeEach } from 'node:test';

test.describe("MariTime - AutomationExercise", () => {
  let autoEx: automationExercisePage;

  test.beforeEach(async ({ page }) => {
    autoEx = new automationExercisePage(page);
    await page.goto("https://automationexercise.com/");
  });

  test("Add 3 product and checkout", async ({ page }) => {
    await autoEx.clickCart();
    await autoEx.verifyTheCartIsEmpty();
    await autoEx.addProductUsingEmptyPageOption(requiredProducts[0]);
    await autoEx.addProductUsingProductPageOption(requiredProducts[1]);
    // await tl.VerifyVisibilityOfSelenium();
    // const items = await tl.extractAndPrintItems();
    // await tl.assertSeleniumItems(items);
  });
});
