const puppeteer = require('puppeteer');

class PuppeteerService {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async goTo(url) {
    if (!this.page) throw new Error('Page not initialized');
    await this.page.goto(url);
  }

  async evaluate(fn) {
    if (!this.page) throw new Error('Page not initialized');
    return await this.page.evaluate(fn);
  }

  async close() {
    await this.browser?.close();
  }

  getPage() {
    return this.page;
  }
}

module.exports = PuppeteerService;
