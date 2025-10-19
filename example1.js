await page.goto('https://example-async-app.com');
await page.getByRole('button', { name: 'Start' }).click();
await page.waitForSelector('text=Continue'); // waits dynamically
await page.getByRole('button', { name: 'Continue' }).click();


// What’s the difference between waitForSelector() and locator.waitFor()?
// How do you avoid race conditions?