import {
  CATEGORY_OPTIONS,
  ALL_LOCATIONS_REGIONS_OPTIONS,
  ALL_LOCATIONS_DISTRICTS,
} from "../../../constants/dropdownOptions";
import HomePage from "../../../pages/home.page";
import SearchResultsPage from "../../../pages/searchResults.page";
import Logger from "../../../utils/logger";

describe("Trade Me Property Search Tests", () => {
  before(async () => {
    Logger.info("Starting Trade Me Property Search Tests");
  });

  after(async () => {
    Logger.info("Trade Me Property Search Tests completed");
  });

  describe("Homepage Navigation", () => {
    it("should navigate to the Trade Me homepage", async () => {
      Logger.info("Navigating to Trade Me homepage...");
      await HomePage.openHomePage();
      expect(await HomePage.isPageLoaded(HomePage.homepageHeader, "Home")).toBe(
        true
      );
      Logger.info("Trade Me homepage loaded successfully");
    });
  });

  describe("Search Functionality", () => {
    before(async () => {
      Logger.info("Preparing homepage for search functionality tests...");
      await HomePage.openHomePage();
    });

    it("should search for 'house' and display results", async () => {
      Logger.info("Executing search for 'house'");
      await HomePage.searchItem("house");
      const isResultsLoaded =
        await SearchResultsPage.isSearchResultsLoaded("house");
      expect(isResultsLoaded).toBe(true);
      Logger.info("Search results for 'house' loaded successfully");
    });

    it("should filter results by 'Trade Me Property' category", async () => {
      Logger.info("Filtering results by category: Trade Me Property");
      await SearchResultsPage.selectCategoryOption(CATEGORY_OPTIONS.PROPERTY);
      const isCategoryCorrect =
        await SearchResultsPage.isCategoryResultsPageLoaded(
          CATEGORY_OPTIONS.PROPERTY
        );
      expect(isCategoryCorrect).toBe(true);
      Logger.info("Property category results page loaded successfully");
    });

    it("should set location to 'Wellington' region and 'Porirua' district", async () => {
      const region = ALL_LOCATIONS_REGIONS_OPTIONS.WELLINGTON;
      const district = ALL_LOCATIONS_DISTRICTS.Wellington.PORIRUA;
      Logger.info(
        `Setting location to region: ${region}, district: ${district}`
      );
      await SearchResultsPage.selectLocationOption(region, district);
      await SearchResultsPage.clickViewResultsButton(region, district);
      Logger.info(`Location set to ${region} region and ${district} district`);
    });

    it("should verify the number of listings displayed", async () => {
      Logger.info("Retrieving and verifying listings count...");
      const listingsCount = await SearchResultsPage.getListingsCount();
      expect(listingsCount).toBeGreaterThan(0);
      Logger.info(
        `Listings count verified: ${listingsCount} listings displayed`
      );
    });

    it("should verify details of the first listing", async () => {
      Logger.info("Accessing and verifying details of the first listing...");
      await SearchResultsPage.clickOnFirstListing();
      const listingDetails = await SearchResultsPage.collectListingDetails();
      expect(listingDetails.propertyAddressText).not.toBeNull();
      expect(listingDetails.propertyBedroomNumber).toBeGreaterThanOrEqual(1);
      expect(listingDetails.propertyAgentNameText).not.toBeNull();
      Logger.info(
        `Verified details of the first listing: ${JSON.stringify(listingDetails)}`
      );
    });
  });
});
