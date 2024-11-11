import { ChainablePromiseElement } from 'webdriverio';
import { Logger } from './logger';

export class UIActions {
  /**
   * Clicks on an element if it is clickable within the specified timeout.
   * @param element - The WebdriverIO element to verify and click.
   * @param elementName - A descriptive name for logging purposes.
   * @param timeout - (Optional) Timeout in milliseconds to wait for the element to be clickable.
   * @throws Will throw an error if the element is not clickable within the timeout.
   */
  public async clickIfClickable(
    element: ChainablePromiseElement,
    elementName: string,
    timeout: number = 10000
  ): Promise<void> {
    try {
      Logger.info(`Waiting for element ${elementName} to be clickable.`);

      // Wait until the element is clickable within the given timeout
      await browser.waitUntil(async () => await element.isClickable(), {
        timeout,
        timeoutMsg: `Element ${elementName} is not clickable within ${timeout / 1000} seconds.`,
      });

      // Click the element once it's clickable
      await element.click();
      Logger.info(`Element ${elementName} clicked successfully.`);
    } catch (error: any) {
      Logger.error(`Error clicking element ${elementName}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Sets a value to an element if it is visible within the specified timeout.
   * @param element - The WebdriverIO element to set value.
   * @param value - The value to set.
   * @param elementName - A descriptive name for logging purposes.
   * @param timeout - (Optional) Timeout in milliseconds to wait for the element to be visible.
   * @throws Will throw an error if the element is not visible within the timeout.
   */
  public async setValueIfVisible(
    element: ChainablePromiseElement,
    value: string,
    elementName: string,
    timeout: number = 10000
  ): Promise<void> {
    try {
      Logger.info(`Waiting for element ${elementName} to be visible.`);

      // Wait until the element is visible within the given timeout
      await browser.waitUntil(async () => await element.isDisplayed(), {
        timeout,
        timeoutMsg: `Element ${elementName} is not visible within ${timeout / 1000} seconds.`,
      });

      // Set the value once the element is visible
      await element.setValue(value);
      Logger.info(`Set value for ${elementName} successfully.`);
    } catch (error: any) {
      Logger.error(
        `Error setting value for element ${elementName}: ${error.message}`
      );
      throw error;
    }
  }
}
