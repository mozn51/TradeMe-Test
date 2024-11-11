import { verifyElementClickableAndClick } from "../utils/elementActions";
import { CATEGORY_DISPLAY_NAME_MAP } from "../constants/dropdownOptions";
import BasePage from "../pages/base.page";
import Logger from "../utils/logger";
import { ChainablePromiseElement } from "webdriverio";

class SearchResultsPage extends BasePage {
  get searchResultCount() {
    return $("h3.tm-search-header-result-count__heading");
  }

  get categoryDropdownButton() {
    return $(
      '//button[contains(@class, "tm-drop-down-tag__dropdown-button") and contains(.,"Category")]'
    );
  }

  get allLocationsDropdownButton() {
    return $(
      '//button[contains(@class, "tm-drop-down-tag__dropdown-button") and contains(.,"All Locations")]'
    );
  }

  get locationRegionDropdownButton() {
    return $(
      '//label[contains(text(), "Region")]/following-sibling::div/select'
    );
  }

  get locationDistrictDropdownButton() {
    return $(
      '//label[contains(text(), "District")]/following-sibling::div/select'
    );
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
        `Expected labels for category "${category}": ${expectedLabels.join(", ")}`
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
        `None of the expected labels (${expectedLabels.join(", ")}) were found on the results page.`
      );
      return false;
    } catch (error: any) {
      Logger.error(`Error validating category results page: ${error.message}`);
      return false;
    }
  }

  /**
   * Selects the specified region and optional district from location dropdowns.
   * Logs each action step, including expanding the dropdown and confirming the selections.
   *
   * @param locationRegion - The region to select.
   * @param locationDistrict - Optional; the district to select within the region.
   */
  public async selectLocationOption(
    locationRegion: string,
    locationDistrict?: string
  ): Promise<void> {
    try {
      Logger.info(
        `Attempting to select location "${locationRegion}" from the dropdown.`
      );

      await verifyElementClickableAndClick(
        this.allLocationsDropdownButton,
        "All Location Dropdown Button"
      );

      await browser.waitUntil(
        async () =>
          (await this.allLocationsDropdownButton.getAttribute(
            "aria-expanded"
          )) === "true",
        { timeout: 5000, timeoutMsg: "Location dropdown did not open" }
      );
      Logger.info("Location dropdown successfully expanded.");

      await verifyElementClickableAndClick(
        this.locationRegionDropdownButton,
        "Location Region Dropdown Button"
      );

      await this.locationRegionDropdownButton.selectByVisibleText(
        locationRegion
      );
      Logger.info(`Region "${locationRegion}" selected successfully.`);

      if (locationDistrict) {
        Logger.info(
          `Selecting district "${locationDistrict}" from the District dropdown.`
        );
        await browser.waitUntil(
          async () => await this.locationDistrictDropdownButton.isEnabled(),
          {
            timeout: 5000,
            timeoutMsg: `District dropdown not enabled for region "${locationRegion}".`,
          }
        );
        await verifyElementClickableAndClick(
          this.locationDistrictDropdownButton,
          "District Dropdown Button"
        );
        await this.locationDistrictDropdownButton.selectByVisibleText(
          locationDistrict
        );
        Logger.info(`District "${locationDistrict}" selected successfully.`);
      } else {
        Logger.info(`No district specified for location selection.`);
      }
    } catch (error: any) {
      Logger.error(`Error in selectLocationOption: ${error.message}`);
      throw error;
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
        Logger.info("View Results button is clickable. Proceeding with click.");
        await viewResultsButton.click();
        Logger.info("Clicked on the View Results button successfully.");
      } else {
        Logger.error("View Results button is not displayed or enabled.");
        throw new Error("Unable to click on View Results button.");
      }

      let expectedHeaderText =
        district && district !== `All of ${region}`
          ? `${district} Properties`
          : `${region} Properties`;
      Logger.info(
        `Waiting for the results page header to match: "${expectedHeaderText}"`
      );

      const resultsHeader = $("tm-search-header-heading h1");
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

  /**
   * Collects details from the listing details page, including address, bedroom count, and agent's name.
   * Logs each detail collected.
   *
   * @returns An object containing property address, bedroom count, and agent's name.
   * @throws Will throw an error if data collection fails.
   */
  public async collectListingDetails(): Promise<{
    propertyAddressText: string;
    propertyBedroomNumber: number;
    propertyAgentNameText: string;
  }> {
    try {
      if (await this.isDetailsPageLoaded()) {
        const propertyAddressElement = $(
          '//tm-property-listing-body //h1[contains(@class, "tm-property-listing-body__location")]'
        );
        const propertyBedroomElement = $(
          '//div[contains(@class, "tag--content") and .//tg-icon[@name="bedroom"]]'
        );
        const propertyAgentNameElement = $(
          '//tm-agents-summary //h3[contains(@class, "pt-agent-summary__agent-name")]'
        );

        const propertyAddressText = await propertyAddressElement.getText();
        const propertyBedroomNumber = parseInt(
          await propertyBedroomElement.getText()
        );
        const propertyAgentNameText = await propertyAgentNameElement.getText();

        Logger.info(`Address: ${propertyAddressText}`);
        Logger.info(`Beds: ${propertyBedroomNumber}`);
        Logger.info(`Agent's Name: ${propertyAgentNameText}`);
        return {
          propertyAddressText,
          propertyBedroomNumber,
          propertyAgentNameText,
        };
      } else {
        Logger.error("Details page did not load. Skipping data collection.");
        throw new Error("Failed to load the details page.");
      }
    } catch (error: any) {
      Logger.error(`Error collecting listing details: ${error.message}`);
      throw error;
    }
  }

  /**
   * Checks if the details page has successfully loaded.
   * @returns True if the page is loaded, false otherwise.
   */
  public async isDetailsPageLoaded(): Promise<boolean> {
    try {
      const pageHeader = $(
        '//h2[contains(@class, "tm-property-listing-body__title")]'
      );
      await browser.waitUntil(async () => await pageHeader.isDisplayed(), {
        timeout: 5000,
        timeoutMsg: "Details page did not load in time.",
      });
      Logger.info("Details page is loaded successfully.");
      return true;
    } catch (error: any) {
      Logger.error(`Error loading the details page: ${error.message}`);
      return false;
    }
  }
}

export default new SearchResultsPage();
