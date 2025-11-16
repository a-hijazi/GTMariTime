import { test } from "@playwright/test";
import { automationExercisePage } from "../pages/automationExercisePage";
import { requiredProducts } from "../constants/automationExercise";

test.describe("GTMariTime - AutomationExercise", () => {
  let autoEx: automationExercisePage;

  test.beforeEach(async ({ page }) => {
    autoEx = new automationExercisePage(page);
    await page.goto("https://automationexercise.com/");
  });

  test("Add 3 products and checkout", async () => {
    await autoEx.clickCart();
    await autoEx.verifyTheCartIsEmpty();

    for (const [index, product] of requiredProducts.entries()) {
      await autoEx.addProduct(product, index === 0);
    }

    await autoEx.clickCart();
    await autoEx.checkOutProducts();
  });
});
