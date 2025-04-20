class QuoteScraper {
    /**
     * @param {string} url
     * @param {PuppeteerService} puppeteerService
     */
    constructor(url, puppeteerService) {
      this.url = url;
      this.puppeteer = puppeteerService;
    }
  
    async scrapeQuotes() {
      await this.puppeteer.init();
      await this.puppeteer.goTo(this.url);
  
      const quotes = await this.puppeteer.evaluate(() => {
        const quoteElements = document.querySelectorAll('.quote');
        return Array.from(quoteElements).map(quote => {
          const text = quote.querySelector('.text')?.innerText;
          const author = quote.querySelector('.author')?.innerText;
      
          const tagElements = quote.querySelectorAll('.tags .tag');
          const tags = Array.from(tagElements).map(tag => tag.innerText);
      
          return { text, author, tags };
        });
      });
  
      await this.puppeteer.close();
      return quotes;
    }
  
    async run() {
      try {
        const quotes = await this.scrapeQuotes();
        console.log(`Знайдено цитат: ${quotes.length}`);
        quotes.forEach((q, i) => {
          console.log(`${i + 1}. "${q.text}" — ${q.author}, Tags: ${q.tags.join(', ')}`);
        });
      } catch (error) {
        console.error('Помилка:', error.message);
        await this.puppeteer.close();
      }
    }
  }
  
  module.exports = QuoteScraper;
  