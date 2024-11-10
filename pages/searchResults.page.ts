import { verifyElementClickableAndClick } from "../utils/elementActions";
import { CATEGORY_DISPLAY_NAME_MAP } from "../constants/categoryMapping";
import BasePage from "../pages/base.page";
import Logger from "../utils/logger";

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

  /**
   * Selects an option in the Category dropdown.
   * @param listedOptions - The text of the option to select.
   */
  public async selectCategoryOption(listedOptions: string): Promise<void> {
    try {
      Logger.info(
        `Attempting to select category "${listedOptions}" from the dropdown.`
      );

      // Click on the dropdown to open it
      await verifyElementClickableAndClick(
        this.categoryDropdownButton,
        "Category Dropdown Button"
      );

      // Confirm the dropdown is open
      await browser.waitUntil(
        async () =>
          (await this.categoryDropdownButton.getAttribute("aria-expanded")) ===
          "true",
        { timeout: 5000, timeoutMsg: "Category dropdown did not open" }
      );
      Logger.info("Category dropdown successfully expanded.");

      // Select the option based on the provided text
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
   * Validates if the specified category results page is loaded.
   * @param category - The expected category to be loaded, e.g., CATEGORY_OPTIONS.PROPERTY
   * @returns A boolean indicating if the correct category results page is loaded.
   */
  public async isCategoryResultsPageLoaded(category: string): Promise<boolean> {
    try {
      // Retrieve possible labels for the category
      const expectedLabels = CATEGORY_DISPLAY_NAME_MAP[category] || [category];
      Logger.info(
        `Expected labels for category "${category}": ${expectedLabels.join(", ")}`
      );

      // Loop through each label and check if the page has loaded with any of these labels
      for (const label of expectedLabels) {
        Logger.info(
          `Attempting to find "${label}" in the h1 element on the page.`
        );

        // Dynamically locate the h1 element with the specific label
        const categoryIndicator = $(`//h1[contains(text(), "${label}")]`);

        // Check if the element exists and is displayed
        try {
          const isDisplayed = await browser.waitUntil(
            async () => await categoryIndicator.isDisplayed(),
            {
              timeout: 5000, // Timeout per label, adjust as needed
              interval: 1000,
              timeoutMsg: `Failed to find "${label}" within the allotted time.`,
            }
          );

          if (isDisplayed) {
            Logger.info(
              `Results page for category "${label}" is loaded successfully.`
            );
            return true; // Exit function if any label matches
          }
        } catch (error) {
          Logger.info(
            `"${label}" not found, checking next possible label if available.`
          );
          continue; // Proceed to the next label in expectedLabels
        }
      }

      // Log an error if none of the labels were found
      Logger.error(
        `None of the expected labels (${expectedLabels.join(", ")}) found on the results page.`
      );
      return false;
    } catch (error: any) {
      Logger.error(`Error validating category results page: ${error.message}`);
      return false;
    }
  }

  public async selectLocationOption(
    locationRegion: string,
    locationDistrict?: string
  ): Promise<void> {
    try {
      Logger.info(
        `Attempting to select location "${locationRegion}" from the dropdown.`
      );

      // Click on the dropdown to open it
      await verifyElementClickableAndClick(
        this.allLocationsDropdownButton,
        "All Location Dropdown Button"
      );

      // Confirm the dropdown is open
      await browser.waitUntil(
        async () =>
          (await this.allLocationsDropdownButton.getAttribute(
            "aria-expanded"
          )) === "true",
        { timeout: 5000, timeoutMsg: "Location dropdown did not open" }
      );
      Logger.info("Location dropdown sucessfully expanded.");

      // Confirm the dropdown is now expanded
      await browser.waitUntil(
        async () =>
          (await this.allLocationsDropdownButton.getAttribute(
            "aria-expanded"
          )) === "true",
        { timeout: 5000, timeoutMsg: "Location dropdown did not open" }
      );

      Logger.info("All Location dropdown successfully expanded.");

      // Select the specified location Region dynamically
      await verifyElementClickableAndClick(
        this.locationRegionDropdownButton,
        "Location Region Dropdown Button"
      );

      await this.locationRegionDropdownButton.selectByVisibleText(
        locationRegion
      );
      Logger.info(`Region "${locationRegion}" selected successfully.`);

      // If a district is specified and the District dropdown is enabled, select it
      if (locationDistrict) {
        Logger.info(
          `Attempting to select district "${locationDistrict}" from the District dropdown.`
        );
        await browser.waitUntil(
          async () => await this.locationDistrictDropdownButton.isEnabled(),
          {
            timeout: 5000,
            timeoutMsg: `District dropdown did not become enabled for region "${locationRegion}".`,
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
        Logger.info(
          `No district specified or district dropdown is not enabled.`
        );
      }
    } catch (error: any) {
      Logger.error(`Error in selectLocationOption: ${error.message}`);
      throw error;
    }
  }

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
        Logger.info(
          "View Results button is displayed and enabled. Clicking to proceed."
        );
        await viewResultsButton.click();
        Logger.info("Clicked on the View Results button successfully.");
      } else {
        Logger.error("View Results button is not displayed or not enabled.");
        throw new Error("Unable to click on View Results button.");
      }

      // Define the expected h1 text based on region and district
      let expectedHeaderText: string;
      if (region === "All Locations") {
        expectedHeaderText = "Properties";
      } else if (district && district !== "All of " + region) {
        expectedHeaderText = `${district} Properties`;
      } else {
        expectedHeaderText = `${region} Properties`;
      }

      Logger.info(
        `Waiting for the results page with h1: "${expectedHeaderText}"`
      );

      const resultsHeader = $("tm-search-header-heading h1");
      await browser.waitUntil(
        async () => (await resultsHeader.getText()) === expectedHeaderText,
        {
          timeout: 5000, // Wait up to 5 seconds
          timeoutMsg: `Expected text "${expectedHeaderText}" was not found on the results page.`,
        }
      );
      Logger.info(`Results page loaded with header: "${expectedHeaderText}"`);
    } catch (error: any) {
      Logger.error(`Error clicking View Results button: ${error.message}`);
      throw error;
    }
  }
  public async getListingsCount(): Promise<number> {
    try {
      const countElement = $("tm-search-header-result-count h3");
      await browser.waitUntil(async () => countElement.isDisplayed(), {
        timeout: 5000, // Wait up to 5 seconds
        timeoutMsg: `Header Result Count was not found on the results page.`,
      });
      const countText = await countElement.getText();
      const count = parseInt(countText.replace(/\D/g, "")); // Convert text like "25,061 results" to an integer
      Logger.info(`Listings count retrieved: ${count}`);
      return count;
    } catch (error) {
      Logger.error(`Error retrieving listings count: ${error.message}`);
      throw error;
    }
  }
  public async validateResultsCount(expectedCount: number): Promise<boolean> {
    const actualCount = await this.getListingsCount();
    Logger.info(
      `Expected count: ${expectedCount}, Actual count: ${actualCount}`
    );
    return actualCount === expectedCount;
  }
  public async clickOnFirstListing(): Promise<void> {
    try {
      // Locate and click on the first listing in the results
      const firstListing = $(
        '(//tg-col[contains(@class, "l-col l-col--has-flex-contents") and not(contains(@class, "ad-card"))])[1]'
      );
      await verifyElementClickableAndClick(firstListing, "First Listing");

      Logger.info("Clicked on the first listing in the search results.");
    } catch (error) {
      Logger.error(`Error clicking on the first listing: ${error.message}`);
      throw error;
    }
  }

  public async collectListingDetails(): Promise<void> {
    try {
      if (await this.isDetailsPageLoaded()) {
        // Define selectors for the required details on the details page
        const propertyAddressElement = $(
          '//tm-property-listing-body //h1[contains(@class, "tm-property-listing-body__location")]'
        );
        const propertyBedroomElement = $(
          '//div[contains(@class, "tag--content") and .//tg-icon[@name="bedroom"]]'
        );
        const propertyAgentNameElement = $(
          '//tm-agents-summary //h3[contains(@class, "pt-agent-summary__agent-name")]'
        );

        // Collect and log the details
        const propertyAddressText = await propertyAddressElement.getText();
        const propertyBedroomText = await propertyBedroomElement.getText();
        const propertyAgentNameText = await propertyAgentNameElement.getText();

        Logger.info(`Address: ${propertyAddressText}`);
        Logger.info(`Beds: ${propertyBedroomText}`);
        Logger.info(`Agent's Name: ${propertyAgentNameText}`);
      } else {
        Logger.error("Details page did not load. Skipping data collection.");
      }
    } catch (error) {
      Logger.error(`Error collecting listing details: ${error.message}`);
      throw error;
    }
  }

  public async isDetailsPageLoaded(): Promise<boolean> {
    try {
      const pageHeader = $(
        '//h2[contains(@class, "tm-property-listing-body__title")]'
      );

      // Wait until the unique element on the details page is displayed
      await browser.waitUntil(async () => await pageHeader.isDisplayed(), {
        timeout: 5000, // Adjust the timeout as needed
        timeoutMsg: "Details page did not load in time.",
      });

      Logger.info("Details page is loaded successfully.");
      return true;
    } catch (error) {
      Logger.error(`Error loading the details page: ${error.message}`);
      return false;
    }
  }
}
export default new SearchResultsPage();
