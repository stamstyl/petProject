export class HomePage {
  constructor(page) {
    this.page = page;
    this.goToVacanciesPage = page.locator('[class="texts"] [href="http://Gerimedica.recruitee.com"]');
    this.qaJobs = page.locator('[class*="sc-6exb5d-3"] [href="/o/software-test-engineer-juniormedior"]');
    this.applyButton = page.getByRole('tab' , { name: 'Apply' } );
  }

  async qaJobApply() {
    await this.goToVacanciesPage.click();
    await this.qaJobs.click(); 
    await this.applyButton.click();
  }
}