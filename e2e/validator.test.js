import puppeteer from "puppeteer";

jest.setTimeout(30000);

describe("credit card validator", () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });
  test("Form should render on page", async () => {
    await page.goto("http://localhost:8000");
    await page.waitForSelector(".form-validator");
  });

  test("verification of a valid visa card", async () => {
    await page.goto("http://localhost:8000");

    const form = await page.$(".form-validator");
    const input = await form.$(".form-input");
    const btn = await form.$(".btn-form");

    await input.type("4556206846693847");
    await btn.click();

    await page.waitForSelector(".inactive-card");
  });

  test("verification of a invalid visa card", async () => {
    await page.goto("http://localhost:8000");

    const form = await page.$(".form-validator");
    const input = await form.$(".form-input");
    const btn = await form.$(".btn-form");

    await input.type("fofofofo");
    await btn.click();

    await page.waitForSelector(".tooltip-active");
  });

  afterEach(async () => {
    await browser.close();
  });
});
