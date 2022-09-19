import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains navbar branding", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".navbar-brand");
    const text = await page.$eval(".navbar-brand", (e) => e.textContent);
    expect(text).toContain("Pokemon Application");
  });

  afterAll(() => browser.close());
});
