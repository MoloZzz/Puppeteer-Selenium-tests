const PuppeteerService = require('./puppeteer/puppeteer-service.js');
const QuoteScraper = require('./quote-scraper/quote-scraper');

function main() {
    const puppeteerService = new PuppeteerService();
    const scraper = new QuoteScraper('https://quotes.toscrape.com', puppeteerService);
    
    scraper.run();
    
}

main();