import puppeteer from 'puppeteer';

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});
	const page = await browser.newPage();
	const context = await browser.defaultBrowserContext()
	  context.overridePermissions('https://webmobinfo.kredily.com', ['notifications', 'camera', 'geolocation'])
	
	await page.goto('https://app.kredily.com/login/');
	console.log("Initiating session")
	// other actions...
	await page.waitForSelector('#signInFormEmailAddress')
	await page.type('#signInFormEmailAddress', '');
	await page.type('#signInFormPassword', '');
	await page.click('#signinSubmitBtn')
	await page.waitForNavigation();
	console.log("Session captured successfully")
	console.log("Hacking into matrix now....")
	await page.setRequestInterception(true)
	page.on('request', (request) => {
		if (request.url().includes('https://getnada003.kredily.com')) {
			request.continue()
		}
	})

	page.on('response', async (response) => {
		if(response.url().includes('clockOut/')){
			if(response.status() >= 200 && response.status() < 300){
				console.log("Clockout successful")
				await page.setRequestInterception(false)
				await browser.close();
			} else {
				console.log("Clockout was not success please try again")
				await page.setRequestInterception(false)
				await browser.close();
			}
		}
		
		if(response.url().includes('clockIn/')){
			if(response.status() >= 200 && response.status() < 300){
				console.log("ClockIn successful")
				await page.setRequestInterception(false)
				await browser.close();
			} else {
				console.log("ClockIn was not success please try again")
				await page.setRequestInterception(false)
				await browser.close();
			}
		}
	})
	await page.evaluate("clockInAction(document.querySelector('.clockInBtn'))")
})();