/**
 * @jest-environment puppeteer
 */
 import 'expect-puppeteer';

 beforeEach(async () => {
   await page.goto('https://3000-michaelcwal-frontendcha-srrlm59yudr.ws-eu77.gitpod.io/');
 });
 
 describe('test contentscript.js elements', () => {
   jest.setTimeout(20000);
 
   test('if element is reading the budget number correctly', async () => {
    await page.goto('https://3000-michaelcwal-frontendcha-srrlm59yudr.ws-eu77.gitpod.io/dashboard')
    const elementText = await page.$eval(".injectedElement", el => el.innerHTML);
    expect(elementText === "Budget-to-Beat:  351 €");  
   });

   test('dropdown element is hidden on load', async () => {
    await page.goto('http://localhost:3000/extension')
    const elementStlyes = await page.$eval(".injectedElement", 
      el => getComputedStyle(el).getPropertyValue('display')); 
      expect(elementStlyes === "hidden") 
   });

 });



//  beforeEach(async () => {
//     await page.goto('http://localhost:3000//');
//   });
  
//   describe('test contentscript.js elements', () => {
//     jest.setTimeout(20000);
  
//     test('if it does something', async () => {
//      await page.goto('http://localhost:3000/')
//      const elementText = await page.$eval(".injectedElement", el => el.innerHTML);
//      expect(elementText === "Budget-to-Beat:  351 €");  
//     });
//   });

