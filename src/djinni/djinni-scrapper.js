class DjinniScraper {
    /**
     * @param {string} url
     * @param {PuppeteerService} puppeteerService
     */
    constructor(url, puppeteerService) {
      this.url = url;
      this.puppeteer = puppeteerService;
    }
  
    async scrapeJobs() {
      await this.puppeteer.init();
      await this.puppeteer.goTo(this.url);
  
      const jobs = await this.puppeteer.evaluate(() => {
        const jobCards = document.querySelectorAll('li[id^="job-item-"]');
      
        return Array.from(jobCards).slice(0, 10).map(card => {
          const title = card.querySelector('h2 a')?.innerText.trim();
          const link = 'https://djinni.co' + card.querySelector('h2 a')?.getAttribute('href');
      
          const company = card.querySelector('a[data-analytics="company_page"]')?.innerText.trim();
          const location = card.querySelector('.location-text')?.innerText.trim();
          const remote = card.innerText.includes('віддалено') ? 'Тільки віддалено' : 'Офіс';
      
          const experience = Array.from(card.querySelectorAll('span.text-nowrap'))
            .find(span => span.innerText.includes('досвіду'))?.innerText.trim();
      
          const english = Array.from(card.querySelectorAll('span.text-nowrap'))
            .find(span => span.innerText.includes('Intermediate'))?.innerText.trim();
      
          const date = Array.from(card.querySelectorAll('span.text-nowrap'))
            .find(span => /\d+[гмд]/.test(span.innerText))?.innerText.trim();
      
          const description = card.querySelector('.js-truncated-text')?.innerText.trim();
      
          return { title, company, location, remote, experience, english, date, description, link };
        });
      });
      
  
      await this.puppeteer.close();
      return jobs;
    }
  
    async run() {
        try {
          const jobs = await this.scrapeJobs();
          console.log(`🔎 Знайдено вакансій: ${jobs.length}`);
      
          jobs.forEach((job, i) => {
            console.log(`\n${i + 1}. ${job.title}`);
            console.log(`   🏢 Компанія: ${job.company}`);
            console.log(`   📍 Локація: ${job.location}`);
            console.log(`   💻 Формат: ${job.remote}`);
            console.log(`   📅 Досвід: ${job.experience || 'Не вказано'}`);
            console.log(`   🌐 Англійська: ${job.english || 'Не вказано'}`);
            console.log(`   🕒 Опубліковано: ${job.date}`);
            console.log(`   🔗 Посилання: ${job.link}`);
            console.log(`   📝 Опис: ${job.description?.slice(0, 200)}...`);
          });
      
        } catch (error) {
          console.error('❌ Помилка при парсингу Djinni:', error.message);
        } finally {
          await this.puppeteer.close();
        }
      }
      
  }
  
  module.exports = DjinniScraper;
  