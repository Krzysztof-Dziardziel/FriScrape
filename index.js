const puppeteer = require('puppeteer');

/***********************
 * USER FRIENDLY AREA: *
 ***********************/
const email = 'email';
const pass = 'pass';


async function click(btn) {
    if (btn) {
        await btn.click();
        console.log('Clicked ' + btn);
    } else {
        console.log('Missing ' + btn);
    }
}
async function login() {
    const popup = '.fixed-popup-wrapper';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.frisco.pl');
    await page.waitForSelector(popup);
    await page.click(popup);

    const [loginBtn] = await page.$x('//*[@id="header"]/div/div[1]/div/div[3]/div/a[1]');
    click(loginBtn);
    await page.waitFor('input[name=username]');
    await page.focus('input[name=username]');
    await page.keyboard.type(rmail);
    await page.focus('#loginPassword');
    await page.keyboard.type(pass);
    const [loginConfirm] = await page.$x('//*[@id="container"]/div/div[2]/div/div[2]/div/form/section/input');
    await click(loginConfirm);
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    const [closeBtn] = await page.$x('//*[@id="wrapper"]/div[1]/div[2]/a');
    await click(closeBtn);

    while (1) {
        const date = await page.$('.date');
        if (page.evaluate(el => el.textContent, date)) {
            const dateTxt = await page.evaluate(el => el.textContent, date);
        }
        console.log(dateTxt);
        await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    }
}
login();
