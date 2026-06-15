const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/workspace/resume-website/screenshot-home.png', fullPage: true });
  console.log('Screenshot saved!');
  await browser.close();
})();
