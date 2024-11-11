import { ChainablePromiseElement } from 'webdriverio';
import { urls } from '../constants/urls';
import Logger from '../utils/logger';
import UIActions from '../utils/ui-actions';
import BasePage from './base';

export class HomePage extends BasePage {
  // Define the selector for a key element unique to the homepage.
  get searchInput(): ChainablePromiseElement {
    return $('tm-homepage-in-with-the-new-campaign-header input');
  }

  get searchButton(): ChainablePromiseElement {
    return $('button[aria-label="Search all of Trade Me"]');
  }

  get homepageHeader(): ChainablePromiseElement {
    return $('tm-dynamic-homepage tm-homepage-in-with-the-new-campaign-header');
  }

  /**
   * Opens the Trade Me homepage.
   * Navigates to the home URL and verifies if the homepage is successfully loaded.
   * Logs navigation and validation steps.
   *
   * @throws Will throw an error if the homepage fails to load.
   */
  public async openHomePage(): Promise<void> {
    Logger.info('Opening the Trade Me homepage.');
    await this.openUrl(urls.BASE_URL);
    const isLoaded = await this.isPageLoaded(this.homepageHeader, 'Home');
    if (!isLoaded) {
      Logger.error('Failed to load the Trade Me homepage.');
      throw new Error('Homepage failed to load.');
    }
  }

  /**
   * Searches for a specified item using the homepage search field.
   * Waits until the search input is ready, enters the search term, and triggers the search.
   *
   * @param item - The item to search for on Trade Me.
   * @throws Will log an error if the search field is not ready within the timeout.
   */
  public async searchItem(item: string): Promise<void> {
    try {
      Logger.info(`Initiating search for item: ${item}`);

      await UIActions.setValueIfVisible(this.searchInput, item, 'Search Input');

      Logger.info(`Entered search term: ${item}`);
      await this.clickSearch();
    } catch (error: any) {
      Logger.error(
        `Error during search action for item '${item}': ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Clicks the search button to initiate the search.
   * Logs the click action and throws an error if the button is not clickable.
   */
  public async clickSearch(): Promise<void> {
    Logger.info('Attempting to click the search button.');
    await UIActions.clickIfClickable(this.searchButton, 'Search Button');
    Logger.info('Search button clicked successfully.');
  }
}
export default new HomePage();
