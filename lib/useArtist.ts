import { useState } from "react";
import { By, Builder, Browser } from 'selenium-webdriver'
import assert from "assert";
// runs a seleneiumIDE script to scrape and get info about artist (monthly listener and posted biography)
// not provided by API and returns it in a react state for carousel element


async function firstTest(link: string) {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.get(link);
  
    let title = await driver.getTitle();
    assert.equal("Web form", title);
  
    await driver.manage().setTimeouts({implicit: 500});
  
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await textBox.sendKeys('Selenium');
    await submitButton.click();
  
    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    await driver?.quit();
  }
}

export default function useArtist(link: string) {
    const [data, setData] = useState(null);
    return data;
}