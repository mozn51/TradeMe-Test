import {
  CATEGORY_OPTIONS,
  ALL_LOCALTIONS_REGIONS_OPTIONS,
  ALL_LOCALTIONS_DISTRICTS,
} from "../../../constants/dropdownOptions";
import HomePage from "../../../pages/home.page";
import SearchResultsPage from "../../../pages/searchResults.page";
import Logger from "../../../utils/logger";

describe("Trade Me Search Test", () => {
  before(async () => {
    Logger.info("Starting Trade Me Search Test");
  });

  after(async () => {
    Logger.info("Trade Me Search Test completed");
  });

  it("should navigate to Trade Me homepage", async () => {
    await HomePage.openHomePage(); // This will navigate to the BASE_URL and validate if the page is loaded.
    expect(await HomePage.isPageLoaded(HomePage.homepageHeader, "Home")).toBe(
      true
    );
  });

  it("should search for 'house' and display results", async () => {
    await HomePage.searchItem("house"); // This will enter "house" in the search input and click the search button.
    const isResultsLoaded =
      await SearchResultsPage.isSearchResultsLoaded("house");
    expect(isResultsLoaded).toBe(true);
  });

  it("should select 'Trade Me Property' from the Dropdown List", async () => {
    await SearchResultsPage.selectCategoryOption(CATEGORY_OPTIONS.PROPERTY);
  });

  it("should load the correct category results page for Property", async () => {
    const isCategoryCorrect =
      await SearchResultsPage.isCategoryResultsPageLoaded(
        CATEGORY_OPTIONS.PROPERTY
      );
    expect(isCategoryCorrect).toBe(true);
  });

  it("should select 'Wellington' Region and 'Porirua' District", async () => {
    const region = ALL_LOCALTIONS_REGIONS_OPTIONS.WELLINGTON;
    const district = "Porirua";

    await SearchResultsPage.selectLocationOption(region, district);
    await SearchResultsPage.clickViewResultsButton(region, district);
  });

  it("should display the correct number of listings for 'house' in 'Wellington' region and 'Porirua' district", async () => {
    const expectedCount = 20; // Set this based on your expectations or retrieve it dynamically if needed
    // Validate the count displayed on the results page
    const isCountValid =
      await SearchResultsPage.validateResultsCount(expectedCount);
    expect(isCountValid).toBe(true);
  });

  it("should click on the first listing and verify key details on the detail page", async () => {
    await SearchResultsPage.clickOnFirstListing();

    await SearchResultsPage.collectListingDetails();
  });
});
