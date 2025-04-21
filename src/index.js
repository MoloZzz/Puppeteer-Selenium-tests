const PuppeteerService = require('./puppeteer/puppeteer-service.js');
const QuoteScraper = require('./quote-scraper/quote-scraper');
const DjinniScraper = require('./djinni/djinni-scrapper.js');

function main() {
    const puppeteerServiceForQuoteScraper = new PuppeteerService();
    const puppeteerServiceForDjinniScraper = new PuppeteerService();
    const scraper = new QuoteScraper('https://quotes.toscrape.com', puppeteerServiceForQuoteScraper);
    const djinniScraper = new DjinniScraper('https://djinni.co/jobs/?primary_keyword=Node.js', puppeteerServiceForDjinniScraper);

    scraper.run();
    djinniScraper.run();
}

main();