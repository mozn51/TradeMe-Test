import { urls } from "../constants/urls";
import BasePage from "../pages/base.page";
import { verifyElementClickableAndClick } from "../utils/elementActions";
import Logger from "../utils/logger";

class HomePage extends BasePage {
  // Define the selector for a key element unique to the homepage.
  get searchInput(): ChainablePromiseElement {
    return $("tm-homepage-in-with-the-new-campaign-header input");
  }

  get searchButton(): ChainablePromiseElement {
    return $('button[aria-label="Search all of Trade Me"]');
  }

  get homepageHeader(): ChainablePromiseElement {
    return $("tm-dynamic-homepage tm-homepage-in-with-the-new-campaign-header");
  }

  get searchResultCount(): ChainablePromiseElement {
    return $("h3.tm-search-header-result-count__heading");
  }

  /**
   * Opens the home page.
   * Validate if the page is loaded sucessfully.
   */
  public async openHomePage(): Promise<void> {
    await this.openUrl(urls.BASE_URL);
    await this.isPageLoaded(this.homepageHeader, "Home");
  }

  /**
   * Searches for an item on the homepage.
   * @param item - The item to search for.
   */
  public async searchItem(item: string): Promise<void> {
    await this.searchInput.setValue(item);
    await this.clickSearch();
  }

  /**
   * Clicks the search button.
   */
  public async clickSearch(): Promise<void> {
    await verifyElementClickableAndClick(this.searchButton, "Search Button");
  }

  /**
   * Verifies if the search results page for the specified item has loaded.
   * @param item - The search item used (e.g., "house").
   * @returns A boolean indicating if the correct search results page is displayed.
   */
  public async isSearchResultsLoaded(item: string): Promise<boolean> {
    try {
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

export default new HomePage();
