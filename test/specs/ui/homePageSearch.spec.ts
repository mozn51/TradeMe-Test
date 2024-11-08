import HomePage from "../../../pages/home.page";
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
    const isResultsLoaded = await HomePage.isSearchResultsLoaded("house");
    expect(isResultsLoaded).toBe(true);
  });
});
