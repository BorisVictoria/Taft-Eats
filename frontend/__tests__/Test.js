import { Builder, By, Key, until } from '../node_modules/selenium-webdriver/index.js';

const link = 'https://taft-eats.onrender.com/';

(async function searchfound() {
    let browser = await new Builder().forBrowser('chrome').build();

    try {
        // Open a webpage
        await browser.get(link);


        /*testing search*/ 
        const search = await browser.findElement(By.name('search'));
        const inputText = 'taco';
        var rightOutput = true;
        await search.sendKeys(inputText);

        await search.sendKeys(Key.RETURN);

        await browser.wait(until.elementLocated(By.css('.bg-white.shadow-md')), 50000);
        await browser.sleep(5000); 
        
        let tableRows = await browser.findElements(By.css('.bg-white.shadow-md tbody tr'));
        
      
        if (tableRows.length > 0) {
            console.log(`Found ${tableRows.length} results.`);
            
            for (let row of tableRows) {
                let name = await row.findElement(By.css('td:nth-child(1)')).getText();
                let cuisine = await row.findElement(By.css('td:nth-child(2)')).getText();
                let rating = await row.findElement(By.css('td:nth-child(3)')).getText();
                let avgPrice = await row.findElement(By.css('td:nth-child(4)')).getText();

                if (name.toLowerCase().includes(inputText)==false) 
                    rightOutput=false;
                
                console.log(`Name: ${name}, Cuisine: ${cuisine}, Rating: ${rating}, Avg Price: ${avgPrice}`);
            }

            if(rightOutput){
                console.log("All search queries contain " + inputText + '.');
            }else {console.log("Search query went wrong!")}
        } 


        const inputTextnotFound = 'fhsgwoifjwoeifjsdoifj';
        var rightOutput = true;
        await search.sendKeys(inputTextnotFound);

        await search.sendKeys(Key.RETURN);

        await browser.wait(until.elementLocated(By.css('.bg-white.shadow-md')), 50000);
        await browser.sleep(5000); 
        if (tableRows.length > 0) {
            console.log(`Found ${tableRows.length} results.`);
            
            
            TODO //change error message with actual error message, locate the right div 
            let errormsg = await browser.findElements(By.css('.bg-white.shadow-md tbody tr'));
            let msg = await errormsg.findElement(By.css('td:nth-child(1)')).getText();
            if (msg.toLowerCase().includes("actual error msg")==false) 
                    console.log("Error message is wrong!");
            else {
                console.log('No results found in the table. Error message displayed');
            }
        }

        
    } catch (err) {
        console.error("Error occurred:", err);
    } finally {
        // Quit the browser
        await browser.quit();
    }
})();
