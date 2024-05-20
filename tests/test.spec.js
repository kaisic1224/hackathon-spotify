import { By, Builder, Browser } from 'selenium-webdriver'
// const {By, Builder, Browser} = require("selenium-webdriver");
// runs a seleneiumIDE script to scrape and get info about artist (monthly listener and posted biography)
// not provided by API and returns it in a react state for carousel element


(async function firstTest(link = "https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GOU") {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.get(link);
  
    await driver.manage().setTimeouts({implicit: 500});
  
    // activate text box
    let textBox = await driver.findElement(By.className('jW4eWdr_LUeOXwPpKhWG'));
    textBox.click()

    // get div with all <p> children
    // let textDiv = await driver.findElement(By.className("Text__TextElement-sc-if376j-0"))
  
    // get children
    let children = await driver.findElements(By.className("Type__TypeElement-sc-goli3j-0"))

    // combine all p
    let bio = children.map((child) => child.getText()).join(' ')

    return bio
  } catch (e) {
    console.log(e)
    return ""
  } finally {
    await driver?.quit();
  }
})()