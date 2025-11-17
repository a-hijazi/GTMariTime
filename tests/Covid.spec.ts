import { test } from "@playwright/test";
import { CovidPage } from "../pages/covidPage";
import { LIMITS } from "../constants/covid";

test("Extract tooltip values for United Kingdom", async ({ page }) => {
  test.setTimeout(240000);
  const covid = new CovidPage(page);

  await covid.goto();
  await covid.selectIndicator();
  await covid.switchToLineChart();
  await covid.clearSelection();
  await covid.selectUK();
  await covid.playTimelapse();

  const circles = await covid.getUKCircles();
  const total = await circles.count();
  const extractLimit = Math.min(total, LIMITS.tooltipPoints);

  console.log(`Found ${total} circles. Extracting first ${extractLimit}...`);

  for (let i = 0; i < extractLimit; i++) {
    const tooltipText = await covid.extractTooltip(i, circles);
    console.log(`Circle ${i + 1} → ${tooltipText}`);
  }
});
