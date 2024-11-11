import { CATEGORY_DISPLAY_NAME_MAP } from '../constants/dropdown-options';
import { Logger } from '../utils/logger';

export class PropertyResultsPage {
  /**
   * Validates if the results page for the specified category is loaded.
   * Checks for the correct label and logs any discrepancies.
   *
   * @param category - The expected category, e.g., CATEGORY_OPTIONS.PROPERTY.
   * @returns A boolean indicating if the correct category results page is loaded.
   */
  public async isCategoryResultsPageLoaded(category: string): Promise<boolean> {
    try {
      const expectedLabels = CATEGORY_DISPLAY_NAME_MAP[category] || [category];
      Logger.info(
        `Expected labels for category "${category}": ${expectedLabels.join(', ')}`
      );

      for (const label of expectedLabels) {
        Logger.info(`Checking for label "${label}" on the page.`);
        const categoryIndicator = $(`//h1[contains(text(), "${label}")]`);

        try {
          const isDisplayed = await browser.waitUntil(
            async () => await categoryIndicator.isDisplayed(),
            {
              timeout: 5000,
              interval: 1000,
              timeoutMsg: `Failed to find "${label}".`,
            }
          );

          if (isDisplayed) {
            Logger.info(
              `Results page for category "${label}" loaded successfully.`
            );
            return true;
          }
        } catch {
          Logger.info(
            `"${label}" not found, checking next label if available.`
          );
          continue;
        }
      }

      Logger.error(
        `None of the expected labels (${expectedLabels.join(', ')}) were found on the results page.`
      );
      return false;
    } catch (error: any) {
      Logger.error(`Error validating category results page: ${error.message}`);
      return false;
    }
  }

  /**
   * Clicks the "View Results" button and waits for the results page to load.
   * Logs each step, including waiting for the expected results page header.
   *
   * @param region - The selected region.
   * @param district - The selected district, if applicable.
   * @throws Will log an error and throw if the button is not clickable or results page does not load.
   */
  public async clickViewResultsButton(
    region: string,
    district: string | null = null
  ): Promise<void> {
    try {
      const viewResultsButton = $(
        '//button[contains(@class, "tm-drop-down-tag__dropdown-footer-button") and contains(text(), "View")]'
      );
      if (
        (await viewResultsButton.isDisplayed()) &&
        (await viewResultsButton.isEnabled())
      ) {
        Logger.info('View Results button is clickable. Proceeding with click.');
        await viewResultsButton.click();
        Logger.info('Clicked on the View Results button successfully.');
      } else {
        Logger.error('View Results button is not displayed or enabled.');
        throw new Error('Unable to click on View Results button.');
      }

      let expectedHeaderText =
        district && district !== `All of ${region}`
          ? `${district} Properties`
          : `${region} Properties`;
      Logger.info(
        `Waiting for the results page header to match: "${expectedHeaderText}"`
      );

      const resultsHeader = $('tm-search-header-heading h1');
      await browser.waitUntil(
        async () => (await resultsHeader.getText()) === expectedHeaderText,
        {
          timeout: 5000,
          timeoutMsg: `Expected header "${expectedHeaderText}" not found.`,
        }
      );
      Logger.info(`Results page loaded with header: "${expectedHeaderText}"`);
    } catch (error: any) {
      Logger.error(`Error clicking View Results button: ${error.message}`);
      throw error;
    }
  }
}
