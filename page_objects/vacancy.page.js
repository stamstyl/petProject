import {tryScrollIntoView,fallbackClickByText} from "../helper_methods/scroll"

export class VacancyPage {
  constructor(page) {
    this.page = page;
    this.vacancyTitle = page.locator("h1");
    this.fullName = page.locator('[placeholder="Full name"]');
    this.emailAddress = page.getByRole("textbox", { name: "Email address" });
    this.countryCallingCode = page.getByRole("button", {name: "Select country calling code:"});
    this.phoneNumber = page.locator('[type="tel"]');
    this.uploadCV = page.locator('[name="candidate.cv"]');
    this.sendButton = page.locator('[data-testid="submit-application-form-button"]');
    this.fullNameFieldRequired = page.locator('[placeholder="Full name"] + [role="alert"]');
    this.emailAddressFieldRequired = page.locator('[placeholder="Your email address"] + [role="alert"]');
    this.phoneNumberFieldRequired = page.locator('[id="input-candidate.phone-6-error"]');
    this.uploadCVFieldRequired = page.locator('[id="input-candidate.cv-10-error"]');
  }

  async selectCountry(countryName) {
    await this.openDropdown();
    const optionLocator = this.page.getByRole("option", { name: countryName });
    const container = await this.getContainer();

    const isFound = await tryScrollIntoView(this.page, optionLocator, container, countryName);
    if (isFound) {
      await optionLocator.click();
    } else {
      await fallbackClickByText(this.page, countryName);
    }
  }

  async openDropdown() {
    await this.countryCallingCode.click();
  }

  async getContainer() {
    return this.page.locator("div.sc-1hkfaog-1");
  }

  async getNumber(number) {
    await this.phoneNumber.click();
    await this.phoneNumber.press("End");
    await this.phoneNumber.type("697" + number);
  }
}
