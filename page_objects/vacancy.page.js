export class VacancyPage {
  constructor(page) {
    this.page = page;
    this.vacancyTitle = page.locator("h1");
    this.fullName = page.getByRole("textbox", { name: "Full name" });
    this.emailAddress = page.getByRole("textbox", { name: "Email address" });
    this.countryCallingCode = page.getByRole("button", {
      name: "Select country calling code:",
    });
    this.phoneNumber = page.locator('[type="tel"]');
    this.uploadCV = page.locator('[name="candidate.cv"]');
  }

  async selectCountry(countryName) {
    await this.countryCallingCode.click();

    const optionLocator = this.page.getByRole("option", { name: countryName });
    const container = this.page.locator("div.sc-1hkfaog-1");

    for (let i = 0; i < 50; i++) {
      if (countryName.localeCompare("Netherlands") < 0) {
        if (await optionLocator.isVisible()) break;
        await this.page.evaluate((el) => {
          el.scrollBy(0, -280);
        }, await container.elementHandle());
        await this.page.waitForTimeout(100);
      } else {
        if (await optionLocator.isVisible()) break;
        await this.page.evaluate((el) => {
          el.scrollBy(0, 280);
        }, await container.elementHandle());
        await this.page.waitForTimeout(100);
      }
    }
    if (await optionLocator.isVisible()) {
      await optionLocator.click();
    } else {
      await this.page.evaluate((text) => {
        const opt = Array.from(
          document.querySelectorAll('[role="option"], li')
        ).find((o) => (o.textContent || "").trim().includes(text));
        opt?.click();
      }, countryName);
    }
  }
  
  async getNumber(number) {
    await this.phoneNumber.click();
    await this.phoneNumber.press("End");
    await this.phoneNumber.type("697" + number);
  }
}
