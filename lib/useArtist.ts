import { useState } from "react";
import { By, Builder, Browser } from 'selenium-webdriver'
import assert from "assert";
import { Options } from "selenium-webdriver/chrome";
// runs a seleneiumIDE script to scrape and get info about artist (monthly listener and posted biography)
// not provided by API and returns it in a react state for carousel element


async function firstTest(link: string) {
  let driver;
  
  try {
    const options = new Options();
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options.addArguments('--headless=new'))
      .build();
    await driver.get(link);
  
    await driver.manage().setTimeouts({implicit: 500});
  
    // activate text box
    let textBox = await driver.findElement(By.className('M0yriEHOsE9ET707IXzC'));
    textBox.click()

    // get div with all <p> children
    let textDiv = await driver.findElement(By.className("Text__TextElement-sc-if376j-0"))
  
    // get children
    let children = await textDiv.findElements(By.className("Type__TypeElement-sc-goli3j-0"))

    // combine all p
    let bio = children.map((child) => child.getText()).join(' ')

    return bio
  } catch (e) {
    console.log(e)
    return ""
  } finally {
    await driver?.quit();
  }
}

export default function useArtist(link: string) {
  let data;
  firstTest(link).then((v) => {
    data = v
  });
  return data;
}