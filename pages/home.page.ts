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
    Logger.info(`Searching for item: ${item}`);
  }

  /**
   * Clicks the search button.
   */
  public async clickSearch(): Promise<void> {
    await verifyElementClickableAndClick(this.searchButton, "Search Button");
  }
}
export default new HomePage();
