import Logger from "../utils/logger";
import { ChainablePromiseElement } from "webdriverio";

export default class BasePage {
  /**
   * Navigates to a specific URL.
   * @param url - The URL to navigate to.
   */
  public async openUrl(url: string): Promise<void> {
    try {
      await browser.url(url);
      Logger.info(`Navigated to ${url} successfully.`);
    } catch (error: any) {
      Logger.error(`Error navigating to ${url}: ${error.message}`);
    }
  }

  /**
   * Checks if a specific page is loaded by validating the presence of a key element.
   * @param pageElement - The WebdriverIO element that indicates the page is loaded.
   * @param pageName - The name of the page for logging purposes.
   * @returns A boolean indicating whether the page is loaded.
   */
  public async isPageLoaded(
    pageElement: ChainablePromiseElement,
    pageName: string
  ): Promise<boolean> {
    try {
      const isPageLoaded = await pageElement.isDisplayed();
      if (isPageLoaded) {
        Logger.info(`${pageName} page is loaded successfully.`);
      } else {
        Logger.error(`${pageName} page is NOT loaded.`);
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
