import { ChainablePromiseElement } from "webdriverio";
import Logger from "./logger";

/**
 * Verifies if an element is clickable and clicks on it.
 * @param element - The WebdriverIO element to verify and click.
 * @param elementName - A descriptive name for logging purposes.
 */
export async function verifyElementClickableAndClick(
  element: ChainablePromiseElement,
  elementName: string
): Promise<void> {
  try {
    await element.waitForClickable();
    Logger.info(`Element ${elementName} is clickable, proceeding to click.`);
    await element.click();
  } catch (error: any) {
    Logger.error(`Error clicking element ${elementName}: ${error.message}`);
    throw error;
  }
}
