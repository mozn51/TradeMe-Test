import { ChainablePromiseElement } from 'webdriverio';
import Logger from '../utils/logger';

export default class BasePage {
  /**
   * Navigates the browser to a specified URL.
   * Logs the URL being navigated to and confirms success or logs an error if navigation fails.
   *
   * @param url - The URL to navigate to.
   * @throws Will log an error if navigation to the URL fails.
   */
  public async openUrl(url: string): Promise<void> {
    try {
      Logger.info(`Attempting to navigate to ${url}.`);
      await browser.url(url);

      // Wait until the document is fully loaded
      await browser.waitUntil(
        async () =>
          await browser.execute(() => document.readyState === 'complete'),
        {
          timeout: 20000, // Adjust based on typical page load times
          timeoutMsg: `Page did not fully load within the allotted time for URL: ${url}`,
        }
      );

      Logger.info(`Successfully navigated to ${url}.`);
    } catch (error: any) {
      Logger.error(`Error navigating to ${url}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validates whether a specific page is loaded by checking the display status of a key element.
   * Logs the check action and provides the result.
   *
   * @param pageElement - The WebdriverIO element expected to be displayed when the page is loaded.
   * @param pageName - The name of the page, used in logging.
   * @returns A boolean indicating whether the page is loaded (true) or not (false).
   * @throws Will log an error and return false if there’s an issue during the check.
   */
  public async isPageLoaded(
    pageElement: ChainablePromiseElement,
    pageName: string
  ): Promise<boolean> {
    try {
      Logger.info(`Checking if ${pageName} page is loaded.`);
      const isPageLoaded = await pageElement.isDisplayed();
      if (isPageLoaded) {
        Logger.info(`${pageName} page is loaded successfully.`);
      } else {
        Logger.warn(`${pageName} page is NOT loaded.`);
      }
      return isPageLoaded;
    } catch (error: any) {
      Logger.error(
        `Error validating if ${pageName} page is loaded: ${error.message}`
      );
      return false;
    }
  }
}
