import BasePage from "./base";
import Logger from "../utils/logger";
import { ChainablePromiseElement } from "webdriverio";

export class BaseSearchResultsPage extends BasePage {
  get searchResultCount(): ChainablePromiseElement {
    return $("h3.tm-search-header-result-count__heading");
  }
  /**
   * Verifies if the search results page for a specified item has loaded.
   * Logs the process of waiting for the results to load and verifies the result count text.
   *
   * @param item - The search item used (e.g., "house").
   * @returns A boolean indicating if the correct search results page is displayed.
   */
  public async isSearchResultsLoaded(item: string): Promise<boolean> {
    try {
      Logger.info("Waiting for search results to load...");
      await browser.waitUntil(
        async () => await this.searchResultCount.isDisplayed(),
        {
          timeout: 10000,
          interval: 1000,
          timeoutMsg: `Failed to load the search result page for ${item} within the allotted time.`,
        }
      );

      const resultText = await this.searchResultCount.getText();
      const expectedText = `results for '${item}'`;

      if (resultText.includes(expectedText)) {
        Logger.info(
          `Search results page for "${item}" is loaded successfully.`
        );
        return true;
      } else {
        Logger.error(
          `Search results page for "${item}" is NOT loaded correctly.`
        );
        return false;
      }
    } catch (error: any) {
      Logger.error(`Error verifying search results page: ${error.message}`);
      return false;
    }
  }
}
export default new BaseSearchResultsPage();
