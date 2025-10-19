export async function tryScrollIntoView(page, optionLocator, container, countryName) {
    for (let i = 0; i < 50; i++) {
      if (await optionLocator.isVisible()) return true;
        if (countryName.localeCompare("Netherlands") < 0) {
      await container.evaluate((el) => {
        el.scrollBy(0, -200); 
      });
    }else{
        await container.evaluate((el) => {
        el.scrollBy(0, 200); 
      });
      }
      await page.waitForTimeout(100);
    }
    return await optionLocator.isVisible();
  }

  export async function fallbackClickByText(page, countryName) {
    await page.evaluate((text) => {
      const option = Array.from(
        document.querySelectorAll('[role="option"], li')
      ).find((el) => (el.textContent || "").trim().includes(text));
      option?.click();
    }, countryName);
  }