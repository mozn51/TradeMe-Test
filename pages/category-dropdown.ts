import Logger from "../utils/logger";
import { ChainablePromiseElement } from "webdriverio";
import { verifyElementClickableAndClick } from "../utils/element-actions";

export class CategoryDropdown {
  get categoryDropdownButton(): ChainablePromiseElement {
    return $(
      '//button[contains(@class, "tm-drop-down-tag__dropdown-button") and contains(.,"Category")]'
    );
  }
  /**
   * Selects a category option from the Category dropdown.
   * Logs each step, including expanding the dropdown and verifying the selection.
   *
   * @param listedOptions - The text of the option to select.
   * @throws Will throw an error if the specified option is not found or not clickable.
   */
  public async selectCategoryOption(listedOptions: string): Promise<void> {
    try {
      Logger.info(
        `Attempting to select category "${listedOptions}" from the dropdown.`
      );

      await verifyElementClickableAndClick(
        this.categoryDropdownButton,
        "Category Dropdown Button"
      );

      await browser.waitUntil(
        async () =>
          (await this.categoryDropdownButton.getAttribute("aria-expanded")) ===
          "true",
        { timeout: 5000, timeoutMsg: "Category dropdown did not open" }
      );
      Logger.info("Category dropdown successfully expanded.");

      const optionSelector = `//span[contains(text(), "${listedOptions}")]`;
      const optionElement = $(optionSelector);

      if (await optionElement.isDisplayed()) {
        Logger.info(`Option "${listedOptions}" is displayed in the dropdown.`);
        await verifyElementClickableAndClick(
          optionElement,
          `${listedOptions} Option`
        );
        Logger.info(
          `Category option '${listedOptions}' selected successfully.`
        );
      } else {
        Logger.error(
          `Option "${listedOptions}" is NOT displayed in the dropdown.`
        );
        throw new Error(`Option "${listedOptions}" not found in the dropdown.`);
      }
    } catch (error: any) {
      Logger.error(`Error in selectCategoryOption: ${error.message}`);
      throw error;
    }
  }
}
export default new CategoryDropdown();
