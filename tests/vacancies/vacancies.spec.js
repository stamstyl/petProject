import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/home.page";
import { VacancyPage } from "../../page_objects/vacancy.page";

test("Find a QA/Automation vacancy and fill it with random data", async ({ page }) => {
  const { faker } = await import("@faker-js/faker");
  const homePage = new HomePage(page);
  const vacancyPage = new VacancyPage(page);

  const name = faker.person.fullName();
  const email = faker.internet.email();
  let randomDigits = "";
  const input = await vacancyPage.uploadCV;

  for (let i = 0; i < 7; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }

  await page.goto("/envida-kiest-voor-ysis-2/");
  await homePage.qaJobApply();

  await expect(vacancyPage.vacancyTitle).toContainText("Test");

  await vacancyPage.fullName.fill(name);
  await vacancyPage.emailAddress.fill(email);
  await vacancyPage.selectCountry("Greece");
  await vacancyPage.getNumber(randomDigits);
  await input.setInputFiles("blank.pdf");
});
