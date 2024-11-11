import { verifyElementClickableAndClick } from "../utils/element-actions";
import Logger from "../utils/logger";

export class ListingManager {
  /**
   * Retrieves the number of listings shown on the results page.
   * Logs the count retrieved and any issues encountered.
   *
   * @returns The number of listings as an integer.
   */
  public async getListingsCount(): Promise<number> {
    try {
      const countElement = $("tm-search-header-result-count h3");
      await browser.waitUntil(async () => countElement.isDisplayed(), {
        timeout: 5000,
        timeoutMsg: "Header Result Count was not found on the results page.",
      });
      const countText = await countElement.getText();
      const count = parseInt(countText.replace(/\D/g, ""));
      Logger.info(`Listings count retrieved: ${count}`);
      return count;
    } catch (error: any) {
      Logger.error(`Error retrieving listings count: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validates that the number of listings matches an expected count.
   * Logs the comparison between expected and actual count.
   *
   * @param expectedCount - The expected number of listings.
   * @returns True if the actual count matches the expected count, false otherwise.
   */
  public async validateResultsCount(expectedCount: number): Promise<boolean> {
    const actualCount = await this.getListingsCount();
    Logger.info(
      `Expected count: ${expectedCount}, Actual count: ${actualCount}`
    );
    return actualCount === expectedCount;
  }

  /**
   * Clicks on the first listing in the search results.
   * Logs the click action and any encountered errors.
   */
  public async clickOnFirstListing(): Promise<void> {
    try {
      const firstListing = $(
        '(//tg-col[contains(@class, "l-col l-col--has-flex-contents") and not(contains(@class, "ad-card"))])[1]'
      );
      await verifyElementClickableAndClick(firstListing, "First Listing");
      Logger.info("Clicked on the first listing in the search results.");
    } catch (error: any) {
      Logger.error(`Error clicking on the first listing: ${error.message}`);
      throw error;
    }
  }
}
export default new ListingManager();
