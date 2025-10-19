import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/home.page";
import { VacancyPage } from "../../page_objects/vacancy.page";
import { faker } from '@faker-js/faker';

let homePage, vacancyPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  vacancyPage = new VacancyPage(page);

  await page.goto("/envida-kiest-voor-ysis-2/");
  await homePage.goToJobVacanciesPage();

  await expect(vacancyPage.vacancyTitle).toContainText("Test");
});

test("Find a QA/Automation vacancy and fill it with random data", async ({page,}) => {

  const name = faker.person.fullName();
  const email = faker.internet.email();
  let randomDigits = "";
  const input = await vacancyPage.uploadCV;

  for (let i = 0; i < 7; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }
  await page.waitForLoadState();
  await vacancyPage.fullName.waitFor({ state: "visible" });
  await vacancyPage.fullName.fill(name);
  await vacancyPage.emailAddress.fill(email);
  await vacancyPage.selectCountry("Greece");
  await vacancyPage.getNumber(randomDigits);
  await input.setInputFiles("blank.pdf");
});

test("Find a QA/Automation and Apply with empty fields", async ({page}) => {
  const errorMessage = "This field is required and can not be left empty.";

  await page.waitForLoadState();
  await vacancyPage.sendButton.waitFor({ state: "attached" });
  await vacancyPage.sendButton.click();

  await expect(vacancyPage.fullNameFieldRequired).toHaveText(errorMessage);
  await expect(vacancyPage.emailAddressFieldRequired).toHaveText(errorMessage);
  await expect(vacancyPage.phoneNumberFieldRequired).toHaveText(errorMessage);
  await expect(vacancyPage.uploadCVFieldRequired).toHaveText(errorMessage);
});
