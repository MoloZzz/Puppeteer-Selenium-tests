const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');

  const quotes = await page.evaluate(() => {
    const quoteElements = document.querySelectorAll('.quote');
    return Array.from(quoteElements).map(quote => {
      const text = quote.querySelector('.text')?.innerText;
      const author = quote.querySelector('.author')?.innerText;
      return { text, author };
    });
  });

  console.log('Знайдено цитат:', quotes.length);
  quotes.forEach((q, i) => {
    console.log(`${i + 1}. "${q.text}" — ${q.author}`);
  });

  await browser.close();
})();
