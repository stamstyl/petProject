export class HomePage {
  constructor(page) {
    this.page = page;
    this.goToVacanciesPage = page.getByRole("link", { name: "vacancies" });
    this.qaJobs = page.getByRole("link", {
      name: "Software Test Engineer (Junior/Medior)",
    });
    this.applyButton = page.locator('[data-testid="header-tab-apply-button"]');
  }

  async goToJobVacanciesPage() {
    await this.goToVacanciesPage.waitFor({ state: "visible" });
    await this.goToVacanciesPage.click();
    await this.goToFindSpecificQaJobPage();
  }
  async goToFindSpecificQaJobPage() {
    await this.page.waitForLoadState();
    await this.qaJobs.waitFor({ state: "visible" });
    await this.qaJobs.click();
    await this.goToapplyForQaJobVacancyPage();
  }
  async goToapplyForQaJobVacancyPage() {
    await this.page.waitForLoadState();
    await this.applyButton.waitFor({ state: "visible" });
    await this.applyButton.click();
  }
}
